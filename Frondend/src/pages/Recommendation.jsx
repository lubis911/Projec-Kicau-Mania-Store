import Navbar from "../components/Navbar";
import AIChat from "../components/AIChat";

function Recommendation() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h2>AI Recommendation</h2>
        <p>Tanya AI sepatu terbaik sesuai kebutuhanmu.</p>
        <AIChat />
      </div>
    </>
  );
}

export default Recommendation;
