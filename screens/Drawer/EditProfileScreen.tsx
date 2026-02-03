import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useState } from "react";
import { useProfile } from "../../context/ProfileContext";
import { launchImageLibrary } from "react-native-image-picker";

export default function EditProfileScreen({ navigation }: any) {
  const { profile, editProfile } = useProfile();

  const [fullName, setFullName] = useState(profile?.fullName ?? "");
  const [bio, setBio] = useState(profile?.bio ?? "");
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<any>(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        };
        setAvatar(source);
      }
    });
  };

  const handleSave = async () => {
    if (!fullName.trim()) {
      Alert.alert("Error", "Full Name tidak boleh kosong");
      return;
    }

    setLoading(true);
    try {
      await editProfile({ fullName, bio, avatar });
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
      <View style={styles.avatarContainer}>
        <Image
          source={
            avatar
              ? { uri: avatar.uri }
              : profile?.avatar
              ? { uri: profile.avatar }
              : require("../../assets/logo.png")
          }
          style={styles.avatar}
        />
        <TouchableOpacity onPress={handleChoosePhoto}>
          <Text style={styles.changePhotoText}>Ganti Foto</Text>
        </TouchableOpacity>
      </View>

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
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changePhotoText: {
    color: "#2ECC71",
    marginTop: 10,
    fontWeight: "600",
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