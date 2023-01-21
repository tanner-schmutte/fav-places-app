import { Image, Pressable, Text, View, StyleSheet } from "react-native";

function PlaceItem({ place, onSelect }) {
    return (
        <Pressable onPress={onSelect}>
            <Image source={{ uri: place.imageUri }} />
            <View>
                <Text>Title</Text>
                <Text>Address</Text>
            </View>
        </Pressable>
    );
}

export default PlaceItem;

const styles = StyleSheet.create({});
