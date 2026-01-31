import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/AuthContext";
import { HabitProvider } from "./context/HabitContext";
import RootNavigator from "./navigation/RootNavigator";
import { ProfileProvider } from "./context/ProfileContext";
import { AchievementProvider } from "./context/AchievementContext";

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
         <HabitProvider>
          <AchievementProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </AchievementProvider>
        </HabitProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}
