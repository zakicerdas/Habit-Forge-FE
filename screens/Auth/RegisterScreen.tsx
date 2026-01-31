import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Image,
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
      await register(
        email.trim().toLowerCase(),
        username.trim(),
        password,
      );

      Alert.alert("Berhasil", "Akun berhasil dibuat");
      navigation.navigate("Login");
    } catch (error: any) {
      Alert.alert(
        "Register gagal",
        error?.response?.data?.message ||
        "Email atau username sudah terdaftar",
      );
    }
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <View style={styles.container}>

      <View style={styles.brand}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.appName}>HabitForge</Text>
        <Text style={styles.tagline}>Start your better routine</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#9CA3AF"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#9CA3AF"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#9CA3AF"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable style={styles.primaryButton} onPress={handleRegister}>
        <Text style={styles.primaryText}>Register</Text>
      </Pressable>

      <Pressable
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.secondaryText}>
          Sudah punya akun? Login
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FFF8",
    padding: 24,
    justifyContent: "center",
  },

  brand: {
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1B4332",
  },
  tagline: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },

  input: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 14,
    marginBottom: 12,
    elevation: 1,
  },

  primaryButton: {
    height: 50,
    backgroundColor: "#2ECC71",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  secondaryButton: {
    marginTop: 18,
    alignItems: "center",
  },
  secondaryText: {
    color: "#2ECC71",
    fontWeight: "600",
  },
});
