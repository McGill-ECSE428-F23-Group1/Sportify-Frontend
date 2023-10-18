import { StyleSheet, Text, TouchableOpacity } from "react-native";

import {colors, fonts} from '../constants';

const AppButton = ({title, onPress}) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
        >
            <Text style={fonts.button_text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        backgroundColor: colors.blue,
        //borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      },
});

export default AppButton;
