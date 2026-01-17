import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { useAuth } from "../../hooks/useAuth";

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email dan password wajib diisi");
      return;
    }

    try {
      console.log("📤 LOGIN REQUEST");
      console.log("Email:", email);
      console.log("Password length:", password.length);

      await login(email.trim().toLowerCase(), password);

      console.log("✅ LOGIN SUCCESS");
      // ❗ JANGAN navigate manual
      // RootNavigator yang akan pindahin screen

    } catch (error: any) {
      console.log(
        "❌ LOGIN ERROR:",
        error?.response?.data || error
      );

      Alert.alert(
        "Login gagal",
        error?.response?.data?.message || "Email atau password salah"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable style={styles.button} onPress={handleLogin}>
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
