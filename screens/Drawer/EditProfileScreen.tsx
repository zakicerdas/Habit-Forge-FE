import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { useProfile } from "../../context/ProfileContext";

export default function EditProfileScreen({ navigation }: any) {
  const { profile, editProfile } = useProfile();

  const [fullName, setFullName] = useState(profile?.fullName ?? "");
  const [bio, setBio] = useState(profile?.bio ?? "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!fullName.trim()) {
      Alert.alert("Error", "Full Name tidak boleh kosong");
      return;
    }

    setLoading(true);
    try {
      await editProfile({ fullName, bio });
      Alert.alert("Success", "Profile berhasil diupdate");
      navigation.goBack();
    } catch (error: any) {
      console.error("Save error:", error);
      Alert.alert(
        "Error", 
        error.response?.data?.message || "Gagal update profile. Coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Masukkan nama lengkap"
        editable={!loading}
      />

      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={[styles.input, styles.bio]}
        value={bio}
        onChangeText={setBio}
        placeholder="Ceritakan tentang dirimu..."
        multiline
        editable={!loading}
      />

      <TouchableOpacity
        style={[styles.saveBtn, loading && styles.saveBtnDisabled]}
        onPress={handleSave}
        disabled={loading}
      >
        <Text style={styles.saveText}>
          {loading ? "Menyimpan..." : "Simpan"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F6FFF8",
  },
  label: {
    color: "#1B4332",
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  bio: {
    height: 80,
    textAlignVertical: "top",
  },
  saveBtn: {
    backgroundColor: "#2ECC71",
    padding: 14,
    borderRadius: 24,
    alignItems: "center",
    marginTop: 10,
  },
  saveBtnDisabled: {
    backgroundColor: "#A0D9B4",
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
  },
});