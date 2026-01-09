import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

    /* Dummy */
const categories = [
  { id: "1", name: "Work" },
  { id: "2", name: "Study" },
  { id: "3", name: "Health" },
  { id: "4", name: "Fitness" },
  { id: "5", name: "Personal" },
];

type Props = {
  selectedCategory: string | null;
  onSelect: (category: string) => void;
};

export default function CategorySelector({
  selectedCategory,
  onSelect,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected = item.name === selectedCategory;

          return (
            <TouchableOpacity
              style={[
                styles.chip,
                isSelected && styles.chipActive,
              ]}
              onPress={() => onSelect(item.name)}
            >
              <Text
                style={[
                  styles.chipText,
                  isSelected && styles.chipTextActive,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1B4332",
    marginBottom: 8,
  },

  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#D8F3DC",
  },

  chipActive: {
    backgroundColor: "#2ECC71",
    borderColor: "#2ECC71",
  },

  chipText: {
    color: "#1B4332",
    fontWeight: "500",
  },

  chipTextActive: {
    color: "#FFFFFF",
  },
});
