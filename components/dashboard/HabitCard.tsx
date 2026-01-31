import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import type { Habit } from "../../types/habit";

type HabitCardsProps = {
  habits: Habit[];
  selectedDate: string;
  onCheckIn: (habitId: string, date: string) => Promise<void>;
  onDelete?: (habitId: string) => Promise<void>;
  onPressHabit?: (habitId: string) => void;
};

export default function HabitCards({
  habits,
  selectedDate,
  onCheckIn,
  onDelete,
  onPressHabit,
}: HabitCardsProps) {
  const [localChecked, setLocalChecked] = useState<Set<string>>(new Set());

  return (
    <View style={styles.container}>
      {habits.map((habit) => {
        const checkedFromServer = habit.checkIn?.some(
          (c) => c.date === selectedDate
        );

        const isChecked =
          checkedFromServer || localChecked.has(habit.id);

        return (
          <Pressable
            key={habit.id}
            style={({ pressed }) => [
              styles.card,
              pressed && { opacity: 0.9 },
            ]}
            onPress={() => onPressHabit?.(habit.id)}
          >
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                if (isChecked) return;

                setLocalChecked((prev) => new Set(prev).add(habit.id));

                onCheckIn(habit.id, selectedDate).catch((err: any) => {
                  setLocalChecked((prev) => {
                    const next = new Set(prev);
                    next.delete(habit.id);
                    return next;
                  });

                  Alert.alert(
                    "Check-in gagal",
                    err?.message || "Terjadi kesalahan"
                  );
                });
              }}
              style={styles.checkbox}
            >
              <Ionicons
                name={isChecked ? "checkbox" : "square-outline"}
                size={24}
                color={isChecked ? "#9CA3AF" : "#16A34A"}
              />
            </TouchableOpacity>

            <View style={styles.content}>
              <Text
                numberOfLines={2}
                style={[
                  styles.title,
                  isChecked && styles.completedText,
                ]}
              >
                {habit.title}
              </Text>
            </View>

            {onDelete && (
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  onDelete(habit.id).catch((err: any) => {
                    Alert.alert(
                      "Hapus gagal",
                      err?.message || "Terjadi kesalahan"
                    );
                  });
                }}
                style={styles.deleteButton}
              >
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color="#E53935"
                />
              </TouchableOpacity>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
  },
  checkbox: { marginRight: 12 },
  content: { flex: 1 },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },
  deleteButton: {
    marginLeft: 12,
    padding: 6,
  },
});
