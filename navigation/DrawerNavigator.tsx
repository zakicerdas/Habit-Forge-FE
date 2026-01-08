import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabs from "./BottomTabs";
import { StyleSheet, View, Text } from "react-native";

const Drawer = createDrawerNavigator();

function DummyScreen({ title }: { title: string }) {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
}

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: styles.drawer,
                drawerActiveTintColor: "#2ecc71",
                drawerLabelStyle: styles.label,
            }}
        >
            <Drawer.Screen
                name="Home"
                component={BottomTabs}
                options={{ drawerLabel: "Home" }}
            />
            <Drawer.Screen
                name="Settings"
                children={() => <DummyScreen title="Settings Screen" />}
            />
            <Drawer.Screen
                name="About"
                children={() => <DummyScreen title="About Screen" />}
            />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    drawer: {
        backgroundColor: "#fff",
        width: 260,
    },
    label: {
        fontSize: 16,
    },
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 20,
    },
});
