import { StyleSheet } from "react-native";
import Colors from "../../assets/Colors";

export const style = StyleSheet.create({
    container: {
        flexGrow: 2,
    },
    textEntryView: {
        flex: 1,
        padding: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    textInputStyle: {
        borderColor: Colors.loginTextInputBoarder,
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        position: 'relative',

    }
})