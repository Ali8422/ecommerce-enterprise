import { Outlet, Link } from "react-router-dom";
import { useCartState } from "../../context/CartContext";
import { selectCartSubtotal } from "../../context/cartReducer";

export function RootLayout() {
  const state = useCartState();

  //Calculate total item count for badge
  const totalItemCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const subtotal = selectCartSubtotal(state);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* {Top Navigation Bar} */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-warning fs-4" to="/">
            🛒 TechCart Enterprise
          </Link>
          <div className="d-flex align-items-center gap-3">
            <Link to="/catalog" className="btn btn-outline-light btn-sm">
              Catalog
            </Link>
            <Link
              to="/cart"
              className="btn btn-warning btn-sm position-relative"
            >
              Cart
              {totalItemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItemCount}
                </span>
              )}
            </Link>
            <span className="text-light fw-semibold small">
              ₹{subtotal.toLocaleString("en-IN")}
            </span>
            <Link to="/login" className="btn btn-outline-info btn-sm ms-2">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Page Content Container */}
      <main className="container flex-grow-1 my-4">
        <Outlet />
      </main>
      {/* Persistent Enterprise Footer */}
      <footer className="bg-dark text-secondary text-center py-3 mt-auto border-top border-secondary">
        <div className="container">
          <small>
            © 2026 TechCart Enterprise. Built with React Context & Vite.
          </small>
        </div>
      </footer>
    </div>
  );
}
