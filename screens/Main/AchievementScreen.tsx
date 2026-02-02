import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useAchievements } from "../../context/AchievementContext";
import AchievementCard from "../../components/AchievementCard";
import { useFocusEffect } from "@react-navigation/native";

export default function AchievementScreen() {
  const { achievements, loading, refreshAchievements } = useAchievements();

  useFocusEffect(
    React.useCallback(() => {
      refreshAchievements();
    }, [refreshAchievements])
  )

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#22C55E" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Achievements 🏆</Text>

      <FlatList
        data={achievements}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <AchievementCard achievement={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0FDF4",
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  header: {
    color: "#166534",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0FDF4",
  },
  listContainer: {
    paddingBottom: 16,
  },
});
