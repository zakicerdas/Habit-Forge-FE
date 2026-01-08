import { StyleSheet, View, Text, } from "react-native";


export default function StatisticScreen() {
    return (
        <View style={styles.container}>
            <Text>Statistic Screen</Text>
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