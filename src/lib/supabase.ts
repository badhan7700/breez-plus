// The one Supabase client the whole app uses.
// Docs: https://supabase.com/docs/guides/auth/quickstarts/react-native
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { AppState, Platform } from "react-native";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase settings. Create a .env file (see .env.example) and restart `npx expo start`.",
  );
}

const isWeb = Platform.OS === "web";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    // Save the login on the phone so the user stays signed in after closing the app.
    // (On the web, Supabase uses the browser's own storage by itself.)
    storage: isWeb ? undefined : AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    // Mobile apps have no URL to read a login from (only websites do).
    detectSessionInUrl: false,
  },
});

// Refresh the login token only while the app is open on screen.
if (!isWeb) {
  AppState.addEventListener("change", (state) => {
    if (state === "active") {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });
}
