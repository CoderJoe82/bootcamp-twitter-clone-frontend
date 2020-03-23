import {
    domain,
    handleJsonResponse,
    getInitStateFromStorage,
    asyncInitialState,
    asyncCases,
    createActions,
    createReducer
  } from "../helpers";
  
  const url = domain;
  
  const USERINFO = createActions("userinfo");
  export const userinfo = () => (dispatch, getState) => {
    dispatch(USERINFO.START());
    const userName = getState().auth.login.result.userName
  
    return fetch(url + "/users/" + userName)
      
      .then(handleJsonResponse)
      .then(result => {
        console.log(result)
        dispatch(USERINFO.SUCCESS(result))})    
      .catch(err => Promise.reject(dispatch(USERINFO.FAIL(err))));
  };
  
  
  
  export const UserReducer = {
    userinfo: createReducer(getInitStateFromStorage("userinfo", asyncInitialState), {
      ...asyncCases(USERINFO)
    })
  };