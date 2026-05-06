import { Link } from "react-router-dom";

function ProductCard({ item }) {
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
    <div className="card">
      <img
        src={getImageUrl(item.imageUrl)}
        alt={item.name}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/400x260?text=No+Image";
        }}
      />

      <h3>{item.name}</h3>
      <p>Rp {Number(item.price).toLocaleString("id-ID")}</p>

      <Link to={`/product/${item.id}`}>
        <button>Detail</button>
      </Link>
    </div>
  );
}

export default ProductCard;
