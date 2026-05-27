import "./Login.css";
import Navbar from "../../components/Navbar/Navbar";
import bgVideo from "../../assets/videos/bgvideo.mp4";
import { useNavigate } from "react-router-dom"; 

function Login() {
  const navigate = useNavigate(); 

  const handleLogin = () => {
    // FIX: Changed from "/" to "/dashboard" to match your router!
    navigate("/dashboard"); 
  };

  return (
    <div className="login-page">

      {/* Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Navbar */}
      <Navbar />

      {/* Login Section */}
      <div className="login-container">

        <h1>Site Name</h1>

        <h2>Login</h2>

        <input type="email" placeholder="Enter Email" />

        <input type="password" placeholder="Enter Password" />

        <button className="google-btn" onClick={handleLogin}>
          Sign in with Google
        </button>

        <button className="login-submit-btn" onClick={handleLogin} style={{ marginTop: '10px', width: '100%', padding: '10px', cursor: 'pointer' }}>
          Login
        </button>

        <p>
          Don’t have an account? Sign up here!
        </p>

      </div>
    </div>
  );
}

export default Login;