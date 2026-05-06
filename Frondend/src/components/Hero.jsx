import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <h1>Best Shoes Collection 2026</h1>
      <p>Temukan sepatu terbaik dengan bantuan AI Recommendation</p>
      <Link to="/products">
        <button>Shop Now</button>
      </Link>
    </section>
  );
}

export default Hero;
