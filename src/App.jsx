// src/App.jsx
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "@context/CartContext";
import { AuthProvider } from "@context/AuthContext";
import { AppRouter } from "./routes/AppRouter";

/**
 * Enterprise Application Entry Point
 * Configures top-level Context Providers and Client Router
 */
export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
