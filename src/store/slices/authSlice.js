import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios"
// login 
export const login = createAsyncThunk('auth/login' , async (data , {rejectWithValue})=>{
    try {
        const response = await api.post('/login' , data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
// register 
export const register = createAsyncThunk('auth/register' , async(data, {rejectWithValue})=>{
    try {
        const response = await api.post('/register' , data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
// logout
export const logout = createAsyncThunk('auth/logout' , async(_, {rejectWithValue})=>{
    try {
        await api.post('/logout')
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
// getUser
export const getUser = createAsyncThunk('auth/user' , async(_ , {rejectWithValue}) =>{
    try {
        const response = await api.get('/user')
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})



const authSlice = createSlice({
    name: 'auth' ,
    initialState:{
        user: null  ,
        token: localStorage.getItem('token') || null  ,
        loading:  false ,
        errors: null
    },
    reducers: {
        clearErrors: (state)=> {state.errors = null}
    },
    extraReducers:(builder)=>{
        builder
        // login
        .addCase(login.pending , (state)=>{
                state.loading = true ,
                state.errors = null
        })
        .addCase(login.fulfilled , (state , action)=>{
            state.loading = false ,
            state.user = action.payload.data.user ,
            state.token = action.payload.data.token , 
            localStorage.setItem('token' , action.payload.data.token)
        })
        .addCase(login.rejected , (state , action)=>{
            state.loading = false ,
            state.errors = action.payload.errors
        })
        // register
        .addCase(register.pending , (state)=>{
            state.loading = true ,
            state.errors = null
        })
        .addCase(register.fulfilled , (state , action)=>{
            state.loading = false ,
            state.user = action.payload.data.user ,
            state.token = action.payload.data.token ,
            localStorage.setItem('token' , action.payload.data.token)
        })
        .addCase(register.rejected , (state,action)=>{
            state.loading = false ,
            state.errors = action.payload.errors
        })
        // logout
        .addCase(logout.pending , (state)=>{
            state.loading = true ,
            state.errors = null
        })
        .addCase(logout.fulfilled , (state)=>{
            state.user = null 
            state.token = null 
            localStorage.removeItem('token')
        })
        .addCase(logout.rejected, (state, action) => {
            state.loading = false
            state.user = null
            state.token = null
            state.errors = action.payload.errors
            localStorage.removeItem('token')
        })
        // getUser
        .addCase(getUser.pending , (state)=>{
            state.loading = true ,
            state.errors = null
        })
        .addCase(getUser.fulfilled , (state , action)=>{
            state.loading = false
            state.user = action.payload.data
        })
        .addCase(getUser.rejected, (state, action) => {
            state.loading = false
            state.user = null
            state.token = null
            state.errors = action.payload?.errors
        })
    }
})

export const {clearErrors} = authSlice.actions
export default authSlice.reducer