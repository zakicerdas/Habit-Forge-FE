import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

const dummyUser = {
  name: "Dummy",
  email: "dummy@email.com",
  avatar: "https://i.pravatar.cc/150",
  stats: {
    habits: 12,
    completedToday: 5,
    longestStreak: 20,
  },
};

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ProfileHeader />
      <ProfileStats />
      <ProfileActions />
    </View>
  );
}

    /* header */
function ProfileHeader() {
  return (
    <View style={styles.header}>
      <Image
        source={{ uri: dummyUser.avatar }}
        style={styles.avatar}
      />

      <Text style={styles.name}>{dummyUser.name}</Text>
      <Text style={styles.email}>{dummyUser.email}</Text>
    </View>
  );
}

    /* stats */
function ProfileStats() {
  return (
    <View style={styles.stats}>
      <StatItem label="Habits" value={dummyUser.stats.habits} />
      <StatItem label="Done Today" value={dummyUser.stats.completedToday} />
      <StatItem label="Best Streak" value={dummyUser.stats.longestStreak} />
    </View>
  );
}

function StatItem({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

    /* actions */
function ProfileActions() {
  return (
    <View style={styles.actions}>
      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FFF8",
    padding: 16,
  },

  header: {
    alignItems: "center",
    marginTop: 24,
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B4332",
  },

  email: {
    marginTop: 4,
    color: "#6B9080",
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 32,
    paddingHorizontal: 8,
  },

  statItem: {
    alignItems: "center",
    flex: 1,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B4332",
  },

  statLabel: {
    marginTop: 4,
    fontSize: 12,
    color: "#6B9080",
    textAlign: "center",
  },

  actions: {
    gap: 12,
  },

  primaryButton: {
    backgroundColor: "#2ECC71",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
