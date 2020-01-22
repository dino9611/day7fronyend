import axios from 'axios';
import { 
    USER_LOGIN_SUCCESS, 
    AUTH_SYSTEM_ERROR, 
    AUTH_LOADING,
    USER_LOGOUT
} from './types';
import { APIURL } from './../../helper/apiurl';

export const onUserRegister = ({ username, email, password }) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOADING })
        if(username === '' || email === '' || password === '') {
            dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'Semua form diatas wajib diisi!' })
        }
        else {
            axios.post(APIURL+'auth/registerver', {
                username, email, password
            }).then((res) => {
                console.log(res)
                if(res.data.status === 'error') {
                    dispatch({ type: AUTH_SYSTEM_ERROR, payload: res.data.message })
                }
                else {
                    localStorage.setItem('username',username)
                    dispatch({ type : USER_LOGIN_SUCCESS, payload: res.data })
                }
            }).catch((err) => {
                console.log(err);
                dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System Error' })
            })        
        }
    }
}

// export const keepLogin=()=>{
//     return (dispatch)=>{
//         const token=localStorage.getItem('token')
//         console.log(token)
//         const headers={
//             headers:{
//                 'Authorization':`Bearer ${token}`
//             }
//         }
//         axios.post(`${APIURL}/user/keeplogin`,{},headers)
//         .then((res)=>{
//             localStorage.setItem('token',res.data.token)
//             dispatch({ type : USER_LOGIN_SUCCESS, payload: res.data })
//         }).catch((err)=>{
//             console.log(err.response.data)
//             localStorage.removeItem('token')
//             dispatch({
//                 type:USER_LOGOUT
//             })
//         })
//     }
// }
// export const onUserlogin = ({ username, password }) => {
//     return (dispatch) => {
//         dispatch({ type: AUTH_LOADING })
//         if(username === ''  || password === '') {
//             dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'Semua form diatas wajib diisi!' })
//         }
//         else {
//             axios.post(API_URL+'/user/login', {
//                 username, password
//             }).then((res) => {
//                 console.log(res)
//                 if(res.data.status!=='error'){
//                     console.log(res.data.token)
//                     localStorage.setItem('token',res.data.token)
                    
//                     dispatch({ type : USER_LOGIN_SUCCESS, payload: res.data })
//                 }else{
//                     dispatch({ type: AUTH_SYSTEM_ERROR, payload: res.data })
//                 }

//             }).catch((err) => {
//                 console.log(err);
//                 dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System Error' })
//             })        
//         }
//     }
// }
// export const onUserLogout=()=>{
//     localStorage.removeItem('token')
//     return{
//         type:USER_LOGOUT
//     }
// }