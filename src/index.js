import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider, useSelector } from "react-redux";
import thunk from "redux-thunk";
import firebase from "firebase/app";
import {
  ReactReduxFirebaseProvider,
  reactReduxFirebase,
  getFirebase,
  isLoaded,
} from "react-redux-firebase";
import { createFirestoreInstance, reduxFirestore } from "redux-firestore";
import { getFirestore } from "redux-firestore";
import fbConfig from "./config/fbConfig";

import './i18n';

const initialState = {};

// developer tool for seeing Redux state using browser developer console (F12, then redux tab)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
    // reduxFirestore(fbConfig),
    // reactReduxFirebase(fbConfig)
    // reactReduxFirebase({useFirestoreForProfile: true})
  )
);

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  // Firestore for Profile instead of Realtime DB
};

const fbProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
  RealtimeDB: fbConfig,
  // <- needed if using firestore
};

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) {
    return <div></div>;
  }
  return children;
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...fbProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
