import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";

type Activity = {
  id: string;
  title: string;
  completed: boolean;
};

type Props = {
  activities: Activity[];
  onToggle: (id: string) => void;
};

export default function TodayActivities({
  activities,
  onToggle,
}: Props) {
  if (activities.length === 0) {
    return (
        
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No activities today</Text>
        <Text style={styles.emptySubtitle}>
          Add a habit to start your day
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Today</Text>

      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => onToggle(item.id)}
          >
            <View
              style={[
                styles.checkbox,
                item.completed && styles.checkboxActive,
              ]}
            >
              {item.completed && <Text style={styles.check}>✓</Text>}
            </View>

            <Text
              style={[
                styles.title,
                item.completed && styles.completedText,
              ]}
            >
              {item.title}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    flex: 1,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1B4332",
    marginBottom: 8,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#2ECC71",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxActive: {
    backgroundColor: "#2ECC71",
  },
  check: {
    color: "#fff",
    fontWeight: "bold",
  },

  title: {
    fontSize: 15,
    color: "#1B4332",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#6B9080",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1B4332",
  },
  emptySubtitle: {
    marginTop: 6,
    color: "#6B9080",
  },
});
