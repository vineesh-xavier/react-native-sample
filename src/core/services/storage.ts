import AsyncStorage from "@react-native-async-storage/async-storage"
import { AppKeys } from "../../config/appKeys";

export type UserDetails = {
    name?: string,
    userName: string,
    password: string
}

export const saveUserToStore = async (user: UserDetails) => {
    try {
        const users = await getUsersFromStore();
        users.push(user);
        await AsyncStorage.setItem(AppKeys.userStore, JSON.stringify(users));
    } catch (error) {
        console.log('saveUserToStore', error);
    }
}

export const getUsersFromStore = async () => {
    let users: Array<UserDetails>;
    let usersJson: string | null;
    try {
        usersJson = await AsyncStorage.getItem(AppKeys.userStore);
    } catch (error) {
        console.log('getUserFromStore', error);
        usersJson = null;
    }
    users = usersJson ? JSON.parse(usersJson) : Array();

    return users;
}

export const saveLoggedUserToStore = async (user: UserDetails | null) => {
    try {
        await AsyncStorage.setItem(AppKeys.loggedUser, JSON.stringify(user));
    } catch (error) {
        console.log('saveLoggedUserToStore', error);
    }
}

export const getLoggedUserFromStore = async () => {
    let user: UserDetails;
    let usersJson: string | null;
    try {
        usersJson = await AsyncStorage.getItem(AppKeys.loggedUser);
    } catch (error) {
        console.log('getUserFromStore', error);
        usersJson = null;
    }
    user = usersJson ? JSON.parse(usersJson) : null;

    return user;
}

