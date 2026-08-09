import { useCartDispatch } from "@context/CartContext";

export function ProductCard({ product }) {
  const dispatch = useCartDispatch();

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
    });
  };

  return (
    <div className="card h-100 shadow-sm border-0">
      <img
        src={product.image}
        className="card-img-top"
        alt={product.name}
        style={{ objectFit: "cover", height: "180px" }}
      />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="badge bg-secondary">{product.category}</span>
          <span className="text-warning small fw-bold">
            ★ {product.rating}{" "}
          </span>
        </div>
        <h5 className="card-title fw-bold text-dark fs-6">{product.name}</h5>
        <p className="card-text text-muted small flex-grow-1">
          {product.description}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
          <span className="fw-bold text-dark fs-5">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <button
            onClick={handleAddToCart}
            className="btn btn-warning btn-sm fw-bold shadow-sm"
          >
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
