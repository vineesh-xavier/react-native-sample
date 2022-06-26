import React, { useEffect } from "react"
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from "../../screens/Login";
import SignUpScreen from "../../screens/SignUp";
import { RootStackParamList } from "./navParams";
import DrawerNav from "./drawerNav";
import { ROOT_STACK_SCREENS } from "./screens";
import { useReduxSelector } from "../redux/store";

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNav() {
    const isLoggedIn = useReduxSelector(state => state.currentUser.isLoggedIn);
    
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                {isLoggedIn ?
                    (<>
                        <Stack.Screen name={ROOT_STACK_SCREENS.DASHBOARD_STACK} component={DrawerNav} />
                    </>) :
                    (<>
                        <Stack.Screen name={ROOT_STACK_SCREENS.LOGIN} component={LoginScreen} />
                        <Stack.Screen name={ROOT_STACK_SCREENS.SIGNUP} component={SignUpScreen} />
                    </>)}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
