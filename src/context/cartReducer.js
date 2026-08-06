// src/context/cartReducer.js

export const initialCartState = {
  items: [], // Array of cart items: { id, name, price, qty, image }
  coupon: null, // Active coupon: { code: 'SAVE10', discountPercent: 10 }
  shippingFee: 99, // Default flat shipping charge in INR (₹)
};
