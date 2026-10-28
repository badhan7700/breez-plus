
import { useState } from "react";
import { Alert, Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";

export default function Register() {
    const [fullName, setFullName] = useState("");
    const [universityEmail, setUniversityEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = () => {
        if (fullName === "" || universityEmail === "" || department === "" || password === "" || confirmPassword === "") {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        if (!universityEmail.endsWith("@eastdelta.edu.bd")) {
            Alert.alert("Error", "Please fill a valid Email");
            return;
        }
        if (password.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        Alert.alert("Success", `Account created for ${fullName}`)
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Join Breez+</Text>
            <Text style={styles.subtitle}>Create your account to start sharing</Text>
            <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Full Name"
                placeholderTextColor="#9ca3af"
                autoCapitalize="words"
            />
            <TextInput
                style={styles.input}
                value={universityEmail}
                onChangeText={setUniversityEmail}
                placeholder="University Email"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                value={department}
                onChangeText={setDepartment}
                placeholder="Department"
                placeholderTextColor="#9ca3af"
                autoCapitalize="characters"

            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#9ca3af"
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="confirm Password"
                placeholderTextColor="#9ca3af"
                secureTextEntry={true}
            />
            <Pressable style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText} >Create Account</Text>
            </Pressable>

            <Text style={styles.footerText}>
                Already have an account?{"  "}
                <Link href="/login" style={styles.linkText}>Login</Link>
            </Text>

        </View>
    )
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
    input: {
        width: "85%",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        marginTop: 16,
    },
    button: {
        width: "85%",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        marginTop: 24,
        alignItems: "center",
    },
    buttonText: {
        color: "#2563EB",
        fontSize: 16,
        fontWeight: "bold",
    },
    footerText: {
        marginTop: 24,
        color: "#E5E7EB",
        fontSize: 14,
    },
    linkText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
})