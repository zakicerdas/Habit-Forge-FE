import { useState } from "react";
import { StyleSheet, View , Text, } from "react-native";
import CategorySelector from "../components/CategorySelector";


export default function AddActivityScreen() {
  const [category, setCategory] = useState<null | string>(null)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Activity Screen</Text>

      <CategorySelector selectedCategory={category} onSelect={setCategory}/>
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B4332",
    marginBottom: 12,
  }
});