import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { useCallback, useState } from "react";
import { Place } from "../../models/Place";
import { Colors } from "../../constants/Colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";

function PlaceForm({ onCreatePlace }) {
    const [enteredTitle, setEnteredTitle] = useState("");
    const [selectedImage, setSelectedImage] = useState();
    const [pickedLocation, setPickedLocation] = useState();

    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText);
    }

    function takeImageHandler(imageUri) {
        setSelectedImage(imageUri);
    }

    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location);
    }, []);

    function savePlaceHandler() {
        const placeData = new Place(
            enteredTitle,
            selectedImage,
            pickedLocation
        );
        onCreatePlace(placeData);
    }

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={changeTitleHandler}
                    value={enteredTitle}
                />
            </View>
            <ImagePicker onTakeImage={takeImageHandler} />
            <LocationPicker onPickLocation={pickLocationHandler} />
            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
    );
}

export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 8,
        color: Colors.white,
    },
    input: {
        marginVertical: 8,
        padding: 8,
        fontSize: 18,
        borderColor: Colors.orange,
        borderWidth: 4,
        backgroundColor: Colors.grey,
    },
});
