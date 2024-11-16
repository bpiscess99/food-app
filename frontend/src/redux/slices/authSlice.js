import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from './authService'
import {toast} from 'react-toastify';

const initialState = {
    isLoggedIn: false,
    isError: false,
    isSuccess: false,
    isLoading: false
}

// Register User
export const register = createAsyncThunk(
    "auth/register",
    async(userData, thunkAPI) => {
        try {
            return await authService.register(userData)
        } catch (error) {
            const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) || 
                error.message ||
                error.toString();
                return thunkAPI.rejectWithValue(message)
        }
    }
)

// Login User 
export const login = createAsyncThunk(
    "auth/login",
    async(userData, thunkAPI) => {
        try {
            return authService.login(userData)
        } catch (error) {
            const message = 
         (error.response &&
            error.response.data &&
            error.response.data.message) || 
            error.message ||
            error.toString();
            return thunkAPI.rejectWithValue(message) 
        }
    }
)

// Login with google
export const loginWithGoogle = createAsyncThunk(
    "auth/loginWithGoogle",
    async(userToken, thunkAPI) => {
        try {
            return authService.loginWithGoogle(userToken)
        } catch (error) {
            const message = 
         (error.response &&
            error.response.data &&
            error.response.data.message) || 
            error.message ||
            error.toString();
            return thunkAPI.rejectWithValue(message) 
        }
    }
)

