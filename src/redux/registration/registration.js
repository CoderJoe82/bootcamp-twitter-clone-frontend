import {
    domain,
    jsonHeaders,
    handleJsonResponse,
    getInitStateFromStorage,
    asyncInitialState,
    asyncCases,
    createActions,
    createReducer
  } from "../helpers";
  import { login } from "../auth"
  
  const url = domain;
  
  const REGISTER = createActions("register");
  export const register = loginData => dispatch => {
    dispatch(REGISTER.START());
    const getUserInfo = {
      username: loginData.username,
      password: loginData.password
    }
  
    return fetch(url + "/users", {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify(loginData)
    })
      .then(handleJsonResponse)
      .then(result => {
        console.log(result)
        dispatch(login(getUserInfo))
        dispatch(REGISTER.SUCCESS(result))})
      .catch(err => Promise.reject(dispatch(REGISTER.FAIL(err))));
  };
  
  
  
  export const registrationReducer = {
    register: createReducer(getInitStateFromStorage("register", asyncInitialState), {
      ...asyncCases(REGISTER)
    })
  };