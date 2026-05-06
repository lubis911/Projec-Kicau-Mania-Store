import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Register berhasil");
      navigate("/login");
    } catch {
      alert("Register gagal");
    }
  };

  return (
    <div className="form-box">
      <h2>Register</h2>

      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Nama"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Daftar</button>
      </form>
    </div>
  );
}

export default Register;
