import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import api from "../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  return (
    <AdminLayout>
      <h1>Manage Users</h1>

      {users.map((item) => (
        <div className="card" key={item.id}>
          <p>{item.name}</p>
          <p>{item.email}</p>
          <p>{item.role}</p>
        </div>
      ))}
    </AdminLayout>
  );
}

export default AdminUsers;
