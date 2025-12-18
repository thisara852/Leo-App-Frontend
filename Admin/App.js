// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* Import Screens */
import Dashboard from "./screens/admin/Dashboard";
import VerifyUsers from "./screens/admin/VerifyUsers";
import ManagePosts from "./screens/admin/ManagePosts";
import Announcements from "./screens/admin/Announcements";
import ReportedIssues from "./screens/admin/ReportedIssues";

/* Stack Navigator */
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#FFD700",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: "Admin Dashboard" }} />
        <Stack.Screen name="VerifyUsers" component={VerifyUsers} options={{ title: "Verify Users" }} />
        <Stack.Screen name="ManagePosts" component={ManagePosts} options={{ title: "Manage Posts" }} />
        <Stack.Screen name="Announcements" component={Announcements} options={{ title: "Announcements" }} />
        <Stack.Screen name="ReportedIssues" component={ReportedIssues} options={{ title: "Reported Issues" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
