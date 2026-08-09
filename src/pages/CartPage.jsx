import { Link } from "react-router-dom";
import { useCartState, useCartDispatch } from "@context/CartContext";
import {
  selectCartSubtotal,
  selectDiscountAmount,
  selectTaxAmount,
  selectGrandTotal,
} from "@context/cartReducer";
import { useState } from "react";

export function CartPage() {
  const state = useCartState();
  const dispatch = useCartDispatch();
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  // Calculate derived values using pure selectors
  const subtotal = selectCartSubtotal(state);
  const discount = selectDiscountAmount(state);
  const tax = selectTaxAmount(state);
  const grandTotal = selectGrandTotal(state);

  const handleQtyChange = (id, newQty) => {
    dispatch({
      type: "UPDATE_QTY",
      payload: { id, newQty },
    });
  };

  const handleRemoveItem = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { id },
    });
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "SAVE10") {
      dispatch({
        type: "APPLY_COUPON",
        payload: { code: "SAVE10", discountPercent: 10 },
      });
      setCouponError("");
    } else {
      setCouponError('Invalid coupon code. Try "SAVE10".');
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="text-center py-5">
        <h3 className="fw-bold mb-3">Your cart is empty 🛒</h3>
        <p className="text-muted mb-4">
          Looks like you haven't added any tech hardware yet.
        </p>
        <Link to="/catalog" className="btn btn-warning fw-bold px-4">
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="py-3">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <h2 className="fw-bold mb-0">Shopping Cart</h2>
        <button
          onClick={() => dispatch({ type: "CLEAR_CART" })}
          className="btn btn-outline-danger btn-sm"
        >
          Clear Cart
        </button>
      </div>

      <div className="row g-4">
        {/* Left Column: Cart Items List */}
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0 mb-3">
            <ul className="list-group list-group-flush">
              {state.items.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item p-3 d-flex align-items-center justify-content-between"
                >
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded"
                      style={{
                        width: "64px",
                        height: "64px",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <h6 className="fw-bold mb-1">{item.name}</h6>
                      <span className="text-muted small">
                        ₹{item.price.toLocaleString("en-IN")} each
                      </span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3">
                    {/* Quantity Controls */}
                    <div className="btn-group btn-group-sm" role="group">
                      <button
                        onClick={() => handleQtyChange(item.id, item.qty - 1)}
                        className="btn btn-outline-secondary"
                      >
                        -
                      </button>
                      <span className="btn btn-light px-3 fw-bold disabled">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => handleQtyChange(item.id, item.qty + 1)}
                        className="btn btn-outline-secondary"
                      >
                        +
                      </button>
                    </div>

                    {/* Item Total */}
                    <span className="fw-bold text-dark min-w-80 text-end">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </span>

                    {/* Delete Item */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="btn btn-sm btn-outline-danger border-0"
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Coupon & Order Summary */}
        <div className="col-12 col-lg-4">
          {/* Coupon Box */}
          <div className="card shadow-sm border-0 mb-3">
            <div className="card-body">
              <h6 className="fw-bold mb-2">Apply Promo Code</h6>
              <form onSubmit={handleApplyCoupon} className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Try SAVE10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button type="submit" className="btn btn-dark btn-sm fw-bold">
                  Apply
                </button>
              </form>
              {state.coupon && (
                <div className="text-success small mt-2 fw-semibold">
                  ✓ Coupon "{state.coupon.code}" active (
                  {state.coupon.discountPercent}% off)
                </div>
              )}
              {couponError && (
                <div className="text-danger small mt-2">{couponError}</div>
              )}
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="fw-bold mb-3 border-bottom pb-2">Order Summary</h6>

              <div className="d-flex justify-content-between mb-2 small">
                <span className="text-muted">Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              {discount > 0 && (
                <div className="d-flex justify-content-between mb-2 small text-success">
                  <span>Discount ({state.coupon.discountPercent}%)</span>
                  <span>- ₹{discount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="d-flex justify-content-between mb-2 small">
                <span className="text-muted">GST (18%)</span>
                <span>₹{tax.toLocaleString("en-IN")}</span>
              </div>

              <div className="d-flex justify-content-between mb-3 small">
                <span className="text-muted">Shipping Fee</span>
                <span>₹{state.shippingFee.toLocaleString("en-IN")}</span>
              </div>

              <div className="d-flex justify-content-between pt-2 border-top fw-bold fs-5 mb-4">
                <span>Grand Total</span>
                <span className="text-dark">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
              </div>

              <Link
                to="/checkout"
                className="btn btn-warning w-100 fw-bold py-2 shadow-sm"
              >
                Proceed to Checkout →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
