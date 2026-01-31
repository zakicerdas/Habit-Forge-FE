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
      await login(email.trim().toLowerCase(), password);
    } catch (error: any) {
      Alert.alert(
        "Login gagal",
        error?.response?.data?.message || "Email atau password salah",
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
        <Text style={styles.tagline}>Build habits. Shape life.</Text>
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
        placeholder="Password"
        placeholderTextColor="#9CA3AF"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable style={styles.primaryButton} onPress={handleLogin}>
        <Text style={styles.primaryText}>Login</Text>
      </Pressable>

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>atau</Text>
        <View style={styles.line} />
      </View>

      <Pressable
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.secondaryText}>Buat akun baru</Text>
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
    marginBottom: 36,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 12,
  },
  appName: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1B4332",
    letterSpacing: 0.5,
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
    marginTop: 4,
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    marginHorizontal: 12,
    color: "#9CA3AF",
    fontSize: 12,
  },

  secondaryButton: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#2ECC71",
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryText: {
    color: "#2ECC71",
    fontWeight: "700",
  },

  debugButton: {
    marginTop: 16,
    alignItems: "center",
  },
  debugText: {
    fontSize: 12,
    color: "#EF4444",
  },
});
