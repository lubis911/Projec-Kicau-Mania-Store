import { Navigate } from "react-router-dom";
import { isLogin, getRole } from "../services/auth";

function ProtectedRoute({ children, role }) {
  if (!isLogin()) {
    return <Navigate to="/login" />;
  }

  if (role && getRole() !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
