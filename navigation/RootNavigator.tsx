import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthNavigator from "./AuthNavigator";
import DrawerNavigator from "./DrawerNavigator";
import LoadingScreen from "../screens/AuthScreen/LoadingScreen";

export default function RootNavigator() {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return isLoggedIn ? <DrawerNavigator /> : <AuthNavigator />;
}
