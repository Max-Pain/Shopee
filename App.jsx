import React from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { CartProvider } from './contexts/CartContext';
import './App.css';


function App() {
  return (
    <CartProvider>
      <div style={{ padding: 20 }}>
      <div className="header-bar">
  <h1>Products Manager</h1>
</div>

        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;
