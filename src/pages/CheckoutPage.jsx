// src/pages/CheckoutPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartState, useCartDispatch } from '@context/CartContext';
import { useAuth } from '@context/AuthContext';
import { selectGrandTotal } from '@context/cartReducer';

export function CheckoutPage() {
  const state = useCartState();
  const dispatch = useCartDispatch();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const grandTotal = selectGrandTotal(state);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    // Reset cart state after successful checkout
    dispatch({ type: 'CLEAR_CART' });
  };

  if (orderPlaced) {
    return (
      <div className="text-center py-5">
        <div className="text-success fs-1 mb-2">✓</div>
        <h3 className="fw-bold text-success mb-2">Order Placed Successfully!</h3>
        <p className="text-muted mb-4">
          A confirmation email has been sent to <strong>{user?.email}</strong>.
        </p>
        <button
          onClick={() => navigate('/catalog')}
          className="btn btn-warning fw-bold px-4"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="py-3" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="fw-bold mb-3">Order Checkout</h2>
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h6 className="fw-bold border-bottom pb-2 mb-3">Account Information</h6>
          <p className="mb-1"><strong>Logged in as:</strong> {user?.email}</p>
          <p className="text-muted small">Items in Cart: {state.items.length}</p>

          <h6 className="fw-bold border-bottom pb-2 mb-3 mt-4">Payment & Summary</h6>
          <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
            <span>Total Payable:</span>
            <span>₹{grandTotal.toLocaleString('en-IN')}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={state.items.length === 0}
            className="btn btn-success w-100 fw-bold py-2 shadow-sm"
          >
            Confirm & Pay Order
          </button>
        </div>
      </div>
    </div>
  );
}