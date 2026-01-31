import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./bottomTabs";
import CreateHabitScreen from "../screens/Main/CreateHabitScreen";
import DetailScreen from "../screens/Main/DetailScreen";
import EditProfileScreen from "../screens/Drawer/EditProfileScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabs} />
      <Stack.Screen name="Detail" component={DetailScreen} />

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
