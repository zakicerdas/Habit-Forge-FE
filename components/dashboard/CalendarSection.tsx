import React from "react";
import { StyleSheet } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";

type Session = {
  date: string;
  duration: number;
};

type Props = {
  selectedDate: moment.Moment;
  onDateChange: (date: moment.Moment) => void;
  sessions: Session[];
};

export default function CalendarSection({
  selectedDate,
  onDateChange,
  sessions,
}: Props) {
  const markedDates = sessions.map((s) => ({
    date: moment(s.date),
    dots: [{ color: "#2ECC71" }],
  }));

  return (
    <CalendarStrip
      scrollable
      selectedDate={selectedDate}
      onDateSelected={onDateChange}
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
  );
}

const styles = StyleSheet.create({
  calendar: {
    height: 100,
    paddingVertical: 10,
    backgroundColor: "#F6FFF8",
    marginBottom: 12,
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
});
