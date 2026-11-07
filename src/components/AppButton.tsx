// One button used on every screen. Change the look here, every button updates.
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../constants/colors";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean; // shows a spinner and blocks double taps
  variant?: "light" | "primary"; // light = white button on a coloured screen
};

export function AppButton({ title, onPress, loading = false, variant = "light" }: AppButtonProps) {
  const isLight = variant === "light";

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: isLight ? colors.white : colors.primary },
        (pressed || loading) && styles.dimmed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isLight ? colors.primary : colors.white} />
      ) : (
        <Text style={[styles.text, { color: isLight ? colors.primary : colors.white }]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    alignItems: "center",
  },
  dimmed: {
    opacity: 0.7,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
