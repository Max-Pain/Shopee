// src/components/ProductForm.jsx
import { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../services/productService';

export function ProductForm({ existing, onSaved }) {
  // existing = { id, name, description, price, details } or null
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    details: ''
  });

  useEffect(() => {
    if (existing) setForm(existing);
  }, [existing]);

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (existing) {
      await updateProduct(existing.id, form);
    } else {
      await createProduct(form);
    }
    onSaved();
    setForm({ name: '', description: '', price: '', details: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />
      <textarea
        name="details"
        placeholder="Details"
        value={form.details}
        onChange={handleChange}
      />
      <button type="submit">
        {existing ? 'Update' : 'Create'}
      </button>
    </form>
  );
}
