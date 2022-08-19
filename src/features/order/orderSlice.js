import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderService } from "./orderService";

const initialState = {
    order: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: ''
}

export const orderProduct = createAsyncThunk(
    'order/orderProduct',
    async (orderData, thunkApi) => {
        try {
            const token = thunkApi.getState().auth.user.token
            return await orderService.orderProduct(orderData ,token)
        } catch (error) {
            const message = error.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const getOrderById = createAsyncThunk(
    'order/getOrderById',
    async (orderId, thunkApi)=>{
        const token = thunkApi.getState().auth.user.token 
        try {
            return await orderService.getOrderById(orderId, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                            error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError =  false
            state.error = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(orderProduct.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
                state.error = ''
            })

            .addCase(orderProduct.fulfilled, (state, {payload}) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.order = payload
                state.error = ''
            })
            .addCase(orderProduct.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.error = payload
            })

            .addCase(getOrderById.pending, (state)=>{
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(getOrderById.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.order = action.payload
            })
            .addCase(getOrderById.rejected, (state, action)=>{
                state.isLoading = false
                state.isSuccess = false
                state.isError = false
                state.error = action.payload
                state.order = {}
            })
    }
})

export const { reset } = orderSlice.actions
export default orderSlice.reducer