import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { MotiView, AnimatePresence } from "moti";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Habit } from "../../types/habit";

const SCREEN_WIDTH = Dimensions.get("window").width;

type HabitCardsProps = {
  habits: Habit[]; 
  onCheckIn: (habitId: string) => Promise<void>; // fungsi check-in
  onDelete?: (habitId: string) => Promise<void>; // optional delete
};

export default function HabitCards({ habits, onCheckIn, onDelete }: HabitCardsProps) {
  const handleCheckIn = async (habitId: string) => {
    try {
      await onCheckIn(habitId);
    } catch (err) {
      console.log("Check-in error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <AnimatePresence>
        {habits.map((habit) => {
          const isChecked = (habit.checkIn?.length || 0) > 0;

          return (
            <MotiView
              key={habit.id}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -20 }}
              transition={{ type: "spring", damping: 15, stiffness: 120 }}
              style={styles.card}
            >
              <TouchableOpacity onPress={() => handleCheckIn(habit.id)}>
                <Ionicons
                  name={isChecked ? "checkbox" : "square-outline"}
                  size={24}
                  color={isChecked ? "#9CA3AF" : "#fff"}
                />
              </TouchableOpacity>

              <Text style={styles.title}>{habit.title}</Text>

              {onDelete && (
                <TouchableOpacity onPress={() => onDelete(habit.id)} style={styles.deleteButton}>
                  <Text style={styles.deleteText}>Hapus</Text>
                </TouchableOpacity>
              )}
            </MotiView>
          );
        })}
      </AnimatePresence>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  card: {
    width: SCREEN_WIDTH - 32,
    height: 120,
    backgroundColor: "#16A34A",
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  deleteButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteText: { color: "#fff", fontWeight: "bold" },
});
