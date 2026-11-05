import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { colors } from "../constants/colors";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breez+</Text>
      <Text style={styles.subtitle}>Share notes, earn coins</Text>
      <Link href="/login" style={styles.button}>
        Get Started
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: colors.white,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
  },
  button: {
    marginTop: 32,
    backgroundColor: colors.white,
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
});
