import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk"
import { notesReducer } from "./reducers/notesReducer";

const rootReducer = combineReducers({
  notesReducer: notesReducer
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

export type AppStateType =  ReturnType<typeof rootReducer>;