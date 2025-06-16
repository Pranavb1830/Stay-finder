import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react"; // ✅ Import useEffect

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ListingDetails from "./pages/ListingDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  useEffect(() => {
    document.title = "Stay Finder";
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;