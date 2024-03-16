// // Items.tsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface Item {
//   id: number;
//   name: string;
//   price: string;
//   img: string;
// }

// interface Props {
//   updateCartCount: (count: number) => void;
// }

// const Items: React.FC<Props> = ({ updateCartCount }) => {
//   const [items, setItems] = useState<Item[]>([]);

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     try {
//       const response = await axios.get<Item[]>('http://localhost:3000/items');
//       setItems(response.data);
//     } catch (error) {
//       console.error('Error fetching items:', error);
//     }
//   };

//   const addToCart = () => {
//     // Implement adding item to cart here
//     const count = localStorage.getItem('cartCount');
//     const newCount = count ? parseInt(count) + 1 : 1;
//     updateCartCount(newCount);
//   };

//   return (
//     <div>
//       <h2>Items</h2>
//       <ul className=' flex gap-7 flex-row'>
//         {items.map(item => (
//           <li key={item.id}>
//             <img src={item.img} alt={item.name} />
//             <div>{item.name}</div>
//             <div>${item.price}</div>
//             <button onClick={addToCart}>Add to Cart</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Items;


// // Items.tsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface Item {
//     id: number;
//     name: string;
//     price: string;
//     img: string;
// }

// interface Props {
//     updateCartCount: (count: number) => void;
// }

// const Items: React.FC<Props> = ({ updateCartCount }) => {
//     const [items, setItems] = useState<Item[]>([]);

//     useEffect(() => {
//         fetchItems();
//     }, []);

//     const fetchItems = async () => {
//         try {
//             const response = await axios.get<Item[]>('http://localhost:3000/items');
//             setItems(response.data);
//         } catch (error) {
//             console.error('Error fetching items:', error);
//         }
//     };

//     const addToCart = (item: Item) => {
//         // Update the local storage to add the item to the cart
//         const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
//         const updatedCartItems = [...cartItems, item];
//         localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

//         // Update the cart count in the header
//         const count = cartItems.length + 1;
//         updateCartCount(count);
//     };

//     return (
//         <div>
//             <h2>Items</h2>
//             <div className="border p-3 rounded-xl border-slate-700">
//                 <div className="bg-gray-300 rounded-md mb-2">
//                     {/* <img src={CoffeeImage} alt="coffee" className="w-[180px] h-[180px] rounded object-cover" /> */}
//                 </div>
//                 <h2 className="text-slate-400">name</h2>
//                 <h2 className="font-semibold text-green-400">$ 400</h2>
//                 <button className="mt-4 font-semibold text-sm bg-slate-100 text-slate-800 rounded-md px-2 py-1 text-center w-full">
//                     Add To Cart
//                 </button>
//             </div>
//             <ul>
//                 {items.map(item => (
//                     <li key={item.id}>
//                         <img src={item.img} alt={item.name} />
//                         <div>{item.name}</div>
//                         <div>${item.price}</div>
//                         <button onClick={() => addToCart(item)}>Add to Cart</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Items;



// Items.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Item {
    id: number;
    name: string;
    price: string;
    img: string;
}

interface Props {
    updateCartCount: (count: number) => void;
}

const Items: React.FC<Props> = ({ updateCartCount }) => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get<Item[]>('http://localhost:3000/items');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const addToCart = (item: Item) => {
        // Update the local storage to add the item to the cart
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        const updatedCartItems = [...cartItems, item];
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

        // Update the cart count in the header
        const count = cartItems.length + 1;
        updateCartCount(count);
    };

    const removeFromList = (itemId: number) => {
        // Remove item from local storage
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        const updatedCartItems = cartItems.filter((item: Item) => item.id !== itemId);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        console.log(localStorage)

        // Remove item from the displayed list
        const updatedItems = items.filter(item => item.id !== itemId);
        setItems(updatedItems);
    };

    return (
        <div>
            <h2>Items</h2>
            <ul className='flex gap-4'>
                {items.map(item => (
                    <li key={item.id}>
                        <div className="border p-3 rounded-xl border-slate-700">
                            <div className="bg-gray-300 rounded-md mb-2">
                                <img src={item.img} alt={item.name} className="w-[180px] h-[180px] rounded object-cover" />
                            </div>
                            <h2 className="text-slate-400">{item.name}</h2>
                            <h2 className="font-semibold text-green-400">${item.price}</h2>
                            <button className="mt-4 font-semibold text-sm bg-slate-100 text-slate-800 rounded-md px-2 py-1 text-center w-full" onClick={() => addToCart(item)}>
                                Add To Cart
                            </button>
                            <button className="mt-4 font-semibold text-sm bg-red-100 text-red-800 rounded-md px-2 py-1 text-center w-full" onClick={() => removeFromList(item.id)}>
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Items;
