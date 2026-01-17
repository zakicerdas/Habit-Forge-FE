import { StyleSheet, View , Text, TouchableOpacity } from "react-native";

export default function AddActivityScreen({ navigation }: any) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create</Text>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("CreateHabit")}>
        <Text style={styles.cardTitle}>Create Habit</Text>
        <Text style={styles.cardDesc}>Build a daily habit and track progress</Text>
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
  
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1B4332",
  },

  cardDesc: {
    marginTop: 6,
    color: "#6B9080",
    fontSize: 12
  }

});