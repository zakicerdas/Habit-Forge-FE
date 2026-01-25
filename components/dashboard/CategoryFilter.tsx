import React from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { CategoryName } from "../../types/category";
import { useCategory } from "../../hooks/useCategory";

export default function CategoryFilter({
  selected,
  onSelect,
}: {
  selected: CategoryName | "ALL";
  onSelect: (c: CategoryName | "ALL") => void;
}) {
  const { categories } = useCategory();

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Pressable
          key="ALL"
          onPress={() => onSelect("ALL")}
          style={[styles.item, selected === "ALL" && styles.active]}
        >
          <Text style={[styles.text, selected === "ALL" && styles.activeText]}>Semua</Text>
        </Pressable>

        {categories.map((c) => (
          <Pressable
            key={c.name}
            onPress={() => onSelect(c.name)}
            style={[styles.item, selected === c.name && styles.active]}
          >
            <Text style={[styles.text, selected === c.name && styles.activeText]}>
              {c.displayName}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 8,
    flexWrap: "wrap",
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: "#E9F5EE",
    marginRight: 8,
    marginBottom: 6,
  },
  active: {
    backgroundColor: "#2ECC71",
  },
  text: {
    fontSize: 12,
    color: "#1B4332",
  },
  activeText: {
    color: "#fff",
    fontWeight: "600",
  },
});
