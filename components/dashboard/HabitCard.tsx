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
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import type { TodayHabit } from "../../types/habit";

type HabitCardsProps = {
  habits: TodayHabit[];
  onCheckIn: (habitId: string) => Promise<void>;
  onDelete?: (habitId: string) => Promise<void>;
  onPressHabit?: (habitId: string) => void;
};

export default function HabitCards({
  habits,
  onCheckIn,
  onDelete,
  onPressHabit,
}: HabitCardsProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  return (
    <View style={styles.containerWrapper}>
      {habits.map((habit) => {
        const isChecked = habit.isCheckedToday;
        const disabled = !habit.canCheckInToday;
        const isLoading = loadingId === habit.id;

        const cardStyle = [
          styles.card,
          isChecked && styles.cardPressed,
          disabled && styles.cardDisabled,
          isLoading && styles.cardLoading,
        ];

        return (
          <Pressable
            key={habit.id}
            style={cardStyle}
            disabled={isLoading}
            onPress={() => onPressHabit?.(habit.id)}
          >
            {isLoading ? (
              /* 🔹 SHIMMER STATE */
              <SkeletonPlaceholder borderRadius={16}>
                <SkeletonPlaceholder.Item
                  flexDirection="row"
                  alignItems="center"
                >
                  <SkeletonPlaceholder.Item
                    width={32}
                    height={32}
                    borderRadius={16}
                    marginRight={20}
                  />
                  <SkeletonPlaceholder.Item
                    flex={1}
                    height={16}
                    borderRadius={8}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>
            ) : (
              <>
                {/* 🔹 CHECKBOX */}
                <TouchableOpacity
                  disabled={disabled}
                  onPress={async (e) => {
                    e.stopPropagation();
                    if (disabled || isLoading) return;

                    try {
                      setLoadingId(habit.id);
                      await onCheckIn(habit.id);
                    } catch (err: any) {
                      Alert.alert(
                        "Check-in gagal",
                        err?.message || "Terjadi kesalahan"
                      );
                    } finally {
                      setLoadingId(null);
                    }
                  }}
                  style={styles.checkboxWrapper}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.circleCheckbox,
                      isChecked && styles.circleChecked,
                      disabled && styles.circleDisabled,
                    ]}
                  >
                    {isChecked && (
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color="#FFFFFF"
                      />
                    )}
                  </View>
                </TouchableOpacity>

                {/* 🔹 CONTENT */}
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

                {/* 🔹 DELETE */}
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
              </>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}


const styles = StyleSheet.create({
  containerWrapper: {
    backgroundColor: "#F0FFF4",
    borderRadius: 20,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
  },

  cardPressed: {
    opacity: 0.9,
  },

  cardDisabled: {
    opacity: 0.5,
  },

  cardLoading: {
    opacity: 0.8,
  },

  checkboxWrapper: {
    marginRight: 20,
  },

  circleCheckbox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
  },

  circleChecked: {
    backgroundColor: "#16A34A",
    borderColor: "#16A34A",
  },

  circleDisabled: {
    opacity: 0.4,
  },

  content: {
    flex: 1,
  },

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
