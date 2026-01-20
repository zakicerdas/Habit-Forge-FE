import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import moment from "moment";

import Header from "../../components/dashboard/Header";
import CalendarSection from "../../components/dashboard/CalendarSection";
import TodayActivities from "../../components/dashboard/TodayActivities";

const sessions = [
  { date: "2026-01-08", duration: 25 },
  { date: "2026-01-10", duration: 50 },
  { date: "2026-01-12", duration: 25 },
];

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [activities, setActivities] = useState([
    { id: "1", title: "Drink Water", completed: false },
    { id: "2", title: "Morning Exercise", completed: true },
    { id: "3", title: "Read 10 pages", completed: false },
  ]);

  const toggleActivity = (id: string) => {
    setActivities((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, completed: !a.completed } : a
      )
    );
  };

  const completedCount = activities.filter((a) => a.completed).length;

  return (
    <View style={styles.container}>
      <Header
        selectedDate={selectedDate}
        completed={completedCount}
        total={activities.length}
      />

      <CalendarSection
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        sessions={sessions}
      />

      <TodayActivities
        activities={activities}
        onToggle={toggleActivity}
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
