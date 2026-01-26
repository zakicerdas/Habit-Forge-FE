import React, { useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import moment from "moment";

import Header from "../../components/dashboard/Header";
import CalendarSection from "../../components/dashboard/CalendarSection";
import CategoryFilter from "../../components/dashboard/CategoryFilter";
import LoadingScreen from "../Auth/LoadingScreen";
import HabitCards from "../../components/dashboard/HabitCard";

import { useHabit } from "../../hooks/useHabit";
import { Frequency } from "../../types/frequency";
import { CategoryName } from "../../types/category";
import { checkInHabit } from "../../services/checkin.service";

export default function HomeScreen() {
  const { habits, isLoading, fetchHabits } = useHabit();
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryName | "ALL">("ALL");

  // Filter habit sesuai tanggal & kategori
  const filteredHabits = useMemo(() => {
    return habits.filter((habit) => {
      const startDate = moment(habit.startDate);

      if (selectedDate.isBefore(startDate, "day")) return false;
      if (
        selectedCategory !== "ALL" &&
        habit.categoryName !== selectedCategory
      )
        return false;

      if (habit.frequency === Frequency.DAILY) return true;
      if (habit.frequency === Frequency.WEEKLY)
        return selectedDate.day() === startDate.day();
      if (habit.frequency === Frequency.MONTHLY)
        return selectedDate.date() === startDate.date();
      if (habit.frequency === Frequency.YEARLY)
        return (
          selectedDate.month() === startDate.month() &&
          selectedDate.date() === startDate.date()
        );

      return false;
    });
  }, [habits, selectedDate, selectedCategory]);

  const sessions = useMemo(() => {
    const map: Record<string, { date: string; duration: number }> = {};

    habits.forEach((habit) => {
      const startDate = moment(habit.startDate);
      const today = moment();

      for (let i = 0; i < 90; i++) {
        const date = startDate.clone().add(i, "days");
        if (date.isAfter(today, "day")) break;

        const show =
          habit.frequency === Frequency.DAILY ||
          (habit.frequency === Frequency.WEEKLY &&
            date.day() === startDate.day()) ||
          (habit.frequency === Frequency.MONTHLY &&
            date.date() === startDate.date()) ||
          (habit.frequency === Frequency.YEARLY &&
            date.month() === startDate.month() &&
            date.date() === startDate.date());

        if (!show) continue;

        const key = date.format("YYYY-MM-DD");
        if (!map[key]) map[key] = { date: key, duration: 0 };
        map[key].duration += 25;
      }
    });

    return Object.values(map);
  }, [habits]);

  const completedCount = filteredHabits.filter(
    (habit) => (habit.checkIn?.length || 0) > 0
  ).length;

  if (isLoading) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <Header
        selectedDate={selectedDate}
        completed={completedCount}
        total={filteredHabits.length}
      />

      <CategoryFilter
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <CalendarSection
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        sessions={sessions}
      />

      <HabitCards
        habits={filteredHabits}
        onCheckIn={async (habitId: string) => {
          try {
            await checkInHabit(habitId, selectedDate.format("YYYY-MM-DD"));
            await fetchHabits(selectedDate.format("YYYY-MM-DD"));
          } catch (err: any) {
            console.log("Check-in error:", err?.response?.data || err);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FFF8",
    padding: 16,
  },
});
