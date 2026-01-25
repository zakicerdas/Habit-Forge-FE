import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/AuthContext";
import { HabitProvider } from "./context/HabitContext";
import RootNavigator from "./navigation/RootNavigator";

export default function App() {
  return (
    <AuthProvider>
      <HabitProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </HabitProvider>
    </AuthProvider>
  );
}
