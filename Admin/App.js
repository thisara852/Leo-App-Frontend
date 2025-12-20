import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";

/* Import Screens */
import LoginScreen from "./screens/admin/LoginScreen"; // New Auth Screen
import Dashboard from "./screens/admin/Dashboard";
import VerifyUsers from "./screens/admin/VerifyUsers";
import ManagePosts from "./screens/admin/ManagePosts";
import Announcements from "./screens/admin/Announcements";
import ReportedIssues from "./screens/admin/ReportedIssues";
import Structure from "./screens/admin/Structure";
import AlertsPage from "./screens/admin/AlertsPage";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <Stack.Navigator
        // Change initialRouteName to Login
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#FFC700", 
          headerTitleStyle: { fontWeight: "bold" },
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}
      >
        {/* Auth Screen */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />

        {/* Admin Screens */}
        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ManagePosts" 
          component={ManagePosts} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ReportedIssues" 
          component={ReportedIssues} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="VerifyUsers" 
          component={VerifyUsers} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Announcements" 
          component={Announcements} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Structure" 
          component={Structure} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AlertsPage" 
          component={AlertsPage} 
          options={{ headerShown: false }} 
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
