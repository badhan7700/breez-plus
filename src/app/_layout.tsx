import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";

// Keep the splash screen up until we know whether the user is signed in.
SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { session, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Only for people who are NOT signed in */}
      <Stack.Protected guard={!session} redirectTo="/home">
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack.Protected>

      {/* Only for people who ARE signed in */}
      <Stack.Protected guard={!!session} redirectTo="/">
        <Stack.Screen name="home" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
