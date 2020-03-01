import {combineReducers} from 'redux';
import authReducer from './authReducer';
import searchReducer from './searchReducer';


const allReducers=combineReducers({
     authReducer,
     searchReducer,
})

export default allReducers;