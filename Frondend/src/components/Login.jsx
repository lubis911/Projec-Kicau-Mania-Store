import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { loginUser } from "../services/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      loginUser(res.data);

      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch {
      alert("Login gagal");
    }
  };

  return (
    <div className="form-box">
      <h2>Login</h2>

      <form onSubmit={submit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="eye-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            👁️
          </span>
        </div>

        <button type="submit">Login</button>

        <Link to="/register">
          <button type="button" className="register-btn">
            Daftar
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
