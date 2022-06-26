import React, { FC, useState } from "react";
import { ScrollView, Text, Image, View, TouchableOpacity } from "react-native";
import { style } from "./styles";
import Strings from "../../assets/Strings";
import TextInputView from "../../components/TextInputView";
import ProgressButton from "../../components/ProgressButton";
import { nameValidator, passWordValidator, checkPassword } from "../../utils/validators";
import { StackNavigationProp } from "@react-navigation/stack";
import { DashBoardStackParamList, RootDrawerProps, RootStackParamList } from "../../core/navigation/navParams";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DASHBOARD_SCREENS, DRAWER_STACK_SCREENS } from "../../core/navigation/screens";

type signUpNavProps = StackNavigationProp<DashBoardStackParamList, DASHBOARD_SCREENS.USER_DETAILS>;

const UserDetailsScreen: FC = () => {

    const navigation = useNavigation<signUpNavProps>();
    const route = useRoute<RootDrawerProps<DRAWER_STACK_SCREENS.DASHBOARD>>();

    const [userName, setUserName] = useState({ value: route.params?.userName, error: '' });
    const [name, setName] = useState({ value: route.params?.name, error: '' });

    const validateName = (name: string) => {
        setName({ value: name, error: nameValidator(name) });
    }

    const updateUser = () => {
        !name.value && setName({ ...name, error: Strings.emptyPassword });
        checkAllEntries();
    }

    const checkAllEntries = (): Boolean => {
        return !(userName.error)
            && !!userName.value 
    }

    return (
        <ScrollView contentContainerStyle={style.container}
            keyboardShouldPersistTaps='always'>

            <View style={style.textEntryView}>
                <TextInputView
                    title={Strings.name}
                    placeholder={Strings.name}
                    value={name.value}
                    errorMessage={name.error}
                    stringValidator={validateName}
                    style={[style.textInputStyle]}
                    maxLength={30}
                    autoCapitalize='words'
                    returnKeyType='next'
                />
                <TextInputView
                    title={Strings.email}
                    placeholder={Strings.email}
                    value={userName.value}
                    errorMessage={userName.error}
                    style={[style.textInputStyle]}
                    maxLength={30}
                    editable={false}
                    autoCapitalize='none'
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    returnKeyType='next'
                />
                
                <ProgressButton
                    onClick={updateUser}
                    title={Strings.update}
                />
            </View>
        </ScrollView>
    )
}

export default UserDetailsScreen;