import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { isLogin, getRole, logoutUser, getUser } from "../services/auth";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const user = getUser() || {};

  const logout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>Kicau Mania Store</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>

        {isLogin() && getRole()?.includes("USER") && (
          <>
            <Link to="/cart">Cart</Link>

            <div className="profile-menu">
              <img
                src={user.photo || "https://i.imgur.com/HeIi0wU.png"}
                alt=""
                className="nav-avatar"
                onClick={() => setOpen(!open)}
              />

              {open && (
                <div className="profile-dropdown">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>

                  <Link to="/profile">My Profile</Link>
                  <Link to="/history">Order History</Link>

                  <button onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          </>
        )}

        {!isLogin() && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {isLogin() && getRole()?.includes("ADMIN") && (
          <Link to="/admin">Dashboard</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
