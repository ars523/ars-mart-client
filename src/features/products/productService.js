import axios from 'axios'
const URL = process.env.REACT_APP_API_URL+'/api/products'

// ***Get product list by admin***
const getProductList = async (paginationData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(URL + `/admin?page=${paginationData?.page}&pageSize=${paginationData?.pageSize}`, config)
    return res.data
}

// ***Get product to be edit by admin***
const getProductEdit = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${URL}/admin/${id}`, config)
    return res.data
}

// ***Get products by visitors***
const getProducts = async () => {
    const res = await axios.get(URL)
    return res.data
}

// ***Get a single product by visitors***
const getProduct = async (slug) => {
    const res = await axios.get(`${URL}/${slug}`)
    return res.data
}

//***Create a product***
const createProduct = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(URL, {}, config)
    return res.data
}

//***Update a product***
const updateProduct = async (updatedProductInfo, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.put(URL + `/admin/${updatedProductInfo._id}`, updatedProductInfo, config)
    return res.data
}

//***Delete a product***
const deleteProduct = async (productId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.delete(URL + `/admin/${productId}`, config)
    return res.data
}

//***Upload Product image file ****/
const uploadProductImageFile = async (imgageData, token)=>{
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${token}`,
        }
    }
    const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, imgageData, config)
    return data
}


export const productService = {
    getProducts,
    getProduct,
    getProductList,
    createProduct,
    getProductEdit,
    updateProduct,
    deleteProduct,
    uploadProductImageFile,
}