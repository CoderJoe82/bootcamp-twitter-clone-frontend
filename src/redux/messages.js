import {
    domain,
    handleJsonResponse,
    getInitStateFromStorage,
    asyncInitialState,
    asyncCases,
    createActions,
    createReducer,
    jsonHeaders
  } from "./helpers";
  const url = domain
  const MESSAGEFEED = createActions("messagefeed");
  export const messagefeed =()=> dispatch =>{
      dispatch(MESSAGEFEED.START());

      return fetch(url+"/messages?limit=50&offset=0")
  
      .then(handleJsonResponse)
      .then(result => {
        result = Object.keys(result.messages).map(key => result.messages[key]) 
        dispatch({
          type: MESSAGEFEED.SUCCESS,
        payload: result})})
      .catch(err => Promise.reject(dispatch(MESSAGEFEED.FAIL(err))))
  };
  const NEWMESSAGES = createActions ("newmessages");
  export const newmessages = messageData =>(dispatch, getState) => {
    dispatch(NEWMESSAGES.START());
    const token= getState().auth.login.result.token;
    //const username= getState().auth.login.result.username;
    return fetch(url + "/messages", {
      method: "POST",
      headers: {Authorization: "Bearer " +token, ...jsonHeaders},
      body: JSON.stringify(messageData)
    })
    .then(handleJsonResponse)
    .then(result=>{
      dispatch(NEWMESSAGES.SUCCESS(result));
      dispatch(messagefeed())
    })
    .catch(err=>Promise.reject(dispatch(NEWMESSAGES.FAIL(err.toString()))));
  };
  export const messageFeedReducers = {
      messagefeed: createReducer(getInitStateFromStorage("messagefeed", asyncInitialState), {
        ...asyncCases(MESSAGEFEED), 
        //[MESSAGEFEED.SUCCESS.toString()]: (state, action)=>asyncInitialState
        newmessages: createReducer(getInitStateFromStorage("newmessages", asyncInitialState), {
          ...asyncCases(NEWMESSAGES),
          //[MESSAGEFEED.SUCCESS.toString()]: (state, action)=>asyncInitialState
        })
      })
  };
