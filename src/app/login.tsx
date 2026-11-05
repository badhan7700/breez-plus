import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Link } from "expo-router";
import { colors } from "../constants/colors";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (email === "" || password === "") {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        if (!email.endsWith("@eastdelta.edu.bd")) {
            Alert.alert("Error", "Please fill a valid Email");
            return;
        }
        Alert.alert("Login", `Email: ${email}`);
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to your Breez+ account</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="University Email"
                placeholderTextColor={colors.placeholder}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor={colors.placeholder}
                secureTextEntry={true}
            />
            <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>
            <Text style={styles.footerText}>
                Don't have an account?{"  "}
                <Link href="/register" style={styles.linkText}>Sign Up</Link>
            </Text>
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
    input: {
        width: "85%",
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        marginTop: 16,
    },
    button: {
        width: "85%",
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 16,
        marginTop: 24,
        alignItems: "center",
    },
    buttonText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: "bold",
    },
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
