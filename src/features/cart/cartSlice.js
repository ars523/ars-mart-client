import { createSlice } from "@reduxjs/toolkit";

const cartItems = JSON.parse(localStorage.getItem('carts'))
const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'))
const paymentMethod = localStorage.getItem('paymentMethod')

const initialState = {
    carts: cartItems? cartItems : [],
    shippingAddress: shippingAddress? shippingAddress : {},
    paymentMethod: paymentMethod? paymentMethod : ''
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action) => {
            const isExist = state.carts.find(cart => cart._id === action.payload._id)
            const quantity = isExist? isExist.quantity+1: 1
            const newItem = {...action.payload, quantity}
            if (isExist) {
                const carts = state.carts.map(c => c._id === newItem._id ? newItem : c)
                localStorage.setItem('carts', JSON.stringify(carts))
                state.carts = carts
            }else{
                const carts = [...state.carts, newItem]
                localStorage.setItem('carts', JSON.stringify(carts))
                state.carts = carts
            }
        },

        subtractCart: (state, action) =>{
            const carts = state.carts.map(cart=>cart._id ===action.payload? {...cart, quantity: cart.quantity-1}: cart)
            localStorage.setItem('carts', JSON.stringify(carts))
            state.carts = carts
        },

        deleteCart: (state, action) =>{
            const carts = state.carts.filter(cart=>cart._id!==action.payload)
            localStorage.setItem('carts', JSON.stringify(carts))
            state.carts = carts
        },
        saveShippingAddress: (state, action)=>{
            localStorage.setItem('shippingAddress', JSON.stringify(action.payload))
            state.shippingAddress = action.payload
        },
        savePaymentMethod: (state, action) =>{
            localStorage.setItem('paymentMethod', action.payload)
            state.paymentMethod = action.payload
        },
        resert: (state)=>{
            state.carts = []
            state.shippingAddress = {}
            state.paymentMethod = ''
        },
        resertCarts: (state)=>{
            state.carts = []
        }
    },
    extraReducers: (builder) => {

    }
})

export const { 
    addCart,
    subtractCart,
    deleteCart, 
    saveShippingAddress,
    savePaymentMethod, 
    resert,
    resertCarts
 } = cartSlice.actions
export default cartSlice.reducer