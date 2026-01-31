import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { Category } from "../../types/category";
import { Frequency } from "../../types/frequency";

import CategorySelector from "../../components/HabitUi/CategorySelector";
import FrequencySelector from "../../components/HabitUi/FrequencySelector";

import { useHabit } from "../../hooks/useHabit";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import LoadingScreen from "../Auth/LoadingScreen";

export default function CreateHabitScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [frequency, setFrequency] = useState<Frequency>(Frequency.DAILY);
  const navigation = useNavigation<any>();

  const { createHabit, isLoading } = useHabit();

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Title required");
      return;
    }

    if (!category) {
      Alert.alert("Error", "Category required");
      return;
    }

    await createHabit({
      title: title.trim(),
      description: description.trim() || undefined,
      category,
      frequency,
      startDate: moment().format("YYYY-MM-DD"),
    });

    Alert.alert("Success", "Habit created");
    console.log("Habit created:", {
      title: title.trim(),
      description: description.trim() || undefined,
      category,
      frequency,
      startDate: moment().format("YYYY-MM-DD"),
    });

    setTitle("");
    setDescription("");
    setCategory(null);
    setFrequency(Frequency.DAILY);

    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });



  };

  if (isLoading) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Create New Habit</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Habit Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Ngoding"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Description (optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Optional description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.label}>Category</Text>
        <CategorySelector
          selectedCategory={category}
          onSelect={setCategory}
        />

        <Text style={styles.label}>Frequency</Text>
        <FrequencySelector
          value={frequency}
          onChange={setFrequency}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
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
    screenTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#1B4332",
        marginBottom: 16,
        textAlign: "center",
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 16,
        gap: 14,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1B4332",
    },
    input: {
        backgroundColor: "#F1F5F9",
        borderRadius: 12,
        padding: 14,
        fontSize: 14,
    },
    textArea: {
        height: 90,
        textAlignVertical: "top",
    },
    submitButton: {
        marginTop: 24,
        backgroundColor: "#2ECC71",
        paddingVertical: 14,
        borderRadius: 16,
        alignItems: "center",
    },
    submitText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
});
