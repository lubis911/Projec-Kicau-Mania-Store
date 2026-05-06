import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import api from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch {
      setProducts([]);
    }
  };

  return (
    <>
      <Navbar />
      <Hero />
      <div className="container">
        <h2>Produk Terbaru</h2>
        <ProductList products={products.slice(0, 4)} />
      </div>
      <Footer />
    </>
  );
}

export default Home;
