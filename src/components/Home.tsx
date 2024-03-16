import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold text-white mb-8">Welcome to RandoStore</h1>
            <div className="flex space-x-6">
                <Link to="/items" className="bg-white text-gray-800 px-6 py-4 rounded-lg text-xl font-semibold hover:bg-gray-200 transition duration-300">Items</Link>
                <Link to="/add-item" className="bg-white text-gray-800 px-6 py-4 rounded-lg text-xl font-semibold hover:bg-gray-200 transition duration-300">Add Item</Link>
                <Link to="/checkout" className="bg-white text-gray-800 px-6 py-4 rounded-lg text-xl font-semibold hover:bg-gray-200 transition duration-300">Checkout</Link>
            </div>
        </div>
    );
}

export default Home;
