import { UserDetails, getUsersFromStore, saveUserToStore } from "./storage";

export const validateUser = async (user: UserDetails) => {
    const users = await getUsersFromStore();
    const userFound = users.find((u) => {
        return (user.userName === u.userName) && (user.password === u.password)
    });
    return userFound;
}

export const saveUser =async (user:UserDetails) => {
    await saveUserToStore(user);    
}