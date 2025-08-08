import React, { useState, useEffect } from 'react';
import { getAllProducts, deleteProduct } from '../services/productService';
import { ProductForm } from './ProductForm';
import { useCart } from '../contexts/CartContext';
import './ProductList.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  
  const [editing, setEditing] = useState(null);
  const { dispatch } = useCart();

  const load = async () => {
    const items = await getAllProducts();
    setProducts(items);
    setEditing(null);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>{editing ? 'Edit Product' : 'New Product'}</h2>
      <ProductForm existing={editing} onSaved={load} />

      <h2>All Products</h2>
      <div className="product-grid">
        {products.map(p => (
          <div key={p.id} className="product-card">
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p className="product-tags">₱{p.price} | Stocks: {p.quantity || 0}</p>
            <small>{p.details}</small>
            <div className="product-buttons">
              <button className="edit" onClick={() => setEditing(p)}>Edit</button>
              <button
                className="delete"
                onClick={async () => {
                  await deleteProduct(p.id);
                  load();
                }}
              >
                Delete
              </button>
              <button
                className="cart"
                onClick={() => dispatch({ type: 'ADD_TO_CART', payload: p })}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
