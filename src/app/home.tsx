import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "../components/AppButton";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import type { Profile } from "../types/profile";
import { showAlert } from "../utils/showAlert";

const COMING_SOON = [
  "Upload notes, slides and past papers (+5 coins)",
  "Browse and search by course and semester",
  "Download resources (−3 coins)",
  "Ratings, badges and a weekly leaderboard",
];

export default function Home() {
  const { session } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Load this user's row from the profiles table once, when the screen opens.
  useEffect(() => {
    const userId = session?.user.id;
    if (!userId) return;

    supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle() // 0 or 1 row; no error if the profile is missing
      .then(({ data, error }) => {
        if (error) {
          showAlert("Could not load profile", error.message);
        }
        setProfile(data);
        setLoading(false);
      });
  }, [session]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showAlert("Sign out failed", error.message);
    }
    // On success the layout sees there is no session and goes back to /.
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>Hi, {profile?.full_name ?? "there"} 👋</Text>
        <Text style={styles.muted}>{session?.user.email}</Text>

        <View style={styles.row}>
          <View style={[styles.card, styles.half]}>
            <Text style={styles.cardLabel}>Coins</Text>
            <Text style={styles.cardValue}>{profile?.coins ?? "—"}</Text>
          </View>
          <View style={[styles.card, styles.half]}>
            <Text style={styles.cardLabel}>Department</Text>
            <Text style={styles.cardValue}>{profile?.department ?? "—"}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Coming soon</Text>
          {COMING_SOON.map((item) => (
            <Text key={item} style={styles.listItem}>
              • {item}
            </Text>
          ))}
        </View>

        <AppButton title="Sign Out" onPress={handleSignOut} variant="primary" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
  },
  muted: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  half: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 13,
    color: colors.textMuted,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 6,
  },
});
