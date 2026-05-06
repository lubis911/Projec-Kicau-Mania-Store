import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import api from "../services/api";

function AdminDashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const products = await api.get("/products");
        setTotalProducts(products.data.length);
      } catch (error) {
        console.log(error);
      }

      try {
        const orders = await api.get("/orders");
        setTotalOrders(orders.data.length);
      } catch (error) {
        console.log(error);
      }

      try {
        const users = await api.get("/auth/users");
        setTotalUsers(users.data.length);
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);

  return (
    <AdminLayout>
      <h1>Admin Dashboard</h1>

      <div className="stats-grid">
        <div className="card">
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>

        <div className="card">
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>

        <div className="card">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
