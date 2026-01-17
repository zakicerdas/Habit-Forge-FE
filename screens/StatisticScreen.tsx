import { StyleSheet, View , Text, } from "react-native";

  /* Dummy */
const overallProgress = 75

const weeklyProgress = [
  {day: "Mon", value: 80},
  {day: "Tue", value: 60},
  {day: "Wed", value: 40},
  {day: "Thu", value: 90},
  {day: "Fri", value: 50},
  {day: "Sat", value: 100},
  {day: "Sun", value: 70},
]

const categoryProgress = [
  {name: "Work", value: 70},
  {name: "Study", value: 60},
  {name: "Health", value: 40},
  {name: "Fitness", value: 90},
  {name: "Personal", value: 50},
]

export default function StatisticScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistic</Text>

      {/* Overall Progress */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weekly Progress</Text>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, {width: `${overallProgress}%`} ]}/>
      </View>

          <Text style={styles.progressText}>
            {overallProgress}% Completed
          </Text>
        </View>

        {/* Weekly */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Completion</Text>

          <View style={styles.weekRow}>
            {weeklyProgress.map((item) => (
              <View key={item.day} style={styles.dayItem}>
                <View style={styles.dayBar}>
                  <View style= {[styles.dayFill, {height: `${item.value}%`}]}/>
                </View>
                <Text style={styles.dayLabel}>{item.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Category */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>By Category</Text>

          {categoryProgress.map((item)=> (
            <View key={item.name} style={styles.categoryItem}>
              <Text style={styles.categoryLabel}>{item.name}</Text>

              <View style={styles.categoryBar}>
                <View style={[styles.categoryFill, {width: `${item.value}%` }]}/>
              </View>

              <Text style={styles.categoryValue}>{item.value}%</Text>
            </View>
          ))}
        </View>
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
    marginBottom: 16,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1B4332",
    marginBottom: 12,
  },

  progressBar: {
    height: 10,
    backgroundColor: "#D8F3DC",
    borderRadius: 5,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#2ECC71",
  },

  progressText: {
    marginTop: 8,
    color: "#6B9080",
    fontSize: 12,
  },

  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 120,
  },

  dayItem: {
    alignItems: "center",
    width: 30,
  },

  dayBar: {
    height: 90,
    width: 10,
    backgroundColor: "#D8F3DC",
    borderRadius: 5,
    overflow: "hidden",
  },

  dayFill: {
    width: "100%",
    backgroundColor: "#2ECC71",
    position: "absolute",
    bottom: 0,
  },

  dayLabel: {
    marginTop: 6,
    fontSize: 10,
    color: "#6B9080",
  },

  categoryItem: {
    marginBottom: 12,
  },

  categoryLabel: {
    fontSize: 12,
    color: "#1B4332",
    marginBottom: 4,
  },

  categoryBar: {
    height: 8,
    backgroundColor: "#D8F3DC",
    borderRadius: 4,
    overflow: "hidden",
  },

  categoryFill: {
    height: "100%",
    backgroundColor: "#2ECC71",
  },

  categoryValue: {
    fontSize: 10,
    color: "#6B9080",
    marginTop: 4,
    alignSelf: "flex-end",
  },
});
