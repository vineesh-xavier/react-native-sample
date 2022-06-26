import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import currentUser, { persistConfigOfCurrentUser } from "../entities/currentUser";
import users, { persistConfigOfUsers } from "../entities/users";

const rootReducer = combineReducers({
    currentUser: persistReducer(persistConfigOfCurrentUser, currentUser),
    users: persistReducer(persistConfigOfUsers, users),
});

export default rootReducer;