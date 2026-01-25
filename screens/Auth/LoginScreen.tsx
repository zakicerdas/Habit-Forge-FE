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
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./LoadingScreen";


export default function LoginScreen({ navigation }: any) {
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email dan password wajib diisi");
      return;
    }

    try {
      console.log("Requesting login...");
      console.log("Email:", email);
      console.log("Password length:", password.length);

      await login(email.trim().toLowerCase(), password);

      console.log("login successful");

    } catch (error: any) {
      console.log(
        "cannot login:",
        error?.response?.data || error
      );

      Alert.alert(
        "Login failed",
        error?.response?.data?.message || "Email atau password salah"
      );
    }
  };

    if (isLoading) {
    return <LoadingScreen />;
  }

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

      <Pressable
        style={styles.clearButton}
        onPress={async () => {
          await AsyncStorage.clear();
          Alert.alert("Success", "AsyncStorage cleared");
        }}
      >
        <Text style={styles.clearText}>Clear AsyncStorage (Debug)</Text>
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
  clearButton: {
    height: 40,
    backgroundColor: "#ff6b6b",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  clearText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 12,
  },
});
