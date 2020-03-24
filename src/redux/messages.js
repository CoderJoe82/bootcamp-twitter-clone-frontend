import {
    domain,
    handleJsonResponse,
    getInitStateFromStorage,
    asyncInitialState,
    asyncCases,
    createActions,
    createReducer
  } from "./helpers";
  const url = domain
  const MESSAGEFEED = createActions("messagefeed");
  export const messagefeed =()=> dispatch =>{
      dispatch(MESSAGEFEED.START());

      return fetch(url+"/messages?limit=25&offset=0")
  
      .then(handleJsonResponse)
      .then(result => {
        result = Object.keys(result.messages).map(key => result.messages[key]) 
        dispatch({
          type: MESSAGEFEED.SUCCESS,
        payload: result})})
      .catch(err => Promise.reject(dispatch(MESSAGEFEED.FAIL(err))))
  };
  
  export const messageFeedReducers = {
      messagefeed: createReducer(getInitStateFromStorage("messagefeed", asyncInitialState), {
        ...asyncCases(MESSAGEFEED), 
        //[MESSAGEFEED.SUCCESS.toString()]: (state, action)=>asyncInitialState 
      })
  };
