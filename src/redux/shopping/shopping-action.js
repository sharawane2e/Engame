import * as actionTypes from './shopping-types'; 
import { BASE_URL } from '../../config/ApiUrl';
import axios from 'axios';
export const addToCart = (productId, name) => async(dispatch, getState) => {
    const {data} = await axios.get(BASE_URL+"widget/");
    dispatch({
        type:actionTypes.ADD_TO_CART,
        payload:{
            id:productId,
            name:name,
            image:data.imgUrl,
            price:data.price,
            desc:data.summary,
            currency:data.currency,
            product:data.id,
        }
    });
    localStorage.setItem('cart', JSON.stringify(getState().cart))
}

export const removeFromCart = (itemId) => {
    return {
        type:actionTypes.REMOVE_FROM_CART,
        payload : {
            id: itemId
        }
    }
}

export const adjustQty = (itemId, value) => {
    return {
        type: actionTypes.ADJUST_QTY,
        payload: {
            id:itemId,
            qty:value
        }
    }
}

export const loadCurrentItem = (item) =>{
    return {
        type: actionTypes.LOAD_CURRENT_ITEM,
        payload: item
    }
}