import { Link } from 'react-router-dom';

const Navigation: React.FC<{ cartCount: number }> = ({ cartCount }) => {
  return (
    <nav className="bg-black text-white py-4 w-screen">
      <ul className="flex justify-center">
        <li className="mr-6">
          <Link to="/" className="hover:text-gray-300 text-white">Home</Link>
        </li>
        <li className="mr-6">
          <Link to="/items" className="hover:text-gray-300">Items</Link>
        </li>
        <li className="mr-6">
          <Link to="/checkout" className="hover:text-gray-300">Checkout ({cartCount})</Link>
        </li>
        <li>
          <Link to="/add-item" className="hover:text-gray-300">Add Item</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
