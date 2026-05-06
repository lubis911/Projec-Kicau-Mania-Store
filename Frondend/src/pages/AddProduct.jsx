import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState("");

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch {
        setCategories([]);
      }
    };

    loadCategories();
  }, []);

  const previewImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImageUrl(res.data.url);
    } catch {
      alert("Upload gambar gagal");
    }
  };

  const saveData = async () => {
    try {
      await api.post("/products", {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        imageUrl,
        category: {
          id: Number(categoryId),
        },
      });

      alert("Produk berhasil ditambahkan");

      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setImageUrl("");
      setPreview("");
      setCategoryId("");
    } catch (error) {
      console.log(error);
      alert("Gagal menambahkan produk");
    }
  };

  return (
    <>
      <Navbar />

      <div className="product-form-page">
        <div className="product-form-card">
          <h2>Tambah Produk</h2>

          {preview && (
            <img src={preview} alt="Preview" className="preview-product-img" />
          )}

          <input type="file" onChange={previewImage} />

          <input
            type="text"
            placeholder="Nama Produk"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Deskripsi Produk"
            className="text-area"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <input
            type="number"
            placeholder="Harga"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <select
            className="select-box"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Pilih Kategori</option>

            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <button onClick={saveData}>Simpan Produk</button>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
