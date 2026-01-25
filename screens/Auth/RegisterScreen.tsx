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
import LoadingScreen from "./LoadingScreen";

export default function RegisterScreen({ navigation }: any) {
  const { register, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !username || !password) {
      Alert.alert("Error", "Semua field wajib diisi");
      return;
    }

    try {
      console.log("requesting register...");
      console.log("Email:", email);
      console.log("Username:", username);
      console.log("Password length:", password.length);

      await register(
        email.trim().toLowerCase(),
        username.trim(),
        password
      );

      console.log("register successful");

      Alert.alert(
        "Berhasil",
        "Akun berhasil dibuat. Silakan login."
      );

      navigation.navigate("Login");

    } catch (error: any) {
      console.log(
        "register error:",
        error?.response?.data || error
      );

      Alert.alert(
        "Register gagal",
        error?.response?.data?.message ||
        "Email atau username sudah terdaftar"
      );
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

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
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>

      <View style={styles.orWrapper}>
        <View style={styles.line} />
        <Text style={styles.orText}>atau</Text>
        <View style={styles.line} />
      </View>

      <Pressable
        style={styles.loginButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.loginText}>Login</Text>
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
  loginButton: {
    height: 48,
    borderWidth: 1,
    borderColor: "#2ecc71",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "#2ecc71",
    fontWeight: "600",
  },
});
