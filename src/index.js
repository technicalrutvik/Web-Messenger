import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';
import {Provider} from 'react-redux';
import store from './store'
const firebaseConfig = {
  apiKey: "AIzaSyB-B73vAfBxG8W8mgGAz_c8GXhg9d2h7No",
  authDomain: "messenger-d71ba.firebaseapp.com",
  databaseURL: "https://messenger-d71ba.firebaseio.com",
  projectId: "messenger-d71ba",
  storageBucket: "messenger-d71ba.appspot.com",
  messagingSenderId: "60812138545",
  appId: "1:60812138545:web:dea0e865f52d84218c5d10",
  measurementId: "G-HZCHK3SQEJ"
};


firebase.initializeApp(firebaseConfig);
window.store=store;

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
