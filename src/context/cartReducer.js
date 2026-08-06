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

    default:
      return state;
  }
}
