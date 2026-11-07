// One text box used on every form.
// `...props` passes everything else (value, placeholder, secureTextEntry...) straight to TextInput.
import { StyleSheet, TextInput, type TextInputProps } from "react-native";
import { colors } from "../constants/colors";

export function AppInput({ style, ...props }: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor={colors.placeholder}
      style={[styles.input, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: colors.white,
    color: colors.text,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginTop: 16,
  },
});
