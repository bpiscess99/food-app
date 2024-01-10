import { createSlice } from "@reduxjs/toolkit";

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