import axios from "axios"
const URL = process.env.REACT_APP_API_URL+'/api/users/'

const signin = async (userData)=>{
    const res = await axios.post(URL+'signin', userData)
    if(res){
        localStorage.setItem('user', JSON.stringify(res.data))
    }
    return res.data
}

const signup = async (userData)=>{
    const res = await axios.post(URL+'register', userData)
    if(res){
        localStorage.setItem('user', JSON.stringify(res.data))
    }
    return res.data
}

const updateUserProfile = async (data, token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.put(URL + `/profile`, data, config)
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

export const authService = {signin, signout, updateUserProfile, signup}