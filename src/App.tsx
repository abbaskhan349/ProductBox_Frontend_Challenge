/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import axios from 'axios';
import Cart from './Cart';
import Items from './Items';
import Checkout from './Checkout';
import AddItem from './AddItem';
import Navigation from './components/Navigation';

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
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/items">Items</Link>
            </li>
            <li>
              <Link to="/checkout">Checkout ({cartCount})</Link>
            </li>
            <li>
              <Link to="/add-item">Add Item</Link>
            </li>
          </ul>
        </nav> */}

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

const Home: React.FC = () => {
  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to RandoStore!</p>
    </div>
  );
};

export default App;