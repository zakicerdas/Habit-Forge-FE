import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./bottomTabs";
import CreateHabitScreen from "../screens/Main/CreateHabitScreen";
import EditProfileScreen from "../screens/Drawer/EditProfileScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Bottom Tabs */}
      <Stack.Screen name="MainTabs" component={BottomTabs} />

      {/* Modal / Form */}
      <Stack.Screen
        name="CreateHabit"
        component={CreateHabitScreen}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
      />
    </Stack.Navigator>
  );
}
