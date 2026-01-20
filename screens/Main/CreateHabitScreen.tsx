import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import CategorySelector from "../../components/CategorySelector";

export default function CreateHabitScreen() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [frequency, setFrequency] = useState("Daily");
  const [startDate] = useState("2026-01-08"); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Habit</Text>

      {/* Habit Name */}
      <View style={styles.field}>
        <Text style={styles.label}>Habit Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Morning Jogging"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Category */}
      <CategorySelector
        selectedCategory={category}
        onSelect={setCategory}
      />

      {/* Frequency */}
      <View style={styles.field}>
        <Text style={styles.label}>Frequency</Text>
        <View style={styles.row}>
          {["Daily", "Weekly"].map((item) => {
            const active = frequency === item;
            return (
              <TouchableOpacity
                key={item}
                style={[
                  styles.chip,
                  active && styles.chipActive,
                ]}
                onPress={() => setFrequency(item)}
              >
                <Text
                  style={[
                    styles.chipText,
                    active && styles.chipTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Start Date */}
      <View style={styles.field}>
        <Text style={styles.label}>Start Date</Text>
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>{startDate}</Text>
        </View>
      </View>

      {/* Submit */}
      <TouchableOpacity style={styles.submit}>
        <Text style={styles.submitText}>Create Habit</Text>
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

  field: {
    marginBottom: 16,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1B4332",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#D8F3DC",
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8F3DC",
  },

  chipActive: {
    backgroundColor: "#2ECC71",
    borderColor: "#2ECC71",
  },

  chipText: {
    color: "#1B4332",
  },

  chipTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  dateBox: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D8F3DC",
  },

  dateText: {
    color: "#1B4332",
  },

  submit: {
    backgroundColor: "#2ECC71",
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 24,
  },

  submitText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
});
