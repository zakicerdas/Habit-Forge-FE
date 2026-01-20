import React from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, } from "@react-navigation/drawer";
import BottomTabs from "./bottomTabs";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useAuth } from "../hooks/useAuth";
import { StyleSheet, View, Text, Alert, TouchableOpacity } from "react-native";
import ProfileScreen from "../screens/Drawer/ProfileScreen";

const Drawer = createDrawerNavigator();

function DummyScreen({ title }: { title: string }) {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
}

/**
 * ===============================
 * CUSTOM DRAWER CONTENT
 * ===============================
 * Menampilkan logout button di bagian bawah drawer
 */
function CustomDrawerContent(props: any) {
    const { logout } = useAuth();

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Apakah Anda yakin ingin logout?",
            [
                { text: "Batal", onPress: () => { }, style: "cancel" },
                {
                    text: "Ya, Logout",
                    onPress: async () => {
                        try {
                            await logout();
                        } catch {
                            Alert.alert("Error", "Gagal logout");
                        }
                    },
                    style: "destructive",
                },
            ]
        );
    };

    return (
        <View style={styles.drawerContainer}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            <View style={styles.logoutContainer}>
                <TouchableOpacity
                    style={styles.logoutDrawerButton}
                    onPress={handleLogout}
                >
                    <Ionicons
                        name="log-out-outline"
                        size={22}
                        color="#E63946"
                    />
                    <Text style={styles.logoutDrawerText}>Logout</Text>
                </TouchableOpacity>
            </View>
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
            drawerContent={CustomDrawerContent}
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
                name="Profile"
                component={ProfileScreen}
                options={{ drawerLabel: "Profile" }}
            />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
    },
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
    logoutContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#E0E0E0",
    },
    logoutDrawerButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: "#FFE5E5",
    },
    logoutDrawerText: {
        color: "#E63946",
        fontWeight: "600",
        fontSize: 16,
        marginLeft: 12,
    },
});
