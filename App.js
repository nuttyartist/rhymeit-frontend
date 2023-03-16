import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Settings from "./screens/Settings";
import Rhyme from "./screens/Rhyme";
import { GlobalStyles } from "./constants/styles";
import { useState } from "react";
import * as Haptics from "expo-haptics";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.gray800,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: GlobalStyles.colors.gray200,
      })}
    >
      <BottomTabs.Screen
        listeners={{
          tabPress: (e) =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
        }}
        name="Rhyme"
        component={Rhyme}
        options={{
          title: "Rhyme",
          tabBarLabel: "Rhyme",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "color-wand" : "color-wand-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        listeners={{
          tabPress: (e) =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
        }}
        name="Settings"
        component={Settings}
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.gray800 },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverview}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
