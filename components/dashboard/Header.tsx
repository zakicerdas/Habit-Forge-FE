import { View, Text, StyleSheet } from "react-native";
import moment from "moment";

type Props = {
  selectedDate: moment.Moment;
  completed: number;
  total: number;
};

export default function Header({
  selectedDate,
  completed,
  total,
}: Props) {
  const progress = total === 0 ? 0 : completed / total;

  return (
    <View style={styles.container}>
      <View style={styles.dateBadge}>
        <Text style={styles.dateText}>
          {selectedDate.format("MMM DD, YYYY")}
        </Text>
      </View>
      
      <View style={styles.progressWrapper}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressText}>
            {completed}/{total} habits completed
          </Text>
          <Text style={styles.percentText}>
            {Math.round(progress * 100)}%
          </Text>
        </View>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress * 100}%` },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },

  dateBadge: {
    alignSelf: "center",
    backgroundColor: "#2ECC71",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
  },
  dateText: {
    color: "#fff",
    fontWeight: "600",
  },

  progressWrapper: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  progressText: {
    color: "#1B4332",
    fontWeight: "600",
  },
  percentText: {
    color: "#2ECC71",
    fontWeight: "bold",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#EAF4F4",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2ECC71",
    borderRadius: 4,
  },
});
