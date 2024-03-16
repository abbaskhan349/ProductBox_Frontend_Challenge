// import React, { useState } from 'react';
// import axios from 'axios';

// const AddItem: React.FC = () => {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [img, setImg] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:3000/items', { name, price, img });
//       alert('Item added successfully!');
//       setName('');
//       setPrice('');
//       setImg('');
//     } catch (error) {
//       console.error('Error adding item:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Item</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//         </label>
//         <br />
//         <label>
//           Price:
//           <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
//         </label>
//         <br />
//         <label>
//           Image URL:
//           <input type="text" value={img} onChange={(e) => setImg(e.target.value)} />
//         </label>
//         <br />
//         <button type="submit">Add Item</button>
//       </form>
//     </div>
//   );
// };

// export default AddItem;


// AddItem.tsx
import React, { useState } from 'react';
import axios from 'axios';

const AddItem: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post('http://localhost:3000/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response)

      alert('Item added successfully!');
      setName('');
      setPrice('');
      setImage(null);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div>
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Price:
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <br />
        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <br />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
