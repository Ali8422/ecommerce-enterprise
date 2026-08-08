import { Routes, Route, Navigate } from "react-router-dom";
import { RootLayout } from "@components/layout/RootLayout";
import { CatalogPage } from "@pages/CatalogPage";
import { CartPage } from "@pages/CartPage";
import { LoginPage } from "@pages/LoginPage";
import { CheckoutPage } from "@pages/CheckoutPage";

export function AppRouter() {
  return (
    <Routes>
      {/* Root Layout Wrapper */}
      <Route path="/" element={<RootLayout />}>
        {/* Redirect root URL to catalog */}
        <Route index element={<Navigate to="/catalog" replace />} />

        {/* Main Application Routes */}
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="checkout" element={<CheckoutPage />} />

        {/* 404 Fallback Route */}
        <Route
          path="*"
          element={
            <div className="text-center py-5">
              <h3 className="fw-bold text-danger">404 - Page Not Found</h3>
              <p className="text-muted">The requested view does not exist.</p>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}
