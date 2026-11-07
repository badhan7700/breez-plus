import { useState } from "react";
import { AppButton } from "../components/AppButton";
import { AppInput } from "../components/AppInput";
import { AuthFooter } from "../components/AuthFooter";
import { AuthLayout } from "../components/AuthLayout";
import { supabase } from "../lib/supabase";
import { showAlert } from "../utils/showAlert";
import { isUniversityEmail, UNIVERSITY_DOMAIN } from "../utils/validation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // 1. Check the form before talking to the server
    if (email.trim() === "" || password === "") {
      showAlert("Error", "Please fill in all fields");
      return;
    }
    if (!isUniversityEmail(email)) {
      showAlert("Error", `Please use your ${UNIVERSITY_DOMAIN} email`);
      return;
    }

    // 2. Ask Supabase to sign in
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    setLoading(false);

    // 3. On success there is nothing to do here: the layout sees the new
    //    session and moves to /home automatically.
    if (error) {
      showAlert("Sign in failed", error.message);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your Breez+ account">
      <AppInput
        value={email}
        onChangeText={setEmail}
        placeholder="University Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      <AppInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
        autoComplete="password"
      />
      <AppButton title="Sign In" onPress={handleLogin} loading={loading} />
      <AuthFooter text="Don't have an account?" linkText="Sign Up" href="/register" />
    </AuthLayout>
  );
}
