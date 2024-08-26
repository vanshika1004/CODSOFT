import { createSlice } from "@reduxjs/toolkit"

export const CartSlice = createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        // reducer function takes two parameters named state , action and we can access the argument called in function by action.payload
        add:(state , action)=>{
            state.push(action.payload);
        },
        remove:(state , action)=>{
            return state.filter((item) => item.id !== action.payload)
        },
    }
})

export const {add,remove} = CartSlice.actions;
export default CartSlice.reducer;