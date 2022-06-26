import { StyleSheet } from "react-native";
import Colors from "../../assets/Colors";

export const style = StyleSheet.create ({
    container:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
    },
    userItemStyle: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',    
        backgroundColor: Colors.white,
        width: '100%',
      },
    flatList: {
        alignSelf: 'stretch'
    }

})