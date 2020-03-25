import {
    domain,
    getInitStateFromStorage,
    asyncInitialState,
    asyncCases,
    createActions,
    createReducer
  } from "./helpers";
  import {getuser} from "./users"
  import axios from 'axios'
    const url=domain
    const NEWPROFILEPHOTO = createActions("newProfilePhoto");
    export const newProfilePhoto = (e, picture) => (dispatch, getState) => {
        dispatch(NEWPROFILEPHOTO.START())
        console.log(picture)
        const token=getState().auth.login.result.token
        const username=getState().auth.login.result.username
        const headers = { Authorization: "Bearer "+ token}
      return axios.put(url + "/users/"+ username + "/picture", picture, {headers:headers})
          .then(result=> dispatch(getuser(username)), dispatch(NEWPROFILEPHOTO.SUCCESS()))
          .catch(err => {
            return Promise.reject(dispatch({ type:
            NEWPROFILEPHOTO.FAIL, payload: err}))
        })
    }
    export const changeProfilePictureReducer = {
      editUserPhoto: createReducer(getInitStateFromStorage("newProfilePhoto", asyncInitialState), {
        ...asyncCases(NEWPROFILEPHOTO),
      })
    };