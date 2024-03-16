import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Items from './Items';
import Checkout from './Checkout';
import AddItem from './AddItem';
import Navigation from './components/Navigation';
import Home from './components/Home';

const App: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    const count = localStorage.getItem('cartCount');
    if (count) {
      setCartCount(parseInt(count));
    }
  }, []);

  const updateCartCount = (count: number) => {
    setCartCount(count);
    localStorage.setItem('cartCount', count.toString());
  };

  return (
    <Router>
      <div>
        <Navigation cartCount={cartCount} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<Items updateCartCount={updateCartCount} />} />
          <Route path="/checkout" element={<Checkout updateCartCount={updateCartCount}  />} />
          <Route path="/add-item" element={<AddItem />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;