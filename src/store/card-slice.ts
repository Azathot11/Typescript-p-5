import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

type CartItem = {
    id: string;
    title: string;
    price: number;
    quantity?: number;
}

type CartState = {
    items: CartItem[]

}

const initialState: CartState = {
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action:PayloadAction<CartItem>){
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity!++
            } else {
                state.items.push({...action.payload, quantity: 1})
            }
        },
        removeFromCart(state, action:PayloadAction<string>) {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity === 1) {
                state.items = state.items.filter(item => item.id !== action.payload)
            } else if (item) {
                item.quantity!--
            }
        },
    }
});

export const {addToCart,removeFromCart} = cartSlice.actions