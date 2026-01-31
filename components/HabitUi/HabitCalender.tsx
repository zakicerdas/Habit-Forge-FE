import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";;
import type { Moment } from "moment";
import { useState } from "react";

type Props = {
  selectedDate: Moment;
  onDateChange: (date: Moment) => void;
};

export default function CalendarSection({
  selectedDate,
  onDateChange,
}: Props) {
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate.clone().startOf("month")
  );

  const daysInMonth = currentMonth.daysInMonth();
  const firstDay = currentMonth.day();
  const days: (Moment | null)[] = [];

  for (let i = 0; i < firstDay; i++) days.push(null);
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
          <Ionicons name="chevron-back" size={22} />
        </TouchableOpacity>

        <Text style={styles.calendarTitle}>
          {currentMonth.format("MMMM YYYY")}
        </Text>

        <TouchableOpacity
          onPress={() =>
            setCurrentMonth(currentMonth.clone().add(1, "month"))
          }
        >
          <Ionicons name="chevron-forward" size={22} />
        </TouchableOpacity>
      </View>

      <View style={styles.calendarGrid}>
        {days.map((day, i) => {
          const isSelected =
            day &&
            day.isSame(selectedDate, "day");

          return (
            <TouchableOpacity
              key={i}
              disabled={!day}
              onPress={() => day && onDateChange(day)}
              style={[
                styles.calendarDay,
                isSelected && styles.calendarDayActive,
              ]}
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
