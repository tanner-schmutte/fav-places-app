import { Pressable, StyleSheet, Text } from "react-native";

import { Colors } from "../../constants/Colors";

function Button({ onPress, children }) {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={onPress}
        >
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
}

export default Button;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        padddingVertical: 10,
        margin: 10,
        marginTop: 50,
        backgroundColor: Colors.purple,
        elevation: 5,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 8,
        borderRadius: 10,
    },
    pressed: {
        opacity: 0.5,
    },
    text: {
        textAlign: "center",
        fontSize: 18,
        color: "white",
    },
});
