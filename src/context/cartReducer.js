// src/context/cartReducer.js

export const initialCartState = {
  items: [],
  coupon: null,
  shippingFee: 99,
};

export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (existingIndex > -1) {
        const updatedItems = state.items.map((item, index) => {
          if (index === existingIndex) {
            return { ...item, qty: item.qty + 1 };
          }
          return item;
        });
        return { ...state, items: updatedItems };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, qty: 1 }],
      };
    }

    case "UPDATE_QTY": {
      const { id, newQty } = action.payload;

      if (newQty <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        };
      }

      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, qty: newQty } : item,
      );

      return { ...state, items: updatedItems };
    }

    case "REMOVE_FROM_CART": {
      // Direct filter removal based on item ID
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    }

    case "CLEAR_CART": {
      // Revert back to fresh initial state schema
      return {
        ...initialCartState,
      };
    }

    case "APPLY_COUPON": {
      // payload structure: { code: 'SAVE10', discountPercent: 10 }
      return {
        ...state,
        coupon: action.payload,
      };
    }
    default:
      return state;
  }
}

/**
 * Calculates raw items total before tax, shipping, or discounts.
 */
export const selectCartSubtotal = (state) => {
  return state.items.reduce((sum, item) => sum + item.price * item.qty, 0);
};

/**
 * Calculates total discount amount based on active coupon.
 */
export const selectDiscountAmount =(state) =>{
  if(!state.coupon) return 0;
  const subtotal = selectCartSubtotal(state);
  return (subtotal * state.coupon.discountPercent) / 100;
}

/**
 * Calculates 18% GST (Tax) on subtotal after applying discount.
 */
export const selectTaxAmount =(state) =>{
  const subtotal = selectCartSubtotal(state);
  const discount = selectDiscountAmount(state);
  const taxableAmount = Math.max(0, subtotal - discount);
  return taxableAmount * 0.18; // 18% taxRate
}

/**
 * Calculates final grand total including tax and shipping.
 */
export const selectGrandTotal = (state) =>{
  if(state.items.length === 0) return 0;

  const subtotal = selectCartSubtotal(state);
  const discount = selectDiscountAmount(state);
  const tax = selectTaxAmount(state);

  return subtotal - discount + tax + state.shippingFee;
}