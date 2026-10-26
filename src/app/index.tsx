import { StyleSheet, Text,  View } from "react-native";
import { Link } from "expo-router";

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
    backgroundColor: "#2563EB",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 16,
    color: "#E5E7EB",
  },
  button: {
    marginTop: 32,
    backgroundColor: "#FFFFFF",
    color: "#2563EB",
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
});
