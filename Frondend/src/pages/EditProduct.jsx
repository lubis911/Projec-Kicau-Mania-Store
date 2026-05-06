import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function EditProduct() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await api.get(`/products/${id}`);
    setName(res.data.name);
    setPrice(res.data.price);
  };

  const updateData = async () => {
    await api.put(`/products/${id}`, {
      name,
      price,
    });

    alert("Produk berhasil diupdate");
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Edit Produk</h2>

        <input value={name} onChange={(e) => setName(e.target.value)} />

        <input value={price} onChange={(e) => setPrice(e.target.value)} />

        <button onClick={updateData}>Update</button>
      </div>
    </>
  );
}

export default EditProduct;
