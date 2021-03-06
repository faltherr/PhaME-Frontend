import {combineReducers} from 'redux'
import reducer from './reducer'
//import the redux form, grab the reducer property and set its name to form reducer
import {reducer as formReducer } from 'redux-form'
import inputFormReducer from './inputFormReducer'

const rootReducer = combineReducers({
    reducer: reducer,
    form: formReducer,
    inputFormReducer
})

export default rootReducer