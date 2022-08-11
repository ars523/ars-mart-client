import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "./productService";
const initialState ={
    products : [],
    product: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: ''
}

export const getProducts = createAsyncThunk(
    'product/getProducts',
    async (_, thunkApi)=>{
        try {
            return await productService.getProducts()
        } catch (error) {
            const message = error.message
            return thunkApi.rejectWithValue(message)
        }
    }
)
export const getProduct = createAsyncThunk(
    'product/getProduct',
    async (slug, thunkApi)=>{
        try {
            return await productService.getProduct(slug)
        } catch (error) {
            const message = error.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        reset: (state)=>initialState
    },
    extraReducers: (builder)=>{
        builder
            .addCase(getProducts.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state, {payload})=>{
                state.isLoading = false
                state.isSuccess = true
                state.products = payload
            })
            .addCase(getProducts.rejected, (state, {payload})=>{
                state.isLoading = false
                state.isError = true
                state.error = payload
            })

            .addCase(getProduct.fulfilled, (state, {payload})=>{
                state.isLoading = false
                state.isSuccess = true
                state.product = payload
            })
    }
})

export const {reset} = productSlice.actions
export default productSlice.reducer
