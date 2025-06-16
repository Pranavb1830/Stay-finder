import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");


  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Home</Link> |{" "}
      {token ? (
        <>
          <Link to="/dashboard">Dashboard</Link> |{" "}
        </>
      ) : (
        <>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
