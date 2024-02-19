import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
 cartItems: [],
 itemsInCart: 0,
 cartTotal: 0,
 taxValue: 0,
 shipping: 500,
 orderTotal: 0,

};

const cartslice = createSlice({
 name: 'cart',
 initialState: JSON.parse(localStorage.getItem('cart')) || initialstate,
 reducers: {

  addItem: (state, action) => {
   const product = action.payload;
   const item = state.cartItems.find((i) => i.cartId == product.cartId)
   if (item) {
    item.amount += product.amount;
   }
   else {
    state.cartItems.push(product);

   }
   state.itemsInCart += product.amount;
   state.cartTotal += product.amount * product.price;
   cartslice.caseReducers.calculateTotals(state, product);



  },
  removeItem: (state, action) => {
   console.log("remove")
  },
  calculateTotals: (state, action) => {

   ///WE CAN PASS THE PAY LODAD ALSO INTERNALLY ....... THERE BY WE CAN ACCESS THE PRODUCT  THAT WE SELECTD ........
   console.log(action);
   state.taxValue = 0.1 * state.cartTotal;
   state.orderTotal = state.cartTotal + state.taxValue + state.shipping;
   localStorage.setItem('cart', JSON.stringify(state))
  }

 }
})
export const { addItem, removeItem, addtoBag } = cartslice.actions;
export default cartslice.reducer;