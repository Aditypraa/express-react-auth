import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Register from "../pages/auth/register";
import Login from "../pages/auth/login";

function AuthRoute() {
  const { isAuthenticated } = useContext(AuthContext); //mengambil nilai isAuthenticated dari AuthContext

  return (
    <Routes>
      <Route
        path="/register"
        element={
          isAuthenticated ? ( //jika isAuthenticated bernilai true, maka akan diarahkan ke halaman dashboard
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <Register /> //jika isAuthenticated bernilai false, maka akan diarahkan ke halaman register
          )
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <Login />
          ) //jika isAuthenticated bernilai true, maka akan diarahkan ke halaman dashboard, jika false maka akan diarahkan ke halaman login
        }
      />
    </Routes>
  );
}

export default AuthRoute;
