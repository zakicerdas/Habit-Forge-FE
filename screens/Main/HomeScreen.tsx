import React, { useState, useMemo, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Alert,
  View,
  TouchableOpacity,
} from "react-native";
import moment, { Moment } from "moment";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";

import Header from "../../components/dashboard/Header";
import CalendarSection from "../../components/dashboard/CalendarSection";
import CategoryFilter from "../../components/dashboard/CategoryFilter";
import HabitCards from "../../components/dashboard/HabitCard";
import LoadingScreen from "../Auth/LoadingScreen";

import { useHabit } from "../../hooks/useHabit";
import { Category } from "../../types/category";
import { Frequency } from "../../types/frequency";

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  const {
    habits,
    isLoading,
    handleCheckIn,
    deleteHabit,
    fetchHabits,
  } = useHabit();

  const [selectedDate, setSelectedDate] =
    useState<Moment>(moment());

  const [selectedCategory, setSelectedCategory] =
    useState<Category | "ALL">("ALL");

  // 🔴 PENTING: fetch hanya ONCE (today-status)
  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  // 🔹 Filter hanya untuk VISIBILITY
  const filteredHabits = useMemo(() => {
    return habits.filter((habit) => {
      const startDate = moment(habit.startDate);

      if (selectedDate.isBefore(startDate, "day")) return false;

      if (
        selectedCategory !== "ALL" &&
        habit.category !== selectedCategory
      ) {
        return false;
      }

      switch (habit.frequency) {
        case Frequency.DAILY:
          return true;
        case Frequency.WEEKLY:
          return selectedDate.day() === startDate.day();
        case Frequency.MONTHLY:
          return selectedDate.date() === startDate.date();
        case Frequency.YEARLY:
          return (
            selectedDate.month() === startDate.month() &&
            selectedDate.date() === startDate.date()
          );
        default:
          return false;
      }
    });
  }, [habits, selectedDate, selectedCategory]);

  if (isLoading) return <LoadingScreen />;

  const dateStr = selectedDate.format("YYYY-MM-DD");

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topHeader}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={26} color="#1B4332" />
        </TouchableOpacity>
      </View>

      {/* 🔹 HEADER sekarang AMAN */}
      <Header selectedDate={dateStr} habits={filteredHabits} />

      <CategoryFilter
        value={selectedCategory}
        onChange={setSelectedCategory}
      />

      <CalendarSection
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        sessions={[]}
      />

      <HabitCards
        habits={filteredHabits}
        onCheckIn={async (habitId) => {
          try {
            await handleCheckIn(habitId);
          } catch (err: any) {
            Alert.alert(
              "Check-in gagal",
              err?.message || "Terjadi kesalahan"
            );
          }
        }}
        onDelete={async (habitId) => {
          try {
            await deleteHabit(habitId);
          } catch (err: any) {
            Alert.alert(
              "Hapus gagal",
              err?.message || "Terjadi kesalahan"
            );
          }
        }}
        onPressHabit={(habitId) => {
          navigation.navigate("Detail", { habitId });
        }}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FFF8",
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 16,
  },
  menuButton: {
    padding: 8,
  },
});