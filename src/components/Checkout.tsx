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
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
        setCartItems(items);

        try {
            setTimeout(async () => {
                const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
                setCartItems(items);
                setLoading(false);
            }, 1500);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }, []);

    const removeFromCart = (id: number) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Update local storage

        const count = updatedCart.length;
        localStorage.setItem('cartCount', count.toString());
        updateCartCount(count);
    };

    return (
        <div className='p-12'>
            <h2 className=' font-bold text-2xl mb-5 uppercase'>Checkout</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                loading ? (
                    <div className="grid grid-cols-4 gap-6">
                        {cartItems.map((_, index) => (
                            <div key={index} className="border p-3 rounded-xl animate-pulse">
                                <div className="rounded-md bg-gray-200 h-48 w-full mb-2"></div>
                                <div className="h-6 w-2/3 bg-gray-200 mb-2"></div>
                                <div className="h-6 w-1/2 bg-gray-200"></div>
                                <div className="h-6 mt-4 bg-gray-200 mb-2"></div>
                            </div>
                        ))}
                    </div>
                ) :
                    <ul className='grid grid-cols-4 gap-6'>
                        {cartItems.map(item => (
                            <li key={item.id}>
                                <div className="border p-3 rounded-xl border-slate-700">
                                    <div className=" rounded-md flex justify-center mb-2">
                                        <img src={`http://localhost:3000/images/${item.img}`} alt={item.name} className="w-[180px] h-[180px] rounded object-cover" />
                                    </div>
                                    <h2 className="text-slate-400">{item.name || "-"}</h2>
                                    <h2 className="font-semibold text-green-400">${item.price || "-"}</h2>
                                    <button className="mt-4 font-semibold text-sm bg-red-100 text-red-800 rounded-md px-2 py-1 text-center w-full" onClick={() => removeFromCart(item.id)}>
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

export default Checkout;
