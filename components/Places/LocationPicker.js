import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
    getCurrentPositionAsync,
    useForegroundPermissions,
    PermissionStatus,
} from "expo-location";
import {
    useNavigation,
    useRoute,
    useIsFocused,
} from "@react-navigation/native";

import OutlinedButton from "../UI/OutlinedButton";
import { getAddress, getMapPreview } from "../../util/location";

function LocationPicker({ onPickLocation }) {
    const [pickedLocation, setPickedLocation] = useState();
    const isFocused = useIsFocused();

    const navigation = useNavigation();
    const route = useRoute();

    const [locationPermissionInformation, requestPermission] =
        useForegroundPermissions();

    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = {
                lat: route.params.pickedLat,
                lng: route.params.pickedLng,
            };
            setPickedLocation(mapPickedLocation);
        }
    }, [route, isFocused]);

    useEffect(() => {
        async function handleLocation() {
            if (
                pickedLocation.lat !== undefined &&
                pickedLocation.lng !== undefined
            ) {
                const address = await getAddress(
                    pickedLocation.lat,
                    pickedLocation.lng
                );
                onPickLocation({ ...pickedLocation, address: address });
            }
        }

        handleLocation();
    }, [pickedLocation, onPickLocation]);

    async function verifyPermissions() {
        if (
            locationPermissionInformation.status ===
            PermissionStatus.UNDETERMINED
        ) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                "Insufficient permissions!",
                "You need to grant location permissions to use this app.",
                [{ text: "Okay" }]
            );
            return false;
        }

        return true;
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
    }

    function pickOnMapHandler() {
        navigation.navigate("Map");
    }

    let locationPreview = <Text>No location chosen yet!</Text>;

    if (pickedLocation) {
        locationPreview = (
            <Image
                style={styles.image}
                source={{
                    uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
                }}
            />
        );
    }

    return (
        <View>
            <View style={styles.mapPreview}>{locationPreview}</View>
            <View style={styles.actions}>
                <OutlinedButton icon="location" onPress={getLocationHandler}>
                    Locate User
                </OutlinedButton>
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>
                    Pick on Map
                </OutlinedButton>
            </View>
        </View>
    );
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: "100%",
        height: 200,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ccc",
        borderRadius: 10,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
});
