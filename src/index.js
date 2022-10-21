import React from "react";
import ReactDOM from "react-dom";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { errorMiddleware, userMiddleware } from "./middlewares";
import appSaga from "./sagas";
import rootReducer from "./reducers";
import reportWebVitals from "./reportWebVitals";
import "./serviceWorker";
import "./index.css";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(userMiddleware),
    applyMiddleware(errorMiddleware),
    // window.__REDUX_DEVTOOLS_EXTENSION__?.()
  )
);

sagaMiddleware.run(appSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
