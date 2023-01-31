import { Image, Pressable, Text, View, StyleSheet } from "react-native";

import { Colors } from "../../constants/Colors";

function PlaceItem({ place, onSelect }) {
    return (
        <Pressable
            style={({ pressed }) => [styles.item, pressed && styles.pressed]}
            onPress={onSelect}
        >
            <Image style={styles.image} source={{ uri: place.imageUri }} />
            <View style={styles.info}>
                <Text style={styles.title}>{place.title}</Text>
                <Text style={styles.address}>{place.address}</Text>
            </View>
        </Pressable>
    );
}

export default PlaceItem;

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "flex-start",
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: Colors.orange,
        elevation: 5,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 8,
    },
    pressed: {
        opacity: 0.5,
    },
    image: {
        flex: 1,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        height: 100,
    },
    info: {
        flex: 2,
        padding: 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        color: Colors.white,
    },
    address: {
        fontSize: 12,
        color: Colors.white,
    },
});
