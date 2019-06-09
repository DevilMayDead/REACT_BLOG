// import { createStore, compose, applyMiddleware } from "redux";
// import reducer from "./reducer";
// import { Login } from "./sagas";
// import createSagaMiddleware from "redux-saga";

// const sagaMiddleware = createSagaMiddleware();

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const middlewares = [Login];
// const store = createStore(
//   reducer /* preloadedState, */,
//   composeEnhancers(applyMiddleware(sagaMiddleware))
// );
// sagaMiddleware.run(Login);
// export default store;

import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import reducer from "./reducer";
const logger = createLogger();
export default function configureStore(initialState) {
  // 注意：必须满足 redux@>=3.1.0 才可以将 middleware 作为 createStore 的最后一个参数传递
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return {
    ...createStore(
      reducer,
      initialState,
      composeEnhancers(applyMiddleware(logger, sagaMiddleware))
    ),
    runSaga: sagaMiddleware.run
  };
}
