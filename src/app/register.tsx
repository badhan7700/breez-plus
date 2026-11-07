import { router } from "expo-router";
import { useState } from "react";
import { AppButton } from "../components/AppButton";
import { AppInput } from "../components/AppInput";
import { AuthFooter } from "../components/AuthFooter";
import { AuthLayout } from "../components/AuthLayout";
import { supabase } from "../lib/supabase";
import { showAlert } from "../utils/showAlert";
import { isUniversityEmail, UNIVERSITY_DOMAIN } from "../utils/validation";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [universityEmail, setUniversityEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    // 1. Check the form before talking to the server
    if (
      fullName.trim() === "" ||
      universityEmail.trim() === "" ||
      department.trim() === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      showAlert("Error", "Please fill in all fields");
      return;
    }
    if (!isUniversityEmail(universityEmail)) {
      showAlert("Error", `Please use your ${UNIVERSITY_DOMAIN} email`);
      return;
    }
    if (password.length < 6) {
      showAlert("Error", "Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      showAlert("Error", "Passwords do not match");
      return;
    }

    // 2. Create the account. full_name and department travel as "metadata";
    //    the database trigger copies them into the profiles table.
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: universityEmail.trim().toLowerCase(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          department: department.trim(),
        },
      },
    });
    setLoading(false);

    if (error) {
      showAlert("Sign up failed", error.message);
      return;
    }

    // 3. If email confirmation is on, there is no session yet:
    //    the user must click the link in their email first.
    if (!data.session) {
      showAlert(
        "Check your email",
        `We sent a confirmation link to ${universityEmail.trim()}. Open it, then sign in.`,
      );
      router.replace("/login");
    }
    // If there IS a session, the layout moves to /home automatically.
  };

  return (
    <AuthLayout title="Join Breez+" subtitle="Create your account to start sharing">
      <AppInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Full Name"
        autoCapitalize="words"
        autoComplete="name"
      />
      <AppInput
        value={universityEmail}
        onChangeText={setUniversityEmail}
        placeholder="University Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      <AppInput
        value={department}
        onChangeText={setDepartment}
        placeholder="Department (e.g. CSE)"
        autoCapitalize="characters"
      />
      <AppInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
        autoComplete="new-password"
      />
      <AppInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        secureTextEntry={true}
        autoComplete="new-password"
      />
      <AppButton title="Create Account" onPress={handleSignUp} loading={loading} />
      <AuthFooter text="Already have an account?" linkText="Sign In" href="/login" />
    </AuthLayout>
  );
}
