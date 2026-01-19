import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const plant = action.payload;

        return { ...state, items: [...state.items, { ...plant, quantity: 1} ]}
    },
    removeItem: (state, action) => {
        const plant = action.payload;
        return { ...state, items: [...state.items.filter( p => p.name !== plant.name )]}
    },
    updateQuantity: (state, action) => {
        const { name, image, cost, quantity } = action.payload;
        //
        const itemInState = state.items.find( it => it.name === name);
        //
        if (!itemInState) {
            return { ...state, items: [...state.items,  { name, image, cost, quantity: 1 }  ] }; // first
        } else {
            //next
            const currentAmount = itemInState.quantity;
            //
            return { ...state, items: [...state.items.map( it => it.name !== name ? it : { name, image, cost, quantity: quantity/* of payload */ } )]}
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
