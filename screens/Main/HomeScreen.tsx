import React, { useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import moment from "moment";

import Header from "../../components/dashboard/Header";
import CalendarSection from "../../components/dashboard/CalendarSection";
import TodayActivities from "../../components/dashboard/TodayActivities";
import CategoryFilter from "../../components/dashboard/CategoryFilter";
import LoadingScreen from "../Auth/LoadingScreen";

import { useHabit } from "../../hooks/useHabit";
import { Frequency } from "../../types/frequency";
import { CategoryName } from "../../types/category";
import { checkInHabit } from "../../services/checkin.service";

export default function HomeScreen() {
  const { habits, isLoading, fetchHabits } = useHabit();
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryName | "ALL">("ALL");

  const activities = useMemo(() => {
    return habits
      .filter((habit) => {
        const startDate = moment(habit.startDate);

        if (selectedDate.isBefore(startDate, "day")) return false;
        if (selectedCategory !== "ALL" && habit.categoryName !== selectedCategory)
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
      })
      .map((habit) => ({
        id: habit.id,
        title: habit.title,
        completed: habit.isHabitChecked,
        habit,
      }));
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
          (habit.frequency === Frequency.WEEKLY && date.day() === startDate.day()) ||
          (habit.frequency === Frequency.MONTHLY && date.date() === startDate.date()) ||
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

  if (isLoading) return <LoadingScreen />;

  const completedCount = activities.filter((a) => a.completed).length;

  return (
    <View style={styles.container}>
      <Header
        selectedDate={selectedDate}
        completed={completedCount}
        total={activities.length}
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

      <TodayActivities
        activities={activities}
        onHabitCheckedIn={async (habitId) => {
          try {
            await checkInHabit(habitId);
            await fetchHabits();
          } catch (err) {
            console.error("Check-in gagal:", err);
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
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
