// Keeps track of who is signed in and shares it with every screen.
import type { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "../lib/supabase";

type AuthContextValue = {
  session: Session | null; // null = nobody is signed in
  loading: boolean; // true while we check for a saved login
};

const AuthContext = createContext<AuthContextValue>({ session: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Was the user already signed in last time the app was open?
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // 2. Listen for sign in / sign out from now on.
    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    // 3. Stop listening when the app closes.
    return () => data.subscription.unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ session, loading }}>{children}</AuthContext.Provider>;
}

// Any screen can call useAuth() to know who is signed in.
export function useAuth() {
  return useContext(AuthContext);
}
