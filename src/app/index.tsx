import { router } from "expo-router";
import { AppButton } from "../components/AppButton";
import { AuthLayout } from "../components/AuthLayout";

export default function Index() {
  return (
    <AuthLayout title="Breez+" subtitle="Share notes, earn coins">
      <AppButton title="Get Started" onPress={() => router.push("/login")} />
    </AuthLayout>
  );
}
