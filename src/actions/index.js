import {AUTH_SW,AUTH_SUCCESS,AUTH_FAILURE,SEARCH_TEXT,SEARCH_SUCCESS,SEARCH_FAILURE,AUTH_LOGOUT,RESET_COUNT,UPDATE_COUNT} from './ActionTypes';

export const authAction=(credentials)=>{
    return{
        type:AUTH_SW,
        payload: credentials
    }
}

export const logoutAction=()=>{
    return{
        type:AUTH_LOGOUT
    }
}
export const searchAction=(text)=>{
    return{
        type:SEARCH_TEXT,
        payload: text
    }
}

export const authSuccessAction=(recievedUser)=>{
    return{
        type:AUTH_SUCCESS,
        payload:recievedUser
    }
}
export const authFailureAction=(errorMsg)=>{
    return{
        type:AUTH_FAILURE,
        payload:errorMsg
    }
}

export const resetCounter=()=>{
    return{
        type:RESET_COUNT
    }
}
