import axios from 'axios'
const URL = '/api/products'
const getProducts = async ()=>{
    const res = await axios.get(URL)
    return res.data
}
const getProduct = async (slug)=>{
    const res = await axios.get(`${URL}/${slug}`)
    return res.data
}

export const productService = {
    getProducts,
    getProduct
}