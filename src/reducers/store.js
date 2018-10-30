import {createStore, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'

import rootReducer from './index'

export default createStore(rootReducer, applyMiddleware(promiseMiddleware()))