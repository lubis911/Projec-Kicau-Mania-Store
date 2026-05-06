import { useState } from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import api from "../services/api";

function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);

  const searchData = async () => {
    const res = await api.get(`/products/search?keyword=${keyword}`);
    setProducts(res.data);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Cari Produk</h2>

        <input
          type="text"
          placeholder="Cari sepatu..."
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button onClick={searchData}>Cari</button>

        <ProductList products={products} />
      </div>
    </>
  );
}

export default SearchPage;
