import * as actionTypes from './user-types';
// import { toast } from 'react-toastify';

export const loginUser = (user) => {
    return (dispatch) => {
        try{
           dispatch({type:actionTypes.LOGIN_SUCCESS, payload:user}) 
        } catch(error){
            console.error(error);
            // dispatch({type:actionTypes.LOGIN_FAIL,payload:{}})
        }
    }
}

export const logOutUser = () => {
    return (dispatch) => {
        try{
           dispatch({type:actionTypes.LOGOUT, payload:{}}) 
        } catch(error){
            console.error(error);
            // dispatch({type:actionTypes.LOGIN_FAIL,payload:{}})
        }
    }
}
