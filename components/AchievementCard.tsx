import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from "react-native";

type Props = {
  achievement: {
    id: string;
    title: string;
    description: string;
    progress: number;
    target: number;
    badge: string;
  };
};

export default function AchievementCard({ achievement }: Props) {
  const progressPercent =
    (achievement.progress / achievement.target) * 100;

  const unlocked = achievement.progress >= achievement.target;

  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        unlocked && styles.unlockedCard,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Text style={styles.badge}>{achievement.badge}</Text>

      <Text style={styles.title}>{achievement.title}</Text>
      <Text style={styles.desc}>{achievement.description}</Text>

      {/* Progress Bar */}
      <View style={styles.progressBg}>
        <View
          style={[
            styles.progressFill,
            { width: `${progressPercent}%` },
          ]}
        />
      </View>

      <Text style={styles.progressText}>
        {achievement.progress}/{achievement.target}
      </Text>

      <Text
        style={[
          styles.status,
          unlocked ? styles.unlocked : styles.locked,
        ]}
      >
        {unlocked ? "UNLOCKED 🎉" : "LOCKED 🔒"}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 16,
    borderRadius: 18,
    margin: 8,
  },
  unlockedCard: {
    borderWidth: 1,
    borderColor: "#22C55E",
  },
  badge: {
    fontSize: 34,
    textAlign: "center",
  },
  title: {
    color: "#fff",
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  desc: {
    color: "#9CA3AF",
    fontSize: 12,
    textAlign: "center",
    marginVertical: 6,
  },
  progressBg: {
    height: 8,
    backgroundColor: "#374151",
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#16A34A",
  },
  progressText: {
    color: "#D1D5DB",
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
  },
  status: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
  },
  unlocked: { color: "#22C55E" },
  locked: { color: "#94A3B8" },
});
