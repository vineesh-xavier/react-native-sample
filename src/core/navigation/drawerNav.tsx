import React from "react"
import { Image, StyleSheet, Text, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from "../../screens/Home";
import { RootDrawerParamList, RootStackRouteProps, DashBoardStackParamList, RootDrawerProps } from "./navParams";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerContentComponentProps } from "@react-navigation/drawer";
import Colors from "../../assets/Colors";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import Images from "../../assets/Images";
import Strings from "../../assets/Strings";
import UserDetailsScreen from "../../screens/UserDetails";
import { DASHBOARD_SCREENS, DRAWER_STACK_SCREENS, ROOT_STACK_SCREENS } from "./screens";
import { useReduxDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/entities/currentUser";

const Stack = createStackNavigator<DashBoardStackParamList>();

const Drawer = createDrawerNavigator<RootDrawerParamList>();

function DashBoardNav() {
    const route = useRoute<RootDrawerProps<DRAWER_STACK_SCREENS.DASHBOARD>>();

    return (
        <Stack.Navigator
            initialRouteName={DASHBOARD_SCREENS.HOME}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name={DASHBOARD_SCREENS.HOME} component={HomeScreen} initialParams={route.params} />
            <Stack.Screen name={DASHBOARD_SCREENS.USER_DETAILS} component={UserDetailsScreen} initialParams={route.params} />

        </Stack.Navigator>
    );
}

function DrawerNav() {
    const route = useRoute<RootStackRouteProps<ROOT_STACK_SCREENS.DASHBOARD_STACK>>();
    const dispatch = useReduxDispatch();

    const CustomDrawer = (props: DrawerContentComponentProps) => {
        return (
            <DrawerContentScrollView {...props}>
                <CustomDrawerHeader />
                <DrawerItemList {...props} />
                <DrawerItem label={Strings.logOut}
                    onPress={() => {
                        onLogOut(props.navigation)
                    }} />
            </DrawerContentScrollView>)
    }

    const CustomDrawerHeader = () => {
        return (
            <View style={style.drawerHeader}>
                <View style={style.drawerHeaderInfo}>
                    <Text style={style.drawerHeaderText}>
                        {route.params?.name}
                    </Text>
                    <Text style={style.drawerHeaderText}>
                        {route.params?.userName}
                    </Text>
                </View>
                <Image source={Images.reactNativeLogo} style={style.image} />
            </View>)
    }

    const onLogOut = (navigation: DrawerNavigationHelpers) => {
        // navigation.reset({ index: 0, routes: [{ name: ROOT_STACK_SCREENS.LOGIN }] })
        console.log('onLogOut');
        dispatch(logOut());
    }

    return (
        <Drawer.Navigator
            initialRouteName={DRAWER_STACK_SCREENS.DASHBOARD}
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary },
                headerTintColor: Colors.white,
            }}
            drawerContent={(props) => {
                return <CustomDrawer {...props} />
            }}>
            <Drawer.Screen name={DRAWER_STACK_SCREENS.DASHBOARD} component={DashBoardNav} initialParams={route.params} />
        </Drawer.Navigator>)
}

export default DrawerNav;

const style = StyleSheet.create({
    drawerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.gray,
        borderRadius: 5
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    drawerHeaderText: {

    },
    drawerHeaderInfo: {

    }
})