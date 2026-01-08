import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@react-native-vector-icons/ionicons";
import moment from "moment";

const sessions = [
  { date: "2026-01-08", duration: 25 },
  { date: "2026-01-10", duration: 50 },
  { date: "2026-01-12", duration: 25 },
];

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(moment());
  const navigation = useNavigation<any>();

  const markedDates = sessions.map((s) => ({
    date: moment(s.date),
    dots: [{ color: "#2ECC71" }],
  }));

  return (
    <View style={styles.container}>

      <Pressable onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={28} color="#2ecc71" />
      </Pressable>

      {/* Date badge */}
      <View style={styles.dateBadge}>
        <Text style={styles.dateText}>
          {selectedDate.format("MMM DD, YYYY")}
        </Text>
      </View>

      {/* Calendar */}
      <CalendarStrip
        scrollable
        selectedDate={selectedDate}
        onDateSelected={setSelectedDate}
        markedDates={markedDates}
        style={styles.calendar}
        calendarColor={styles.calendar.backgroundColor}
        calendarHeaderStyle={styles.calendarHeader}
        dateNameStyle={styles.dateName}
        dateNumberStyle={styles.dateNumber}
        highlightDateNameStyle={styles.highlightText}
        highlightDateNumberStyle={styles.highlightText}
        highlightDateContainerStyle={styles.highlightContainer}
      />

      {/* Empty state */}
      <View style={styles.centerContent}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>⏱️</Text>
        </View>

        <Text style={styles.title}>No Sessions Yet</Text>
        <Text style={styles.subtitle}>
          Start a focus session to track your productivity
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FFF8",
    padding: 16,
  },

  titles: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1B4332",
    marginTop: 16,
    marginBottom: 12,
  },

  /* Date badge */
  dateBadge: {
    alignSelf: "center",
    backgroundColor: "#2ECC71",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  dateText: {
    color: "#fff",
    fontWeight: "600",
  },

  /* Calendar */
  calendar: {
    height: 100,
    paddingVertical: 10,
    backgroundColor: "#F6FFF8",
  },
  calendarHeader: {
    color: "#1B4332",
    fontWeight: "600",
    marginBottom: 6,
  },
  dateName: {
    color: "#6B9080",
    fontSize: 12,
  },
  dateNumber: {
    color: "#1B4332",
    fontSize: 16,
    fontWeight: "bold",
  },
  highlightText: {
    color: "#fff",
  },
  highlightContainer: {
    backgroundColor: "#2ECC71",
    borderRadius: 16,
  },

  /* Center content */
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#A8E6CF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    fontSize: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B4332",
  },
  subtitle: {
    marginTop: 6,
    textAlign: "center",
    color: "#6B9080",
  },

  /* Timer */
  timerCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1B4332",
  },
  playButton: {
    backgroundColor: "#2ECC71",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  playText: {
    color: "#fff",
    fontSize: 16,
  },
});
