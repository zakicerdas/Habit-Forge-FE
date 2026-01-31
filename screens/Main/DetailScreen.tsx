import { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { useHabit } from "../../hooks/useHabit";
import { Category } from "../../types/category";
import { Frequency } from "../../types/frequency";

import CategorySelector from "../../components/HabitUi/CategorySelector";
import FrequencySelector from "../../components/HabitUi/FrequencySelector";
import LoadingScreen from "../Auth/LoadingScreen";

export default function DetailScreen() {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { habitId } = route.params;

    const { habits, updateHabit, isLoading } = useHabit();
    const habit = habits.find((h) => h.id === habitId);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<Category | null>(null);
    const [frequency, setFrequency] =
        useState<Frequency>(Frequency.DAILY);

    useEffect(() => {
        if (!habit) return;

        setTitle(habit.title);
        setDescription(habit.description || "");
        setCategory(habit.category);
        setFrequency(habit.frequency);
    }, [habit]);

    if (!habit || isLoading) return <LoadingScreen />;

    const handleUpdate = async () => {
        if (!title.trim() || !category) {
            Alert.alert("Error", "Data belum lengkap");
            return;
        }

        await updateHabit(habitId, {
            title: title.trim(),
            description: description.trim() || undefined,
            category,
            frequency,
        });

        Alert.alert("Success", "Habit updated");
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.screenTitle}>Habit Detail</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Habit Name</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                />

                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
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

            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleUpdate}
            >
                <Text style={styles.submitText}>Update Habit</Text>
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
