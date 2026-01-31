import {  Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Category } from "../../types/category";

const categories: (Category | "ALL")[] = [
  "ALL",
  Category.HEALTH,
  Category.FINANCE,
  Category.WORK,
  Category.LEARNING,
  Category.SOCIAL,
];

type Props = {
  value: Category | "ALL";
  onChange: (val: Category | "ALL") => void;
};

export default function CategoryFilter({ value, onChange }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {categories.map((cat) => {
        const active = value === cat;

        return (
          <TouchableOpacity
            key={cat}
            activeOpacity={0.85}
            style={[
              styles.chip,
              active ? styles.activeChip : styles.inactiveChip,
            ]}
            onPress={() => onChange(cat)}
          >
            <Text
              style={[
                styles.text,
                active ? styles.activeText : styles.inactiveText,
              ]}
            >
              {cat === "ALL" ? "All" : cat}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    gap: 10,
    paddingBottom: 4,
  },

  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },

  activeChip: {
    backgroundColor: "#2ECC71",
    elevation: 3,
  },

  inactiveChip: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  text: {
    fontSize: 13,
    fontWeight: "600",
  },

  activeText: {
    color: "#FFFFFF",
  },

  inactiveText: {
    color: "#1B4332",
  },
});
