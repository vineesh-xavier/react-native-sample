import React, { FC, useEffect } from "react";
import { View, Text, FlatList, ListRenderItem } from "react-native";
import { style } from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootDrawerProps, DashBoardStackParamList } from "../../core/navigation/navParams";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DASHBOARD_SCREENS, DRAWER_STACK_SCREENS } from "../../core/navigation/screens";
import { useReduxSelector } from "../../core/redux/store";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserDetails } from "../../core/services/storage";

type homeStackNavProps = StackNavigationProp<DashBoardStackParamList, DASHBOARD_SCREENS.USER_DETAILS>;

const HomeScreen: FC = () => {

    const navigation = useNavigation<homeStackNavProps>();
    const route = useRoute<RootDrawerProps<DRAWER_STACK_SCREENS.DASHBOARD>>();
    const { users } = useReduxSelector(state => state.users);

    useEffect(() => {
        // console.log(users);
    })

    const renderItem: ListRenderItem<UserDetails> = ({ item }) => (
        <View>
            <TouchableOpacity
            style={style.userItemStyle}
             onPress={() => {
                const navProps = { name: item.name ? item.name : '', userName: item.userName };
                navigation.navigate(DASHBOARD_SCREENS.USER_DETAILS, navProps);
            }}>
                <Text>{item.name}</Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={style.container}>
            
            <FlatList
                style={style.flatList}
                data={users}
                renderItem={renderItem}
                keyExtractor={(user) => user.userName}
            />
        </View>
    )
}

export default HomeScreen;