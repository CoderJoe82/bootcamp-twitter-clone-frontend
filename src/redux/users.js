import {
    domain,
    jsonHeaders,
    handleJsonResponse,
    getInitStateFromStorage,
    asyncInitialState,
    asyncCases,
    createActions,
    createReducer
  } from "./helpers";
  import {login} from "./auth"

const url = domain + "/users";

const SIGNUP =  createActions("signup");
const _signup = signupData => dispatch => {
    dispatch(SIGNUP.START());
console.log(JSON.stringify(signupData))
    return fetch(url, {
        method:"POST",
        headers: jsonHeaders,
        body: JSON.stringify(signupData)
    })
    .then(handleJsonResponse)
    .then(result => dispatch(SIGNUP.SUCCESS(result)))
    .catch(err => Promise.reject(dispatch(SIGNUP.FAIL(err))));
};

export const signup = signupData => dispatch => {
    dispatch(_signup(signupData)).then(()=>{dispatch(login({username:signupData.username, password:signupData.password}))})
}
const GETUSER = createActions("getuser");
export const getuser = username => (dispatch, getState )=> {
    dispatch(GETUSER.START());
    console.log("insideAction username = " + username)
    if(username==="" || username === null){
        username = getState().auth.login.result.username
    }
    return fetch (url + `/${username}`)
    .then(handleJsonResponse)
    .then (result => {
        dispatch(GETUSER.SUCCESS(result))
        console.log(result)
    })
    .catch (err => Promise.reject(dispatch(GETUSER.FAIL(err))));
};

const UPDATEUSER = createActions("updateuser");
export const updateuser = userData => (dispatch, getState) => {
    dispatch(UPDATEUSER.START());
    const token = getState().auth.login.result.token
    const username = getState().auth.login.result.username 
    return fetch (url + `/${username}`, {
        method: "PATCH", 
        headers: {Authorization: "Bearer " + token, ...jsonHeaders},
        body: JSON.stringify(userData)

    })
    .then(handleJsonResponse)
    .then (result =>{
        dispatch(UPDATEUSER.SUCCESS(result))
        dispatch(getuser(username))
    })
    .catch (err => Promise.reject (dispatch(UPDATEUSER.FAIL(err))));
};
export const reducers = {
    signup: createReducer(getInitStateFromStorage("signup", asyncInitialState), {
        ...asyncCases(SIGNUP),
        [SIGNUP.SUCCESS.toString()]: (state, action) => asyncInitialState
    }),
    getuser: createReducer(getInitStateFromStorage("getuser",asyncInitialState),{
       ...asyncCases(GETUSER),
       
    }),
    updateuser: createReducer(getInitStateFromStorage("updateuser",asyncInitialState),{
        ...asyncCases(UPDATEUSER),
    })
};
