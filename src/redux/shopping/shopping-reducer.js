
import { BASE_URL } from '../../config/ApiUrl';
import * as actionTypes from './shopping-types';

let data =[]

async function getRadomeData(){
    const response = await fetch(BASE_URL+"widget/")
    const data = await response.json()

    addData(data.flat())
}

function addData(object){
    // data.push(object)
    object.map(item => {
        data.push(item)
    })
}
getRadomeData()


const initialState = {
    products:[data], //{id, title, descr, price, img}
    cart:[], //{id, title, descr, price, img}
}
const shopReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_TO_CART : 
            // Get the items data from an array
            const item = state.products[0].find(prop => prop.id == action.payload.id)
            // // check if item is in cart already
            const inCart = state.cart.find(item => item.id === action.payload.id ? true : false)
            return {
                ...state,
                cart:inCart ? state.cart.map(item => item.id ===  action.payload.id ? {...item, qty: item.qty} : item ): [...state.cart, {...item, qty:1}]
            }
        case actionTypes.REMOVE_FROM_CART :
            return {
                ...state,
                cart:state.cart.filter(item => item.id !== action.payload.id)
            }

        default:
            return state;
    }
}

export default shopReducer; 