import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@react-native-vector-icons/ionicons";
import moment from "moment";

import CategorySelector from "../../components/HabitUi/CategorySelector";
import HabitCalendar from "../../components/HabitUi/HabitCalender";
import { useHabit } from "../../hooks/useHabit";
import { CategoryName } from "../../types/category";
import { Frequency, frequencyValues, frequencyDisplayNames } from "../../types/frequency";
import LoadingScreen from "../Auth/LoadingScreen";


export default function CreateHabitScreen() {
  const { createHabit, isLoading } = useHabit();
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState<CategoryName | null>(null);
  const [frequency, setFrequency] = useState<Frequency>(Frequency.DAILY);
  const [startDate, setStartDate] = useState(moment());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCreateHabit = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Habit title is required");
      return;
    }

    if (!categoryName) {
      Alert.alert("Error", "Please select a category");
      return;
    }

    try {
      console.log(" requesting habit:", {
        title: title.trim(),
        description: description.trim() || undefined,
        categoryName,
        frequency,
        startDate: startDate.format("YYYY-MM-DD"),
      });

      await createHabit({
        title: title.trim(),
        description: description.trim() || undefined,
        categoryName,
        frequency,
        startDate: startDate.format("YYYY-MM-DD"),
      });

      Alert.alert("Success", "Habit created successfully!");

      setTitle("");
      setDescription("");
      setCategoryName(null);
      setFrequency(Frequency.DAILY);
      setStartDate(moment());

      navigation.navigate("Home" as never);
    } catch (error: any) {
      console.log("create habit error:", error);
      Alert.alert(
        "Error",
        error?.response?.data?.message || "Failed to create habit"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Habit</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Habit Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Morning Jogging"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Description (Optional)</Text>
        <TextInput
          style={styles.descriptionInput}
          placeholder="What do you want to achieve?"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />
      </View>

      <CategorySelector
        selectedCategoryName={categoryName}
        onSelect={setCategoryName}
      />

      <View style={styles.field}>
        <Text style={styles.label}>Frequency</Text>
        <View style={styles.row}>
          {frequencyValues.map((item) => {
            const active = frequency === item;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setFrequency(item as Frequency)}
              >
                <Text
                  style={[
                    styles.chipText,
                    active && styles.chipTextActive,
                  ]}
                >
                  {frequencyDisplayNames[item as Frequency]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Start Date</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>
            {startDate.format("DD MMMM YYYY")}
          </Text>
          <Ionicons name="calendar" size={20} color="#2ECC71" />
        </TouchableOpacity>
      </View>

      <Modal visible={showDatePicker} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.calendarContainer}>
            <HabitCalendar
              selectedDate={startDate}
              onSelectDate={(date) => {
                setStartDate(date);
                setShowDatePicker(false);
              }}
            />
          </View>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setShowDatePicker(false)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.submit}
        onPress={handleCreateHabit}
        disabled={isLoading}
      >
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <Text style={styles.submitText}>Create Habit</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FFF8",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1B4332",
    marginBottom: 16,
  },
  field: { marginBottom: 16 },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1B4332",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#D8F3DC",
  },
  descriptionInput: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#D8F3DC",
    height: 100,
    textAlignVertical: "top",
  },
  row: { flexDirection: "row", gap: 10 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#D8F3DC",
  },
  chipActive: {
    backgroundColor: "#2ECC71",
    borderColor: "#2ECC71",
  },
  chipText: { color: "#1B4332" },
  chipTextActive: { color: "#FFF", fontWeight: "600" },
  datePickerButton: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D8F3DC",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: { color: "#1B4332" },
  submit: {
    backgroundColor: "#2ECC71",
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 24,
  },
  submitText: { color: "#FFF", fontWeight: "600" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 16,
  },
  calendarContainer: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
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
  calendarDay: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  calendarDayText: { color: "#1B4332" },
  calendarDayActive: { backgroundColor: "#2ECC71", borderRadius: 8 },
  calendarDayActiveText: { color: "#FFF", fontWeight: "600" },
  cancelButton: {
    backgroundColor: "#E63946",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButtonText: { color: "#FFF", fontWeight: "600" },
});
