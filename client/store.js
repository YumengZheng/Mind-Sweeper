import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducer.js';

export default createStore(
  rootReducer
);
