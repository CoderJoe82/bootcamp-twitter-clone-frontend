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
  import { messagefeed } from "./messages"
  
  const url = domain
  
  const DELETEMESSAGE = createActions('deleteMessage')
  export const deleteMessage = (event, messageData) => (dispatch, getState) => {
      dispatch(DELETEMESSAGE.START())
    const token = getState().auth.login.result.token 
      
      return fetch(url + "/messages/" + messageData, {
          method: "DELETE", 
          headers: {Authorization: "Bearer " + token, ...jsonHeaders}
      })
        .then(handleJsonResponse)
        .then(result => {
           dispatch(messagefeed())
            dispatch(DELETEMESSAGE.SUCCESS(result))
               
            })
        .catch(err => Promise.reject(dispatch(DELETEMESSAGE.FAIL(err))));
  }
  
  
  export const deleteMessageReducers = {
     deleteMessage: createReducer(getInitStateFromStorage("deleteMessage", asyncInitialState),
       { ...asyncCases(DELETEMESSAGE) }), 
      
  }