import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";


// register
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
                return thunkAPI.rejectWithValue(message);
        }
    }
)

// Login
export const login = createAsyncThunk(
    "auth/login",
    async(userData, thunkAPI) => {
        try {
            await authService.login(userData)
        } catch (error) {
            const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
                return thunkAPI.rejectWithValue(message);
        }
    }
)


// Login With Google
export const loginWithGoogle = createAsyncThunk(
    "auth/loginWithGoogle",
    async(userToken, thunkAPI) => {
        try {
            return await authService.loginWithGoogle(userToken);
        } catch (error) {
            const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
                return thunkAPI.rejectWithValue(message);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        add: (state, action) => {
            state.push({
                id: action.payload.id,
                name: action.payload.name,
                qty: action.payload.qty,
                size: action.payload.size,
                price: action.payload.price,
                img: action.payload.img
            });
        },
        remove: (state, action) => {
            state.splice(action.payload.index, 1)
        },
        update: (state, action) => {
            const food = state.find((item) => item.id === action.payload.id);

            if(food){
                food.qty += parseInt(action.payload.qty)
                food.price += action.payload.price
            }
        },
        drop: () => []
    },
});

export const {add, remove, update, drop} = cartSlice.actions
export default cartSlice.reducer