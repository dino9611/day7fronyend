import {
    AUTH_LOADING,
    AUTH_SYSTEM_ERROR,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT
} from './../actions/types'

const INITIAL_STATE={
    username:'',
    email:'',
    status:'',
    error:'',
    token:'',
    authchecked:false,
    loading:false
}
export default(state=INITIAL_STATE,action)=>{
    switch (action.type){
        case USER_LOGIN_SUCCESS :
            return {...INITIAL_STATE,...action.payload,authchecked:true}
        case AUTH_SYSTEM_ERROR :
            return{...INITIAL_STATE,...action.payload,authchecked:true}
        case AUTH_LOADING:
            return {...state,error:'',loading:true}
        case USER_LOGOUT:
            return {...INITIAL_STATE,authchecked:true}
        default:
            return state  
    }    
}