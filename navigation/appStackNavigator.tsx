import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigator from "./DrawerNavigator";
import EditProfileScreen from "../screens/Drawer/EditProfileScreen";

const Stack = createNativeStackNavigator();

export default function AppStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
    </Stack.Navigator>
  );
}
