import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { exp } from "react-native-reanimated";

const user = {
    name: '',
    userName: '',
};

const initialState = {
    isLoggedIn: false,
    currentUser: user
};

const currentUserReducerSlice = createSlice({
    name: 'CurrentUser',
    initialState: initialState,
    reducers: {
        logIn: (state, action) => {
            state.isLoggedIn = true,
                state.currentUser = action.payload
        },
        logOut: (state) => {
            console.log('logOut')
            state.isLoggedIn = false,
                state.currentUser = user
        }
    }
});

export const persistConfigOfCurrentUser = {
    key: 'CurrentUser',
    storage: AsyncStorage,
    whiteList: ['isLoggedIn', 'currentUser']
};

export const { logIn, logOut } = currentUserReducerSlice.actions;

export default currentUserReducerSlice.reducer;