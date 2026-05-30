import "./Navbar.css";
import GlassSurface from "../GlassSurface/GlassSurface";

function Navbar2() {
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


          <button className="nav-btn">
            Notifications
          </button>
          <button className="nav-btn">
            Settings
          </button>
          <button className="nav-btn">
            User Profile
          </button>

        </div>

      </nav>
    </GlassSurface>
  );
}

export default Navbar2;