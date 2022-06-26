import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { UserDetails } from "../../services/storage";

const emptyUsers: UserDetails[] = Array();
const initialState = { users: emptyUsers }

const usersReducerSlice = createSlice({
    name: 'Users',
    initialState: initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        updateUser: (state, action) => {
            state.users.map((user) => {
                if (user.userName === action.payload.userName
                    && user.name === action.payload.name) {
                    user.name = action.payload.newName
                }
            })
        }
    }
})

export const persistConfigOfUsers = {
    key: 'Users',
    storage: AsyncStorage,
    whitelist: ['users']
};

export const { setUsers, updateUser } = usersReducerSlice.actions;
export default usersReducerSlice.reducer

