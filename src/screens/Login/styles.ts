import { StyleSheet } from "react-native";
import Colors from "../../assets/Colors";

export const style = StyleSheet.create({
    scrollingContainer: {
        position: 'relative'    
    },
    container: {
        flexGrow: 2,
    },
    logoView: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textEntryView: {
        flex: 1,
        padding: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
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
    loginButton:{
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