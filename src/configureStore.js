import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from './reducer.js';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      sagaMiddleware,
      loggerMiddleware
    )
  );
  sagaMiddleware.run(rootSaga);
  return store; 
}
