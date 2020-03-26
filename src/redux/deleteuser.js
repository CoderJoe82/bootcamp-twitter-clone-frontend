import {
    domain,
    jsonHeaders,
    handleJsonResponse,
    asyncInitialState,
    asyncCases,
    createActions,
    createReducer,
    getInitStateFromStorage
  } from "./helpers"
  import {logout} from "./auth"
const url = domain + "/users"
const DELETEUSER = createActions("deleteuser");
export const deleteuser = () => (dispatch, getState)=> {
    dispatch(DELETEUSER.START());
    const token = getState().auth.login.result.token
    const username = getState().auth.login.result.username
    // dispatch(logout())
    return dispatch(logout())
    .then(
    fetch (url + `/${username}`, {
        method: "DELETE",
        headers: {Authorization: "Bearer " + token, ...jsonHeaders},
    }))
    .then(handleJsonResponse)
    .then(result =>{
        dispatch (DELETEUSER.SUCCESS(result))
    })
    .catch (err => Promise.reject (dispatch(DELETEUSER.FAIL(err))))
};

export const deleteUserReducer = {
deleteuser: createReducer(getInitStateFromStorage("deleteuser",asyncInitialState),{
        ...asyncCases(DELETEUSER)
    }),
}