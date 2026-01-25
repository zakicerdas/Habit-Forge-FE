import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import moment from "moment";

interface HabitCalendarProps {
  selectedDate: moment.Moment;
  onSelectDate: (date: moment.Moment) => void;
}

export default function HabitCalendar({
  selectedDate,
  onSelectDate,
}: HabitCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate.clone());

  const daysInMonth = currentMonth.daysInMonth();
  const firstDay = currentMonth.clone().startOf("month").day();
  const days: (moment.Moment | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Add days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(currentMonth.clone().date(i));
  }

  return (
    <View>
      <View style={styles.calendarHeader}>
        <TouchableOpacity
          onPress={() =>
            setCurrentMonth(currentMonth.clone().subtract(1, "month"))
          }
        >
          <Ionicons name="chevron-back" size={24} color="#2ECC71" />
        </TouchableOpacity>
        <Text style={styles.calendarTitle}>
          {currentMonth.format("MMMM YYYY")}
        </Text>
        <TouchableOpacity
          onPress={() => setCurrentMonth(currentMonth.clone().add(1, "month"))}
        >
          <Ionicons name="chevron-forward" size={24} color="#2ECC71" />
        </TouchableOpacity>
      </View>

      <View style={styles.calendarGrid}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <View key={day} style={styles.calendarDayHeader}>
            <Text style={styles.calendarDayHeaderText}>{day}</Text>
          </View>
        ))}
      </View>

      <View style={styles.calendarGrid}>
        {days.map((day, index) => {
          const isSelected =
            day &&
            day.format("YYYY-MM-DD") === selectedDate.format("YYYY-MM-DD");

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.calendarDay,
                isSelected && styles.calendarDayActive,
              ]}
              onPress={() => day && onSelectDate(day)}
              disabled={!day}
            >
              {day && (
                <Text
                  style={[
                    styles.calendarDayText,
                    isSelected && styles.calendarDayActiveText,
                  ]}
                >
                  {day.date()}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  calendarTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1B4332",
  },

  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  calendarDayHeader: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    margin: 2,
  },

  calendarDayHeaderText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1B4332",
  },

  calendarDay: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    margin: 2,
  },

  calendarDayText: {
    fontSize: 12,
    color: "#1B4332",
  },

  calendarDayActive: {
    backgroundColor: "#2ECC71",
  },

  calendarDayActiveText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
