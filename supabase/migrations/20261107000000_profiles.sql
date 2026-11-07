-- =====================================================================
-- Breez+ database: step 1 — user profiles
--
-- What this file does:
--   1. Removes the tables and functions left over from the old Breez app
--   2. Creates the `profiles` table (one row per user)
--   3. Turns on Row Level Security (RLS) so users can only see and edit
--      their own profile, and only their name and department
--   4. Adds a trigger that creates the profile automatically when someone
--      signs up, and rejects emails that are not @eastdelta.edu.bd
--
-- How to run it: Supabase dashboard -> SQL Editor -> paste -> Run.
-- It is safe to run more than once.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1. Clean up the old Breez (Bolt) schema
--    These tables only ever held test data.
-- ---------------------------------------------------------------------
drop table if exists public.user_badges cascade;
drop table if exists public.badges cascade;
drop table if exists public.downloads cascade;
drop table if exists public.ratings cascade;
drop table if exists public.notifications cascade;
drop table if exists public.resources cascade;

-- The old profiles table had a `user_id` column; the new one does not.
-- Drop it only if it is the old one, so running this file again never
-- deletes real profiles.
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'profiles' and column_name = 'user_id'
  ) then
    drop table public.profiles cascade;
  end if;
end;
$$;

drop function if exists public.handle_coin_transaction(uuid, integer, text);
drop function if exists public.create_notification(uuid, text, text, text);
drop function if exists public.check_and_award_badges(uuid);
drop function if exists public.update_resource_rating() cascade;
drop function if exists public.update_updated_at_column() cascade;


-- ---------------------------------------------------------------------
-- 2. The profiles table
--    `id` is the same id Supabase Auth gives the user, so a profile is
--    linked to exactly one account (the old app used two different ids,
--    which made every query more complicated).
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text not null unique,
  full_name   text not null check (char_length(full_name) between 1 and 100),
  department  text not null check (char_length(department) between 1 and 100),
  coins       integer not null default 50 check (coins >= 0),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.profiles is 'One row per Breez+ user, created automatically on sign-up.';


-- ---------------------------------------------------------------------
-- 3. Security
--    RLS = every query is checked against these rules on the server,
--    no matter what the app sends.
-- ---------------------------------------------------------------------
alter table public.profiles enable row level security;

drop policy if exists "Users can read their own profile" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;

-- A signed-in user can read only their own profile.
create policy "Users can read their own profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

-- A signed-in user can update only their own profile...
create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- ...and only the name and department columns.
-- (In the old app anyone could set their own coins to 99999.)
revoke insert, update, delete on public.profiles from anon, authenticated;
grant update (full_name, department) on public.profiles to authenticated;

-- There is no INSERT policy on purpose: profiles are created only by the
-- trigger below, never directly by the app.


-- ---------------------------------------------------------------------
-- 4. Keep updated_at current
-- ---------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();


-- ---------------------------------------------------------------------
-- 5. Create the profile automatically on sign-up
--    The app sends full_name and department as "user metadata" with
--    supabase.auth.signUp(). This function copies them into profiles.
--
--    `security definer` lets the function insert the row even though
--    users themselves are not allowed to insert into profiles.
--    `search_path = ''` is a safety rule for security definer functions:
--    every table name must be written in full (public.profiles).
-- ---------------------------------------------------------------------
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- Server-side check: the app checks this too, but the app can be bypassed.
  if lower(new.email) not like '%@eastdelta.edu.bd' then
    raise exception 'Only @eastdelta.edu.bd email addresses can sign up';
  end if;

  insert into public.profiles (id, email, full_name, department)
  values (
    new.id,
    lower(new.email),
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''), 'Student'),
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'department'), ''), 'Unknown')
  );

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
