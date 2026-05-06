import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Checkout() {
  const navigate = useNavigate();

  const payNow = async () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    await api.post("/orders", cart);

    localStorage.removeItem("cart");
    alert("Order berhasil");
    navigate("/history");
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Checkout</h2>
        <button onClick={payNow}>Bayar Sekarang</button>
      </div>
    </>
  );
}

export default Checkout;
