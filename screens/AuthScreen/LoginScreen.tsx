import React, { useState, useContext } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default function LoginScreen({ navigation }: any) {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Pressable style={styles.button} onPress={login}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
            <View style={styles.orWrapper}>
                <View style={styles.line} />
                <Text style={styles.orText}>atau</Text>
                <View style={styles.line} />
            </View>

            <Pressable
                style={styles.registerButton}
                onPress={() => navigation.navigate("Register")}
            >
                <Text style={styles.registerText}>Register</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#2ecc71",
        textAlign: "center",
        marginBottom: 24,
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    button: {
        height: 48,
        backgroundColor: "#2ecc71",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },
    orWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#ddd",
    },
    orText: {
        marginHorizontal: 10,
        color: "#888",
    },
    registerButton: {
        height: 48,
        borderWidth: 1,
        borderColor: "#2ecc71",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    registerText: {
        color: "#2ecc71",
        fontWeight: "600",
    },

});
