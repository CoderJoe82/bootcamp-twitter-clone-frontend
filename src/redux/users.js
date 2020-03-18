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
export const getuser = username => dispatch => {
    dispatch(GETUSER.START());
    return fetch (url + `/${username}`)
    .then(handleJsonResponse)
    .then (result => dispatch(GETUSER.SUCCESS(result)))
    .catch (err => Promise.reject(dispatch(GETUSER.FAIL(err))));
};

const UPDATEUSER = createActions("updateuser");
export const updateuser = (username, userData) => (dispatch, getState) => {
    dispatch(UPDATEUSER.START());
    const token = getState().auth.login.result.token
    return fetch (url + `/${username}`, {
        method: "PATCH", 
        headers: {Authorization: "Bearer-" + token, ...jsonHeaders},
        body: JSON.stringify(userData)

    })
    .then(handleJsonResponse)
    .then (result =>{
        dispatch(UPDATEUSER.SUCCESS(result))
        dispatch(login({username:username, password:userData.passowrd}))
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
