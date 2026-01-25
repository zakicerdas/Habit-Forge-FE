import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

type Activity = {
  id: string;
  title: string;
  completed: boolean;
};

type Props = {
  activities: Activity[];
  onHabitCheckedIn: (habitId: string) => void;
};

export default function TodayActivities({
  activities,
  onHabitCheckedIn,
}: Props) {
  return (
    <View style={styles.container}>
      {activities.map((activity) => {
        const isChecked = activity.completed;

        return (
          <Pressable
            key={activity.id}
            style={styles.item}
            disabled={isChecked}
            onPress={() => onHabitCheckedIn(activity.id)}
          >
            <Ionicons
              name={isChecked ? "checkbox" : "square-outline"}
              size={24}
              color={isChecked ? "#9CA3AF" : "#16A34A"}
            />


            <Text
              style={[
                styles.text,
                isChecked && styles.textCompleted,
              ]}
            >
              {activity.title}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
    color: "#111827",
  },
  textCompleted: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },
});

