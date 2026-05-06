import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function ProductDetail() {
  const { id } = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    loadDetail();
  }, []);

  const loadDetail = async () => {
    const res = await api.get(`/products/${id}`);
    setItem(res.data);
  };

  const addCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Masuk keranjang");
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <img src={item.imageUrl} alt="" width="300" />
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <h3>Rp {item.price}</h3>
        <button onClick={addCart}>Tambah Keranjang</button>
      </div>
    </>
  );
}

export default ProductDetail;
