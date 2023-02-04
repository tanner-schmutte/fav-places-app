import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import Map from "./screens/Map";
import PlaceDetails from "./screens/PlaceDetails";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/Colors";
import { init } from "./util/database";

const Stack = createNativeStackNavigator();
// SplashScreen.preventAutoHideAsync();

export default function App() {
    const [dbInitialized, setDbInitialized] = useState();

    useEffect(() => {
        init()
            .then(() => {
                setDbInitialized(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
                    <Stack.Screen name="Map" component={Map} />
                    <Stack.Screen
                        name="PlaceDetails"
                        component={PlaceDetails}
                        options={{ title: "Loading place..." }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
