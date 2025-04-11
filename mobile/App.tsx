import {
  Poppins_400Regular,
  useFonts as useFontsPoppins
} from "@expo-google-fonts/poppins";
import {
  PTSerif_400Regular,
  useFonts as useFontsPTSerif
} from "@expo-google-fonts/pt-serif";
import {
  Raleway_400Regular,
  useFonts as useFontsRaleway
} from "@expo-google-fonts/raleway";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./pages/home";

const Stack = createNativeStackNavigator();

export default function App() {
  useFontsPoppins({
    Poppins_400Regular
  });

  useFontsRaleway({
    Raleway_400Regular
  });

  useFontsPTSerif({
    PTSerif_400Regular
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
