import {combineReducers} from 'redux'
import Authreducer from './Authreducers'

export default combineReducers({
    auth:Authreducer
})