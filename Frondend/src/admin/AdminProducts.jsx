import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import api from "../services/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/products");
      setProducts(res.data);
    };

    fetchData();
  }, []);

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) {
      return "https://via.placeholder.com/400x260?text=No+Image";
    }

    if (imageUrl.includes("/uploads/")) {
      const fileName = imageUrl.split("/uploads/")[1];
      return `http://localhost:8082/uploads/${fileName}`;
    }

    return `http://localhost:8082/uploads/${imageUrl}`;
  };

  return (
    <AdminLayout>
      <div className="admin-top">
        <h1>Manage Products</h1>

        <Link to="/add-product">
          <button className="add-btn">+ Tambah Produk</button>
        </Link>
      </div>

      <div className="grid">
        {products.map((item) => (
          <div className="card premium-card" key={item.id}>
            <img
              src={getImageUrl(item.imageUrl)}
              alt={item.name}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x260?text=No+Image";
              }}
            />

            <h3>{item.name}</h3>

            <p className="product-desc">{item.description}</p>

            <p className="price">
              Rp {Number(item.price).toLocaleString("id-ID")}
            </p>

            <p className="stock-text">Stock: {item.stock}</p>

            <p className="category-text">Category: {item.category?.name}</p>

            <div className="admin-btn-group">
              <Link to={`/edit-product/${item.id}`}>
                <button>Edit</button>
              </Link>

              <Link to={`/delete-product/${item.id}`}>
                <button className="delete-btn">Delete</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

export default AdminProducts;
