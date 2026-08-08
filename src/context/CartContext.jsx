// src/context/CartContext.jsx
import { createContext, useReducer, useMemo, useContext } from "react";
import { cartReducer, initialCartState } from "./cartReducer";

// 1. Separate Contexts for State and Dispatch
// eslint-disable-next-line react-refresh/only-export-components
export const CartStateContext = createContext(null);
// eslint-disable-next-line react-refresh/only-export-components
export const CartDispatchContext = createContext(null);

/**
 * Enterprise Provider Component
 */
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // Memoize dispatch object reference to prevent re-render cascades
  const memoizedDispatch = useMemo(() => dispatch, []);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={memoizedDispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

/**
 * Custom Hook: Consumes Cart State
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useCartState() {
  const context = useContext(CartStateContext);
  if (context === null) {
    throw new Error("useCartState must be used within a CartProvider");
  }
  return context;
}

/**
 * Custom Hook: Consumes Cart Dispatch
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useCartDispatch() {
  const context = useContext(CartDispatchContext);
  if (context === null) {
    throw new Error("useCartDispatch must be used within a CartProvider");
  }
  return context;
}
