import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Semua Produk</h2>
        <ProductList products={products} />
      </div>
    </>
  );
}

export default Products;
