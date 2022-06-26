import React, { FC, useState } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, } from "react-native";
import strings from "../../assets/Strings";
import TextInputView from "../../components/TextInputView";
import { style } from "./styles";
import Images from "../../assets/Images"
import ProgressButton from "../../components/ProgressButton";
import { emailValidator } from "../../utils/validators";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../core/navigation/navParams";
import { useNavigation } from "@react-navigation/native";
import { validateUser } from "../../core/services/loginService";
import { getUsersFromStore, UserDetails } from "../../core/services/storage";
import Strings from "../../assets/Strings";
import { ROOT_STACK_SCREENS } from "../../core/navigation/screens";
import Toast from 'react-native-toast-message';
import { useReduxDispatch } from "../../core/redux/store";
import { setUsers } from "../../core/redux/entities/users";
import { logIn } from "../../core/redux/entities/currentUser";

type loginNavProps = StackNavigationProp<RootStackParamList, ROOT_STACK_SCREENS.LOGIN>;

const LoginScreen: FC = () => {

    const navigation = useNavigation<loginNavProps>();
    const dispatch = useReduxDispatch();

    const [userName, setUserName] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [isLoading, setIsLoading] = useState(false);

    const validateUserName = (email: string) => {
        const error = emailValidator(email);
        setUserName({ value: email, error });
    }

    const validatePassword = (password: string) => {
        setPassword({ value: password, error: '' });
    }

    const onLogin = () => {
        !userName.value &&
            setUserName({ ...userName, error: strings.emptyEmail });
        !password.value &&
            setPassword({ ...password, error: strings.emptyPassword });

        checkAllEntries() && onLogIn()
    }

    const onLogIn = async () => {
        const user = await validateUser({ userName: userName.value, password: password.value })
        if (user) {
            const users = await getUsersFromStore();
            dispatch(setUsers(users));
            const currentUser = {name: user.name? user.name: '', userName: user.userName};
            dispatch(logIn(currentUser));
            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: ROOT_STACK_SCREENS.DASHBOARD_STACK, params: { name: user.name, userName: user.userName } }]
            // });
        } else {
            Toast.show({
                text1: Strings.userNotFound,
                type: 'info',
                position: 'top'
            });
            console.log('validateUser', 'fail');
        }

    }

    const checkAllEntries = (): Boolean => {
        return !(userName.error || password.error) && !!userName.value && !!password.value
    }

    const navigateToSignUp = () => {
        navigation.navigate(ROOT_STACK_SCREENS.SIGNUP);
    }
    return (
        <ScrollView
            contentContainerStyle={style.container}
            keyboardShouldPersistTaps='always'>
            <View style={style.logoView}>
                <Image source={Images.reactNativeLogo} style={style.image} resizeMode='contain' />
                <Text style={style.header}>
                    {strings.welcome}
                </Text>
            </View>

            <View style={style.textEntryView}>
                <TextInputView
                    title={strings.userName}
                    stringValidator={validateUserName}
                    placeholder={strings.userName}
                    value={userName.value}
                    errorMessage={userName.error}
                    maxLength={30}
                    autoCapitalize='none'
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    returnKeyType='next'
                />
                <TextInputView
                    title={strings.password}
                    stringValidator={validatePassword}
                    placeholder={strings.password}
                    value={password.value}
                    errorMessage={password.error}
                    maxLength={20}
                    secureTextEntry={true}
                    returnKeyType='done'
                />

                <ProgressButton
                    isLoading={isLoading}
                    onClick={onLogin}
                    title={strings.login}
                    style={style.loginButton}
                />
                <View style={style.row}>
                    <Text>{strings.dontHaveAccount} </Text>
                    <TouchableOpacity
                        disabled={false}
                        onPress={navigateToSignUp}>
                        <Text style={style.link}>{strings.signUp}</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView >
    )
}

export default LoginScreen;