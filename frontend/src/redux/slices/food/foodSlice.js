import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import foodService from "./foodServices";
import { toast } from "react-toastify";

const initialState = {
    orderData: null,
    isLoading: false,
    isError: null,
}

export const myOrderFood = createAsyncThunk(
    "food/myOrder",
    async(email, thunkAPI) => {
        try {
            return await foodService.myOrderFood(email)            
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

// Define food slice
const foodSlice = createSlice({
    name: "food",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
        .addCase(myOrderFood.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(myOrderFood.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.orderData = action.payload;
            toast.success("My Placed Orders")
        })
        .addCase(myOrderFood.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })
    }
})


export const foodActions = foodSlice.actions;
export default foodSlice.reducer;