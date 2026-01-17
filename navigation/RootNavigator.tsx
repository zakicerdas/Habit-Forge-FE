import React from "react";
import { useAuth } from "../hooks/useAuth";
import AuthNavigator from "./AuthNavigator";
import DrawerNavigator from "./DrawerNavigator";
import LoadingScreen from "../screens/AuthScreen/LoadingScreen";

export default function RootNavigator() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return token ? <DrawerNavigator /> : <AuthNavigator />;
}
