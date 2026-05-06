import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Cart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce((a, b) => a + b.price, 0);

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Keranjang</h2>

        {cart.map((item, i) => (
          <div key={i}>
            <p>{item.name}</p>
            <p>Rp {item.price}</p>
          </div>
        ))}

        <h3>Total: Rp {total}</h3>

        <Link to="/checkout">
          <button>Checkout</button>
        </Link>
      </div>
    </>
  );
}

export default Cart;
