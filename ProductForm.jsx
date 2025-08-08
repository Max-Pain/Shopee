// src/components/ProductForm.jsx
import { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../services/productService';
import './ProductForm.css';

export function ProductForm({ existing, onSaved }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    details: '',
    quantity: ''
  });

  useEffect(() => {
    if (existing) {
      setForm(existing);
    }
  }, [existing]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (existing) {
      await updateProduct(existing.id, form);
    } else {
      await createProduct(form);
    }
    onSaved();
    setForm({ name: '', description: '', price: '', details: '', quantity: '' });
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{existing ? 'Edit Product' : 'Add Product'}</h2>

      <label>Product Name</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        placeholder="Enter product name"
      />

      <label>Description</label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        required
        placeholder="Enter short description"
      />

      <label>Price</label>
      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        required
        min="0"
        placeholder="₱0.00"
      />

      <label>Details</label>
      <textarea
        name="details"
        value={form.details}
        onChange={handleChange}
        placeholder="Optional details"
      />

      <label>Quantity</label>
      <input
        type="number"
        name="quantity"
        value={form.quantity}
        onChange={handleChange}
        required
        min="0"
        placeholder="0"
      />

      <button type="submit">{existing ? 'Update' : 'Add Product'}</button>
    </form>
  );
}
