import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useProfile } from "../../context/ProfileContext";
import { useAchievements } from "../../context/AchievementContext";

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const { profile, loading, editProfile } = useProfile();
    const { achievements } = useAchievements();

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.8,
    });

    if (result.didCancel || !result.assets?.[0]) return;

    const image = result.assets[0];

    await editProfile({ 
      avatar: {
        uri: image.uri!,
        type: image.type!,
        name: image.fileName || "avatar.jpg",
      }
     });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2ECC71" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text>Profile tidak tersedia</Text>
      </View>
    );
  }



  const unlocked = achievements.filter(
   (a) => a.progress >= a.target
  );


  return (
    <View style={styles.container}>
      <View style={styles.header} />

      <TouchableOpacity
        style={styles.avatarWrapper}
        onPress={pickImage}
        activeOpacity={0.8}
      >
        <Image
          source={{
            uri: profile.avatar
              ? profile.avatar
              : `https://ui-avatars.com/api/?name=${profile.fullName}&background=2ECC71&color=fff`,
          }}
          style={styles.avatar}
        />
        <View style={styles.cameraBadge}>
          <Text style={styles.cameraText}>✎</Text>
        </View>
      </TouchableOpacity>

      {/* INFO CARD */}
      <View style={styles.infoCard}>
        <Text style={styles.name}>
          {profile.fullName}
        </Text>

        <Text style={styles.bio}>
          {profile.bio || "Belum ada bio"}
        </Text>
      </View>

      {/* ACTION */}
      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.achievementSection}>
        <Text style={styles.sectionTitle}>Achievements</Text>

        {unlocked.length === 0 ? (
          <Text style={styles.emptyText}>
            Belum ada achievement terbuka
          </Text>
        ) : (
          <View style={styles.badgeRow}>
            {unlocked.slice(0, 3).map((a) => (
              <View key={a.id} style={styles.badgeBox}>
                <Text style={styles.badgeIcon}>{a.badge}</Text>
                <Text style={styles.badgeTitle}>{a.title}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FFF8",
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    width: "100%",
    height: 140,
    backgroundColor: "#2ECC71",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  avatarWrapper: {
    marginTop: -60,
    position: "relative",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#fff",
  },
  cameraBadge: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "#1B4332",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraText: {
    color: "#fff",
    fontSize: 14,
  },

  infoCard: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    width: "85%",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
    elevation: 4,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B4332",
    marginBottom: 6,
  },
  bio: {
    fontSize: 14,
    color: "#6B9080",
    textAlign: "center",
  },

  editBtn: {
    marginTop: 24,
    backgroundColor: "#2ECC71",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 24,
  },
  editText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  achievementSection: {
  marginTop: 28,
  width: "85%",
  alignItems: "center",
  },
  sectionTitle: {
  color: "#1B4332",
  fontSize: 16,
  fontWeight: "600",
  marginBottom: 14,
  textAlign: "center",
  },

  badgeRow: {
  flexDirection: "row",
  justifyContent: "center",
  gap: 12,
  width: "100%",
  },
  badgeBox: {
  flex: 1,
  maxWidth: 100,
  backgroundColor: "#ECFDF5",
  borderRadius: 16,
  paddingVertical: 14,
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#2ECC71",
  },
  badgeIcon: {
  fontSize: 26,
  },
  badgeTitle: {
  color: "#1B4332",
  fontSize: 11,
  marginTop: 6,
  textAlign: "center",
  fontWeight: "600",
  },

  emptyText: {
  color: "#6B9080",
  fontSize: 13,
  textAlign: "center",
  marginTop: 8,
  },
});
