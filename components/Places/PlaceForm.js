import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";

function PlaceForm() {
    const [enteredTitle, setEnteredTitle] = useState("");

    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText);
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
            <ImagePicker />
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
