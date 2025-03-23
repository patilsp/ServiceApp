// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";

export default function TabLayout() {
  return (
    <>
      <Header />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#1e90ff",
          tabBarInactiveTintColor: "#666",
          tabBarStyle: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderTopWidth: 0,
            elevation: 5,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="Services"
          options={{
            title: "Services",
            tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="Book"
          options={{
            title: "Book",
            tabBarIcon: ({ color, size }) => <Ionicons name="add-circle-outline" size={size} color={color} />,
          }}
        />
         <Tabs.Screen
          name="Appointments"
          options={{
            title: "Appointments",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}