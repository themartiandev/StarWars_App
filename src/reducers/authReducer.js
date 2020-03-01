import {AUTH_SW,AUTH_SUCCESS,AUTH_FAILURE,AUTH_LOGOUT} from '../actions/ActionTypes'

const initialState = {
    loggedIn: false,
    error:'',
    user:{},
    loading:false
  }

const authReducers=(state = initialState, action)=>{
    switch (action.type) {
        case AUTH_SW:
          return{
            ...state,
            loading:true
          }
        case AUTH_SUCCESS:
          return{...state,
            loggedIn:true,
            error:'',
            user:action.payload,
            loading:false
          }
        case AUTH_FAILURE:
          return{...state,
            loggedIn:false,
            error:action.payload,
            user:{},
            loading:false
          }
        case AUTH_LOGOUT:{
          return{...state,
            loggedIn:false,
            error:'',
            user:{},
            loading:false
          }
        }
        default:
          return state
      }
}

export default authReducers;