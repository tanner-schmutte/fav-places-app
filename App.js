import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <>
            <StatusBar style="dark" />
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: { backgroundColor: Colors.green },
                        headerTintColor: Colors.white,
                        contentStyle: { backgroundColor: Colors.green },
                    }}
                >
                    <Stack.Screen
                        name="AllPlaces"
                        component={AllPlaces}
                        options={({ navigation }) => ({
                            title: "Your Favorite Places",
                            headerRight: ({ tintColor }) => (
                                <IconButton
                                    icon="add"
                                    size={30}
                                    color={tintColor}
                                    onPress={() =>
                                        navigation.navigate("AddPlace")
                                    }
                                />
                            ),
                        })}
                    />
                    <Stack.Screen
                        name="AddPlace"
                        component={AddPlace}
                        options={{ title: "Add a new place" }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
