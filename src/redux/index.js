import { createBrowserHistory } from "history";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducers as authReducers } from "./auth";
import { reducers as usersReducers } from "./users"
import { registrationReducer } from "./registration/registration";
import { messageFeedReducers} from "./messages"
import { likeReducers } from "./likes"
import { googleReducer } from "./googlelogcheck"
import { deleteMessageReducers } from "./deleteMessage"
import { changeProfilePictureReducer } from "./newProfilePhoto"
import { deleteUserReducer } from "./deleteuser"


export * from "./auth";
export * from "./users";
export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});

export const store = configureStore({
  reducer: {
    router: connectRouter(history),
    auth: combineReducers(authReducers),
    registration: combineReducers(registrationReducer),
    users: combineReducers(usersReducers),
    messagefeed: combineReducers(messageFeedReducers),
    likes: combineReducers(likeReducers),
    googlecheck: combineReducers(googleReducer),
    deletemessage: combineReducers(deleteMessageReducers),
    editphoto: combineReducers(changeProfilePictureReducer),
    deleteauser: combineReducers(deleteUserReducer)
  },
  preloadedState: {},
  devTools: process.env.NODE_ENV !== "production"
});

store.subscribe(() => {
  localStorage.setItem("login", JSON.stringify(store.getState().auth.login));
});
