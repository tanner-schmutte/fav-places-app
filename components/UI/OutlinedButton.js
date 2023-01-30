import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../constants/Colors";

function OutlinedButton({ onPress, icon, children }) {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={onPress}
        >
            <Ionicons
                style={styles.icon}
                name={icon}
                size={18}
                color={Colors.white}
            />
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
}

export default OutlinedButton;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.orange,
    },
    pressed: {
        opacity: 0.5,
    },
    icon: {
        marginRight: 6,
    },
    text: {
        color: Colors.white,
    },
});
