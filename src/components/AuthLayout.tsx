// The coloured page shared by Welcome, Login and Register.
// KeyboardAvoidingView + ScrollView stop the keyboard from hiding the inputs.
import type { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  content: {
    width: "100%",
    maxWidth: 420, // keeps the form a nice width on a computer screen
    alignSelf: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 16,
  },
});
