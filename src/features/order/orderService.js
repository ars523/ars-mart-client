
import axios from "axios"
const URL = '/api/orders/'

const orderProduct = async (orderDetails, token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(URL, orderDetails, config)
    if(res){
        localStorage.removeItem('carts')
    }
    
    return res.data
}

const getOrderById = async (orderId, token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(URL+orderId, config)
    return res.data
}

export const orderService = {orderProduct, getOrderById}