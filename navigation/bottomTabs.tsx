import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
    createBottomTabNavigator,
    BottomTabBarButtonProps,
} from "@react-navigation/bottom-tabs";
import { Ionicons } from "@react-native-vector-icons/ionicons";

import HomeScreen from "../screens/Main/HomeScreen";
import StatisticsScreen from "../screens/Main/StatisticScreen";
import CreateHabitScreen from "../screens/Main/CreateHabitScreen";

const Tab = createBottomTabNavigator();

type TabIconProps = {
    focused: boolean;
    color: string;
    size: number;
};

function TodayIcon({ focused, color, size }: TabIconProps) {
    return (
        <Ionicons
            name={focused ? "calendar" : "calendar-outline"}
            size={size}
            color={focused ? styles.activeIcon.color : color}
        />
    );
}

function StatsIcon({ focused, color, size }: TabIconProps) {
    return (
        <Ionicons
            name={focused ? "stats-chart" : "stats-chart-outline"}
            size={size}
            color={focused ? styles.activeIcon.color : color}
        />
    );
}

const renderTodayIcon = (props: TabIconProps) => (
    <TodayIcon {...props} />
);

const renderStatsIcon = (props: TabIconProps) => (
    <StatsIcon {...props} />
);

function TabBarBackground() {
    return <View style={styles.tabBarBackground} />;
}

function AddButton(props: BottomTabBarButtonProps) {
    const { onPress } = props;

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                style={styles.addButton}
                onPress={onPress}
                activeOpacity={0.85}
            >
                <Ionicons name="add" size={32} color={styles.addIcon.color} />
            </TouchableOpacity>
        </View>
    );
}

const renderAddButton = (props: BottomTabBarButtonProps) => (
    <AddButton {...props} />
);

export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: styles.activeIcon.color,
                tabBarInactiveTintColor: styles.inactiveIcon.color,
                tabBarLabelStyle: styles.label,
                tabBarStyle: styles.tabBar,
                tabBarBackground: TabBarBackground,
            }}
        >
            <Tab.Screen
                name="Today"
                component={HomeScreen}
                options={{
                    tabBarIcon: renderTodayIcon,
                }}
            />

            <Tab.Screen
                name="Add"
                component={CreateHabitScreen}
                options={{
                    tabBarLabel: "",
                    tabBarButton: renderAddButton,
                }}
            />

            <Tab.Screen
                name="Statistics"
                component={StatisticsScreen}
                options={{
                    tabBarIcon: renderStatsIcon,
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        height: 70,
        backgroundColor: "transparent",
        borderTopWidth: 0,
        elevation: 0,
    },

    tabBarBackground: {
        position: "absolute",
        left: 16,
        right: 16,
        bottom: 10,
        height: 70,
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        elevation: 6,
    },

    label: {
        fontSize: 12,
        marginBottom: 6,
        fontWeight: "500",
    },
    wrapper: {
        position: "absolute",
        left: "50%",
        transform: [{ translateX: -30 }],
    },

    addButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#2ECC71",
        justifyContent: "center",
        alignItems: "center",
        marginTop: -30,
        elevation: 8,
    },

    activeIcon: {
        color: "#2ECC71",
    },

    inactiveIcon: {
        color: "#6B9080",
    },

    addIcon: {
        color: "#FFFFFF",
    },
});
