import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Navbar from "../components/Navbar";
import AuthRoute from "./AuthRoute";
import AdminRoute from "./AdminRoute";

export default function AppRoutes() {
  //destructure context "isAuthenticated"

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth/*" element={<AuthRoute />} />
        <Route path="admin/*" element={<AdminRoute />} />
      </Routes>
    </>
  );
}
