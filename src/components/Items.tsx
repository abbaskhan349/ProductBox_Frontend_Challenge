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
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            setTimeout(async () => {
                const response = await axios.get<Item[]>('http://localhost:3000/items');
                setItems(response.data);
                setLoading(false);
            }, 1500);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };


    const addToCart = (item: Item) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        const updatedCartItems = [...cartItems, item];
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

        const count = cartItems.length + 1;
        updateCartCount(count);
    };

    const removeFromList = (itemId: number) => {
        axios.delete(`http://localhost:3000/items/${itemId}`)
            .then(() => {
                const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
                const updatedCartItems = cartItems.filter((item: Item) => item.id !== itemId);
                localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

                const updatedItems = items.filter(item => item.id !== itemId);
                setItems(updatedItems);
            })
            .catch(error => {
                console.error('Error deleting item:', error);
            });
    };

    return (
        <div className='p-12'>
            <h2 className='font-bold text-2xl mb-5 uppercase'>Items</h2>
            {loading ? (
                <div className="grid grid-cols-4 gap-6">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="border p-3 rounded-xl animate-pulse">
                            <div className="rounded-md bg-gray-200 h-48 w-full mb-2"></div>
                            <div className="h-6 w-2/3 bg-gray-200 mb-2"></div>
                            <div className="h-6 w-1/2 bg-gray-200"></div>
                            <div className="h-6 mt-4 bg-gray-200 mb-2"></div>
                            <div className="h-6 mt-4 bg-gray-200"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <ul className='grid grid-cols-4 gap-6'>
                    {items.map(item => (
                        <li key={item.id}>
                            <div className="border p-3 rounded-xl border-slate-700">
                                <div className="rounded-md flex justify-center mb-2">
                                    <img src={`http://localhost:3000/images/${item.img}`} alt={item.name} className="h-[180px] w-[180px]" />
                                </div>
                                <h2 className="text-slate-400">{item.name || "-"}</h2>
                                <h2 className="font-semibold text-green-400">${item.price || "-"}</h2>
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
            )}
        </div>
    );
};

export default Items;
