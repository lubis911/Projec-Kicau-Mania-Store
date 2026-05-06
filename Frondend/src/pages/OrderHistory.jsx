import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await api.get("/orders/my");
    setOrders(res.data);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Riwayat Order</h2>

        {orders.map((item) => (
          <div key={item.id}>
            <p>Order #{item.id}</p>
            <p>Status: {item.status}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default OrderHistory;
