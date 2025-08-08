import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [reloadKey, setReloadKey] = useState(0); // used to force reload ProductList

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setReloadKey(prev => prev + 1); // force reload ProductList
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Products Manager</h1>
      <ProductList key={reloadKey} onAddToCart={addToCart} />
      <Cart items={cartItems} onClear={clearCart} />
    </div>
  );
}

export default App;
