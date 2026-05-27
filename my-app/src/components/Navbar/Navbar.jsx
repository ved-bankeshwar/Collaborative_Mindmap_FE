import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      {/* Left Side */}
      <div className="navbar-left">
        <h2 className="logo">
          Site Name
        </h2>
      </div>

      {/* Right Side */}
      <div className="nav-links">

        <a href="/">Page</a>

        <a href="/">Page</a>

        <a href="/">Page</a>

        <button className="nav-btn">
          Button
        </button>

      </div>

    </nav>
  );
}

export default Navbar;