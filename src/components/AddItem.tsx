import React, { useState } from 'react';
import axios from 'axios';

const AddItem: React.FC = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [img, setImg] = useState('');

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('image', file);

                const res = await axios.post('http://localhost:3000/items/uploadpic', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setImg(res.data.imagePath)

            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/items', { name, price, img });
            alert('Item added successfully!');
            setName('');
            setPrice('');
            setImg('');
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    return (
        <div className='p-12 flex flex-col justify-center items-center'>
            <h2 className=' text-2xl font-bold'>Add Item</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="itemName" className="block">
                    Name:
                    <input
                        id="itemName"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block border border-gray-300 rounded-md w-full mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>
                <br />
                <label htmlFor="itemPrice" className="block">
                    Price:
                    <input
                        id="itemPrice"
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="block border border-gray-300 rounded-md w-full mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>
                <br />
                <label htmlFor="itemImage" className="block">
                    Image URL:
                    <input
                        id="itemImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block border border-gray-300 rounded-md w-full mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>
                <br />
                <button type="submit" className="block bg-blue-500 text-white px-4 py-2 rounded-md mt-4 focus:outline-none focus:bg-blue-600">
                    Add Item
                </button>
            </form>
        </div>

    );
};

export default AddItem;