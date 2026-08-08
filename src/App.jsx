import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "@context/CartContext";
import { AppRouter } from "./routes/AppRouter";

export function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
