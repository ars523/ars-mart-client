import axios from "axios"
const URL = '/api/users/'


const signin = async (userData)=>{
    const res = await axios.post(URL+'signin', userData)
    if(res){
        localStorage.setItem('user', JSON.stringify(res.data))
    }
    return res.data
}

const signout =  ()=>{
    localStorage.removeItem('user')
    localStorage.removeItem('carts')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
}
export const authService = {signin, signout}