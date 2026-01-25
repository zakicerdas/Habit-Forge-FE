import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useCategory } from "../../hooks/useCategory";
import { CategoryName } from "../../types/category";
import LoadingScreen from "../../screens/Auth/LoadingScreen";



type Props = {
  selectedCategoryName: CategoryName | null;
  onSelect: (categoryName: CategoryName) => void;
};

export default function CategorySelector({
  selectedCategoryName,
  onSelect,
}: Props) {
  const { categories, loading } = useCategory();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          const isSelected = item.name === selectedCategoryName;

          return (
            <TouchableOpacity
              style={[
                styles.chip,
                isSelected && styles.chipActive,
                { borderColor: item.color },
              ]}
              onPress={() => onSelect(item.name)}
            >
              {item.icon && (
                <Ionicons
                  name={item.icon as any}
                  size={16}
                  color={isSelected ? "#FFF" : item.color || "#1B4332"}
                  style={styles.chipIcon}
                />
              )}
              <Text
                style={[
                  styles.chipText,
                  isSelected && styles.chipTextActive,
                ]}
              >
                {item.displayName}
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
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  chipActive: {
    backgroundColor: "#2ECC71",
    borderColor: "#2ECC71",
  },

  chipIcon: {
    marginRight: 2,
  },

  chipText: {
    color: "#1B4332",
    fontWeight: "500",
  },

  chipTextActive: {
    color: "#FFFFFF",
  },
});
