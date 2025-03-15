import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

export default function TabLayout() {
  return (
    <>
      <Toast />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#007bff",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
          tabBarStyle: Platform.select({
            ios: { position: "absolute" },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color }) => <MaterialIcons name="search" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="add-service"
          options={{
            title: "Add Service",
            tabBarIcon: ({ color }) => <MaterialIcons name="add-circle-outline" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="my-services"
          options={{
            title: "My Services",
            tabBarIcon: ({ color }) => <MaterialIcons name="work" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}
