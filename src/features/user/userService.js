import axios from "axios"
const URL = `/api/users`

export const getAllUsers = async (token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(URL, config)
    return res.data
}

export const getUser = async (userId, token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${URL}/${userId}`, config)
    return res.data
}

export const updateUser = async (newData, token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.put(`${URL}/${newData.id}`,newData, config)
    return res.data.user
}


export const deleteUser = async (userId, token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.delete(`${URL}/${userId}`, config)
    return res.data
}

export const userService = {
    getAllUsers,
    deleteUser,
    getUser,
    updateUser
}