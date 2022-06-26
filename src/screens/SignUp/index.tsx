import React, { FC, useState } from "react";
import { ScrollView, Text, Image, View, TouchableOpacity } from "react-native";
import { style } from "./styles";
import Strings from "../../assets/Strings";
import Images from "../../assets/Images";
import TextInputView from "../../components/TextInputView";
import ProgressButton from "../../components/ProgressButton";
import { emailValidator, nameValidator, passWordValidator, checkPassword } from "../../utils/validators";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../core/navigation/navParams";
import { useNavigation } from "@react-navigation/native";
import { saveUser } from "../../core/services/loginService";
import { getUsersFromStore, UserDetails } from "../../core/services/storage";
import { ROOT_STACK_SCREENS } from "../../core/navigation/screens";
import { useReduxDispatch } from "../../core/redux/store";
import { setUsers } from "../../core/redux/entities/users";
import { logIn } from "../../core/redux/entities/currentUser";

type signUpNavProps = StackNavigationProp<RootStackParamList, ROOT_STACK_SCREENS.SIGNUP>;

const SignUpScreen: FC = () => {

    const navigation = useNavigation<signUpNavProps>();

    const dispatch = useReduxDispatch();

    const [userName, setUserName] = useState({ value: '', error: '' });
    const [name, setName] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' });
    const [isLoading, setIsLoading] = useState(false);

    const validateUserName = (email: string) => {
        setUserName({ value: email, error: emailValidator(email) });
    }

    const validatePassword = (password: string) => {
        setPassword({ value: password, error: passWordValidator(password) });
    }

    const validateName = (name: string) => {
        setName({ value: name, error: nameValidator(name) });
    }

    const validateConfirmPassword = (confirmPassword: string) => {
        !password.value && setPassword({ ...password, error: Strings.emptyPassword });
        setConfirmPassword({ value: confirmPassword, error: checkPassword(password.value, confirmPassword) });
    }

    const onSignUp = () => {
        !name.value && setName({ ...name, error: Strings.emptyPassword });
        !userName.value && setUserName({ ...userName, error: Strings.emptyEmail });
        !password.value && setPassword({ ...password, error: Strings.emptyPassword });
        !confirmPassword.value && setConfirmPassword({ ...confirmPassword, error: Strings.confirmPasswordError });

        checkAllEntries() && onLogIn();

    }

    const onLogIn = async () => {
        const user: UserDetails = {
            name: name.value,
            userName: userName.value,
            password: password.value
        }
        await saveUser(user);
        const users = await getUsersFromStore();
        dispatch(setUsers(users));
        const currentUser = { name: name.value, userName: userName.value };
        dispatch(logIn(currentUser));
        // navigation.reset({
        //     index: 0,
        //     routes: [{ name: ROOT_STACK_SCREENS.DASHBOARD_STACK, params: {name: name.value, userName: userName.value} }]
        // });
    }

    const checkAllEntries = (): Boolean => {
        return !(name.error || userName.error || password.error || confirmPassword.error)
            && !!name.value && !!userName.value && !!password.value && !!confirmPassword.value
    }

    const navigateToLogin = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: ROOT_STACK_SCREENS.LOGIN }]
        });
    }

    return (
        <ScrollView contentContainerStyle={style.container}
            keyboardShouldPersistTaps='always'>
            <View style={style.logoView}>
                <Image source={Images.reactNativeLogo} style={style.image} resizeMode='contain' />
                <Text style={style.header}>
                    {Strings.createAccount}
                </Text>
            </View>

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
                    stringValidator={validateUserName}
                    autoCapitalize='none'
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    returnKeyType='next'
                />

                <TextInputView
                    title={Strings.password}
                    placeholder={Strings.password}
                    value={password.value}
                    errorMessage={password.error}
                    style={[style.textInputStyle]}
                    maxLength={20}
                    stringValidator={validatePassword}
                    secureTextEntry={true}
                    returnKeyType='next'
                />
                <TextInputView
                    title={Strings.confirmPassword}
                    placeholder={Strings.confirmPassword}
                    value={confirmPassword.value}
                    errorMessage={confirmPassword.error}
                    stringValidator={validateConfirmPassword}
                    style={[style.textInputStyle]}
                    maxLength={20}
                    secureTextEntry={true}
                    returnKeyType='done'
                />
                <ProgressButton
                    isLoading={isLoading}
                    onClick={onSignUp}
                    title={Strings.signUp}
                />
                <View style={style.row}>
                    <Text>{Strings.alreadySignedUp} </Text>
                    <TouchableOpacity
                        onPress={navigateToLogin}>
                        <Text style={style.link}>{Strings.login}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default SignUpScreen;