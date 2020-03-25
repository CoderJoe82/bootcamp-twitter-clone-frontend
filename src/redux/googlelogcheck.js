import {
    asyncInitialState,
    asyncCases,
    createActions,
    createReducer,
    getInitStateFromStorage
  } from "./helpers";
  const GOOGLE = createActions("google");
  export const google = (status) => (dispatch) => {
        //dispatch(GOOGLE.START());
       return dispatch(GOOGLE.SUCCESS(status))
  };
  export const googleReducer = {
   google: createReducer(getInitStateFromStorage("google", asyncInitialState), {
      ...asyncCases(GOOGLE)
    })
  };