import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/AuthContext";
import RootNavigator from "./navigation/RootNavigator";
import { ProfileProvider } from "./context/ProfileContext";
import { AchievementProvider } from "./context/AchievementContext";

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <AchievementProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </AchievementProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}
