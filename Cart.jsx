import React from 'react';
import { deductStock } from '../services/productService';
import { useCart } from '../contexts/CartContext';
import './Cart.css';

export default function Cart() {
  const { cart, dispatch } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      for (const item of cart) {
        await deductStock(item.id, item.quantity);
      }
      alert('Checkout complete and stock updated!');
      dispatch({ type: 'CLEAR_CART' });
    } catch (err) {
      console.error('[Checkout Error]', err);
      alert('Checkout failed. Please try again.');
    }
  };

  return (
    <div className="cart-box">
      <h2>🛒 Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.name} — ₱{item.price} × {item.quantity}
              </li>
            ))}
          </ul>
          <p>Total: ₱{total.toFixed(2)}</p>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
}
