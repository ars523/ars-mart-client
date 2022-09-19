import axios from 'axios'
const URL = '/api/products'

const getProductList = async (page, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(URL + `/admin?page=${page}`, config)
    return res.data
}

const getProducts = async () => {
    const res = await axios.get(URL)
    return res.data
}

const getProduct = async (slug) => {
    const res = await axios.get(`${URL}/${slug}`)
    return res.data
}

const getProductEdit = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${URL}/admin/${id}`, config)
    return res.data
}

const createProduct = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(URL, {}, config)
    return res.data
}

const updateProduct = async (updatedProductInfo, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.put(URL + `/admin/${updatedProductInfo._id}`, updatedProductInfo, config)
    return res.data
}

const deleteProduct = async (productId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.delete(URL + `/admin/${productId}`, config)
    return res.data
}


export const productService = {
    getProducts,
    getProduct,
    getProductList,
    createProduct,
    getProductEdit,
    updateProduct,
    deleteProduct,
}