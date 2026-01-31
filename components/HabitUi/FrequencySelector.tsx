import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  Frequency,
  frequencyValues,
  frequencyDisplayNames,
} from "../../types/frequency";

type Props = {
  value: Frequency;
  onChange: (frequency: Frequency) => void;
};

export default function FrequencySelector({ value, onChange }: Props) {
  return (
    <View style={styles.row}>
      {frequencyValues.map((freq) => {
        const active = value === freq;

        return (
          <TouchableOpacity
            key={freq}
            style={[styles.chip, active && styles.active]}
            onPress={() => onChange(freq)} 
          >
            <Text style={[styles.text, active && styles.activeText]}>
              {frequencyDisplayNames[freq]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#EEE",
  },
  active: {
    backgroundColor: "#2ECC71",
  },
  text: {
    color: "#1B4332",
  },
  activeText: {
    color: "#FFF",
    fontWeight: "600",
  },
});
