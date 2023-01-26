import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import {
    launchCameraAsync,
    useCameraPermissions,
    PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";

import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker() {
    const [pickedImage, setPickedImage] = useState();

    const [cameraPermissionInformation, requestPermission] =
        useCameraPermissions();

    async function verifyPermissions() {
        if (
            cameraPermissionInformation.status === PermissionStatus.UNDETERMINED
        ) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                "Insufficient permissions!",
                "You need to grant camera permissions to use this app.",
                [{ text: "Okay" }]
            );
            return false;
        }

        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });

        console.log(image.assets[0].uri);

        setPickedImage(image.assets[0].uri);
    }

    let imagePreview = <Text>No image taken yet.</Text>;

    if (pickedImage) {
        imagePreview = (
            <Image style={styles.image} source={{ uri: pickedImage }} />
        );
    }

    return (
        <View>
            <View style={styles.imagePreview}>{imagePreview}</View>
            <OutlinedButton onPress={takeImageHandler} icon="camera">
                Take Photo
            </OutlinedButton>
        </View>
    );
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: "100%",
        height: 200,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ccc",
        borderRadius: 10,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
});
