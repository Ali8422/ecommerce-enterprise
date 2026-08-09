// src/pages/CatalogPage.jsx
import React from "react";
import { PRODUCTS } from "@services/productData";
import { ProductCard } from "@components/features/catalog/ProductCard";

export function CatalogPage() {
  return (
    <div className="py-3">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div>
          <h2 className="fw-bold mb-1">Enterprise Tech Catalog</h2>
          <p className="text-muted mb-0 small">
            High-performance hardware configured for modern engineering teams.
          </p>
        </div>
        <span className="badge bg-dark text-warning fs-6 px-3 py-2">
          {PRODUCTS.length} Products Available
        </span>
      </div>

      {/* Responsive Product Grid */}
      <div className="row g-4">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="col-12 col-md-6 col-lg-3">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
