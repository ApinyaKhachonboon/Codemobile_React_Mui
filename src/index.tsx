import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

import { createStore, applyMiddleware, Middleware } from "redux";
import thunk from "redux-thunk";
import { Provider, useDispatch } from "react-redux";
/// จะเรียก index.ts โดยอัตโนมัติ
import reducers from "./reducers";
import logger from "redux-logger";

//// แก้ปัญหา parameter of type 'AnyAction'
import type { } from 'redux-thunk/extend-redux';

let middlewares: Middleware[] = [thunk];

// reference
// https://redux.js.org/usage/usage-with-typescript
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

//// ให้ logger อยู่หลังสุดเสมอ ไม่งั้นจะ print มาเพี้ยน
if (true || process.env.REACT_APP_IS_PRODUCTION !== "1") {
  middlewares.push(logger);
}

export const history = createBrowserHistory();
export const store = createStore(reducers, applyMiddleware(...middlewares));


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>

  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
