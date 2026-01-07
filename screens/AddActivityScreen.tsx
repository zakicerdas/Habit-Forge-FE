import { StyleSheet, View , Text, } from "react-native";


export default function AddActivityScreen() {
  return (
    <View style={styles.container}>
      <Text>Add Activity Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FFF8",
    padding: 16,
  },
});