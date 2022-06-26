import { StyleSheet } from "react-native";
import Colors from "../../assets/Colors";

export const style = StyleSheet.create({
    container: {
        flexGrow: 2,
    },
    logoView: {
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 110,
        height: 110,
        marginBottom: 8,
    },

    header: {
        fontSize: 21,
        color: Colors.primary,
        fontWeight: 'bold',
        paddingVertical: 12,
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

    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: Colors.primary,
    }
})