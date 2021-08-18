import * as actionTypes from './user-types';
const initialState = {
    isLoggedIn:false,
}

 const getAuthState = () => {
        const auth = sessionStorage.getItem("auth")
        try{
            const authObj = JSON.parse(auth)
            const {access_token,refresh_token} = authObj.token
            return authObj 
        }catch(error){
            return initialState;
        }
    }

const newAuth = getAuthState()

const userReducer = (state=newAuth, action) => {
    switch(action.type){
        case actionTypes.LOGIN_SUCCESS : 
            const newState =  {
                isLoggedIn:true,
                token:action.payload,
            }
            localStorage.setItem("auth", JSON.stringify(newState))
                return newState; 
            
            case actionTypes.LOGOUT : 
                return initialState; 
        default:
            return state;
    }
}

export default userReducer;