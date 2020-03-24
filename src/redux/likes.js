import { store } from "../redux/index";
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
// import { GetMessage } from "./GetMessages";
import { messagefeed } from "./messages"
const url = domain;
const HANDLELIKE = createActions("handLike");
export const handleLike = (e, messageID) => dispatch => {
  const state = store.getState();
  const token = state.auth.login.result.token;
  dispatch(HANDLELIKE.START());
  return fetch(url + "/likes", {
    method: "POST",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders },
    body: JSON.stringify({ messageId: messageID })
  })
    .then(handleJsonResponse)
    .then(result => {
      if (result.statusCode === 200) {
        dispatch(messagefeed());
      } else if (result.statusCode === 400) {
        dispatch(handleUnlike(messageID));
      }
      dispatch(HANDLELIKE.SUCCESS(result));
    })
    .catch(err => {
      if (err.statusCode === 400) {
        dispatch(handleUnlike(messageID));
      }
      Promise.reject(dispatch(HANDLELIKE.FAIL(err)));
    });
};
const HANDLEUNLIKE = createActions("handleUnlike");
export const handleUnlike = messageID => dispatch => {
  const state = store.getState();
  const username = state.auth.login.result.username;
  const token = state.auth.login.result.token;
  dispatch(HANDLEUNLIKE.START());
  return fetch(url + "/messages/" + messageID, {
    method: "GET"
  })
    .then(handleJsonResponse)
    .then(result => {
      result.message.likes.map(each => {
        if (each.username === username) {
          const likeID = each.id;
          fetch(url + "/likes/" + likeID, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + token, ...jsonHeaders }
          })
            .then(handleJsonResponse)
            .then(result => {
              dispatch(messagefeed());
              dispatch(HANDLEUNLIKE.SUCCESS(result));
            });
        }
        return each.id;
      });
    });
};
export const likeReducers = {
  like: createReducer(
    getInitStateFromStorage("handleLike", asyncInitialState),
    {
      ...asyncCases(HANDLELIKE)
    }
  ),
  unlike: createReducer(asyncInitialState, {
    ...asyncCases(HANDLEUNLIKE)
  })
};
