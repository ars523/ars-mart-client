import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderService } from "./orderService";

const initialState = {
    order: {},
    ordersHistory: [],
    orders: [],
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

export const getOrderHistory = createAsyncThunk(
    'order/getOrderHistory',
    async (_, thunkApi)=>{
        const token = thunkApi.getState().auth.user.token
        try {
            return await orderService.getOrderHistory(token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                            error.message || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const getAllOrders = createAsyncThunk(
    'order/getAllOrders',
    async (_, thunkApi)=>{
        const token = thunkApi.getState().auth.user.token
        try {
            return await orderService.getAllOrders(token)
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
                state.isError = true
                state.error = action.payload
                state.order = {}
            })

            .addCase(getOrderHistory.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(getOrderHistory.fulfilled, (state, action)=>{
                state.isSuccess = true
                state.ordersHistory = action.payload
            })
            .addCase(getOrderHistory.rejected, (state, action)=>{
                state.isSuccess = false
                state.isError = true
                state.error = action.payload
            })

            .addCase(getAllOrders.pending, (state, action)=>{
                state.isLoading = true
            })
            .addCase(getAllOrders.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.orders = action.payload
            })
            .addCase(getAllOrders.rejected, (state, action)=>{
                state.isSuccess = false
                state.isError = true
                state.error = action.payload
            })
    }
})

export const { reset } = orderSlice.actions
export default orderSlice.reducer