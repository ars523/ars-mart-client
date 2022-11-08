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
    deleteUser
}