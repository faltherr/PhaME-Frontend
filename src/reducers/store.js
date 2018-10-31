// import {createStore, applyMiddleware, compose} from 'redux'
// import promiseMiddleware from 'redux-promise-middleware'
import {createStore, compose} from 'redux'

import rootReducer from './index'

const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
)

export default createStore(rootReducer, enhancers)