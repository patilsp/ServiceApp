import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import Toaster from "react-native-toast-message";

// Import Screens & Components
import HomeScreen from "./screens/HomeScreen";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    
     
        <SafeAreaProvider>
        <Header /> {/* Global Header */}
        <Drawer.Navigator
          screenOptions={{
            headerShown: false, // Hide default header
          }}
          drawerContent={(props) => <Sidebar {...props} />} // Custom Sidebar
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
        </Drawer.Navigator>
      
      <Toaster />
    </SafeAreaProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
