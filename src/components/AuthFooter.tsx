// "Don't have an account? Sign Up" line under a form.
import { Link, type Href } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { colors } from "../constants/colors";

type AuthFooterProps = {
  text: string;
  linkText: string;
  href: Href;
};

export function AuthFooter({ text, linkText, href }: AuthFooterProps) {
  return (
    <Text style={styles.footerText}>
      {text}{" "}
      <Link href={href} replace style={styles.linkText}>
        {linkText}
      </Link>
    </Text>
  );
}

const styles = StyleSheet.create({
  footerText: {
    marginTop: 24,
    color: colors.textLight,
    fontSize: 14,
  },
  linkText: {
    color: colors.white,
    fontWeight: "bold",
  },
});
