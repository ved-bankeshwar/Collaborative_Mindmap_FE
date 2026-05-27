import "./Login.css";
import Navbar from "../../components/Navbar/Navbar";
import bgVideo from "../../assets/videos/bgvideo.mp4";

function Login() {
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

        <button className="google-btn">
          Sign in with Google
        </button>

        <p>
          Don’t have an account? Sign up here!
        </p>

      </div>
    </div>
  );
}

export default Login;

