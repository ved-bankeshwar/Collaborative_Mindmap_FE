import "./Navbar.css";
import GlassSurface from "../GlassSurface/GlassSurface";

function Navbar() {
  return (
    <GlassSurface
      width="100%"
      height={80}
      borderRadius={0}
      className="glass-navbar"
    >
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
    </GlassSurface>
  );
}

export default Navbar;