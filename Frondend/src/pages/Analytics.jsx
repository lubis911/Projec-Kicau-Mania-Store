import Navbar from "../components/Navbar";

function Analytics() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Analytics Dashboard</h2>
        <p>Total Penjualan</p>
        <p>Produk Terlaris</p>
        <p>User Terdaftar</p>
      </div>
    </>
  );
}

export default Analytics;
