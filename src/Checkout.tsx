

// // Checkout.tsx
// import React, { useState, useEffect } from 'react';

// interface CartItem {
//   id: number;
//   name: string;
//   price: string;
//   img: string;
// }

// const Checkout: React.FC = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   useEffect(() => {
//     const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
//     setCartItems(items);
//   }, []); // Run this effect only once, on component mount

//   const removeFromCart = (id: number) => {
//     const updatedCart = cartItems.filter(item => item.id !== id);
//     setCartItems(updatedCart);
//     localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Update local storage
//   };

//   return (
//     <div>
//       <h2>Checkout</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <ul>
//           {cartItems.map(item => (
//             <li key={item.id}>
//               <img src={item.img} alt={item.name} />
//               <div>{item.name}</div>
//               <div>${item.price}</div>
//               <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Checkout;


// // Checkout.tsx
// import React, { useState, useEffect } from 'react';

// interface CartItem {
//   id: number;
//   name: string;
//   price: string;
//   img: string;
// }

// const Checkout: React.FC = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   useEffect(() => {
//     const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
//     setCartItems(items);
//   }, []);

//   const removeFromCart = (id: number) => {
//     const updatedCart = cartItems.filter(item => item.id !== id);
//     setCartItems(updatedCart);
//     localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Update local storage
//   };

//   return (
//     <div>
//       <h2>Checkout</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <ul>
//           {cartItems.map(item => (
//             <li key={item.id}>
//               <img src={item.img} alt={item.name} />
//               <div>{item.name}</div>
//               <div>${item.price}</div>
//               <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Checkout;



// Checkout.tsx
import React, { useState, useEffect } from 'react';

interface CartItem {
    id: number;
    name: string;
    price: string;
    img: string;
}

interface Props {
    updateCartCount: (count: number) => void;
}

const Checkout: React.FC<Props> = ({ updateCartCount }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
        setCartItems(items);
    }, []);

    const removeFromCart = (id: number) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Update local storage

        // Update the cart count in the header
        const count = updatedCart.length;
        localStorage.setItem('cartCount', count.toString());
        updateCartCount(count);
    };

    return (
        <div>
            <h2>Checkout</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            <img src={item.img} alt={item.name} />
                            <div>{item.name}</div>
                            <div>${item.price}</div>
                            <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Checkout;
