import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function DeleteProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    removeData();
  }, []);

  const removeData = async () => {
    await api.delete(`/products/${id}`);
    alert("Produk dihapus");
    navigate("/admin/products");
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Menghapus Produk...</h2>
      </div>
    </>
  );
}

export default DeleteProduct;
