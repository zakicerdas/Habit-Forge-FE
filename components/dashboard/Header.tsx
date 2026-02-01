import { View, Text, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";
import type { TodayHabit } from "../../types/habit";

type Props = {
  selectedDate: string;
  habits: TodayHabit[];
};

export default function Header({ selectedDate, habits }: Props) {
  const completed = habits.filter(h => h.isCheckedToday).length;
  const total = habits.length;

  const progress = total === 0 ? 0 : completed / total;

  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animatedProgress.setValue(0);

    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [progress, animatedProgress]);

  const widthInterpolated = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.dateBadge}>
        <Text style={styles.dateText}>{selectedDate}</Text>
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
          <Animated.View
            style={[styles.progressFill, { width: widthInterpolated }]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
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
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },

  progressWrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  progressText: {
    color: "#1B4332",
    fontWeight: "600",
    fontSize: 14,
  },

  percentText: {
    color: "#2ECC71",
    fontWeight: "700",
    fontSize: 14,
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
