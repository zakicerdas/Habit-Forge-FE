import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Category, categoryLabel, categoryValues } from "../../types/category";

type Props = {
  selectedCategory?: Category | null;
  onSelect: (category: Category) => void;
};

export default function CategorySelector({
  selectedCategory,
  onSelect,
}: Props) {
  return (
    <View style={styles.container}>
      {categoryValues.map((category) => {
        const active = category === selectedCategory;

        return (
          <TouchableOpacity
            key={category}
            style={[styles.chip, active && styles.activeChip]}
            onPress={() => onSelect(category)}
          >
            <Text style={[styles.text, active && styles.activeText]}>
              {categoryLabel[category]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },
  activeChip: {
    backgroundColor: "#2ECC71",
  },
  text: {
    fontSize: 13,
    color: "#1B4332",
    fontWeight: "500",
  },
  activeText: {
    color: "#FFF",
    fontWeight: "600",
  },
});
