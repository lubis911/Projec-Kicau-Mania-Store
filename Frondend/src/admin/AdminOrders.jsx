import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import api from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await api.get("/orders");
    setOrders(res.data);
  };

  return (
    <AdminLayout>
      <h1>Manage Orders</h1>

      {orders.map((item) => (
        <div className="card" key={item.id}>
          <p>Order #{item.id}</p>
          <p>Status: {item.status}</p>
          <p>Total: Rp {item.total}</p>
        </div>
      ))}
    </AdminLayout>
  );
}

export default AdminOrders;
