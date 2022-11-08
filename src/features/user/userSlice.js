import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { userService } from "./userService"

const initialState = {
    users: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: ''
}

export const getAllUsers = createAsyncThunk(
    'user/getAllUsers',
    async (_, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await userService.getAllUsers(token)
        } catch (error) {
            const message = (error?.response?.data?.message) || error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)
export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (userId, thunkApi) => {
        const token = thunkApi.getState().auth.user.token
        try {
            return await userService.deleteUser(userId, token)
        } catch (error) {
            const message = (error?.response?.data?.message) || error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state, { payload }) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.error = ''
            })
            .addCase(getAllUsers.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.users = payload
                state.error = ''
            })
            .addCase(getAllUsers.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.error = payload
            })
            .addCase(deleteUser.pending, (state, { payload }) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.error = ''
            })
            .addCase(deleteUser.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.users = state.users.filter((user)=>user._id!==payload._id)
                state.error = ''
            })
            .addCase(deleteUser.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.error = payload
            })
    }
})

export default userSlice.reducer