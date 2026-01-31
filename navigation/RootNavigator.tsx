import React from "react";
import { useAuth } from "../hooks/useAuth";
import AuthNavigator from "./AuthNavigator";
import LoadingScreen from "../screens/Auth/LoadingScreen";
import AppStackNavigator from "./appStackNavigator";

export default function RootNavigator() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return token ? <AppStackNavigator /> : <AuthNavigator />;
}
