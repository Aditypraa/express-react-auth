import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Dashboard from "../pages/admin/dashboard";
import UsersIndex from "../pages/admin/users";
import UsersCreate from "../pages/admin/users/create";
import UsersEdit from "../pages/admin/users/edit";

function AdminRoute() {
  const { isAuthenticated } = useContext(AuthContext); //mengambil nilai isAuthenticated dari AuthContext

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace /> //jika isAuthenticated bernilai true, maka akan diarahkan ke halaman dashboard, jika false maka akan diarahkan ke halaman login
        }
      />
      <Route
        path="/users"
        element={
          isAuthenticated ? <UsersIndex /> : <Navigate to="/login" replace /> //jika isAuthenticated bernilai true, maka akan diarahkan ke halaman dashboard, jika false maka akan diarahkan ke halaman login
        }
      />
      <Route
        path="/users/create"
        element={
          isAuthenticated ? <UsersCreate /> : <Navigate to="/login" replace /> //jika isAuthenticated bernilai true, maka akan diarahkan ke halaman dashboard, jika false maka akan diarahkan ke halaman login
        }
      />
      <Route
        path="/users/edit/:id"
        element={
          isAuthenticated ? <UsersEdit /> : <Navigate to="/login" replace /> //jika isAuthenticated bernilai true, maka akan diarahkan ke halaman dashboard, jika false maka akan diarahkan ke halaman login
        }
      />
    </Routes>
  );
}

export default AdminRoute;
