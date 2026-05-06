import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import shoe1 from '../assets/sepatu1.jpg';
import shoe2 from '../assets/sepatu2.jpg';
import shoe3 from '../assets/sepatu3.jpg';

const CategoryPage = () => {
    const navigate = useNavigate();
  const categories = ['All', 'Running', 'Sport', 'Casual'];

  const products = [
    {
      id: 1,
      name: 'Nike Jordan',
      category: 'Running',
      price: 1000000,
      image: shoe1,
    },
    {
      id: 2,
      name: 'Arda Khaki',
      category: 'Sport',
      price: 1200000,
      image: shoe2,
    },
    {
      id: 3,
      name: 'Footstep Footwear',
      category: 'Casual',
      price: 1500000,
      image: shoe3,
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 bg-gray-700 text-white px-5 py-3 rounded-lg mb-6 hover:bg-gray-800 transition"
        >
          <FaArrowLeft />
          Kembali
        </button>

        <h1 className="text-4xl font-bold text-center mb-10">
          Kategori Sepatu
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />

              <div className="p-6">
                <span className="text-sm text-gray-500">
                  {product.category}
                </span>

                <h2 className="text-2xl font-bold my-2">
                  {product.name}
                </h2>

                <p className="text-blue-600 text-xl font-bold">
                  Rp {product.price.toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;