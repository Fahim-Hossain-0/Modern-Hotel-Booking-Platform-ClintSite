import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";
import Loading from "../../Components/Loading";
import { FaRegEye, FaRegEyeSlash, FaGoogle } from "react-icons/fa";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext); // add googleSignIn in your AuthProvider
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ---------- Normal Login ----------
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userCredential = await loginUser(email, password);
      const user = userCredential.user;

      await axios.patch("http://localhost:5000/users", {
        email: user.email,
        uid: user.uid,
        provider: "password",
        lastLogin: new Date(),
      });

      Swal.fire({
        icon: "success",
        title: "Welcome back!",
        timer: 1200,
        showConfirmButton: false,
      });

      navigate(location.state ? location.state : "/");
    } catch (err) {
      setError(err.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  // ---------- Google Login ----------
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await googleLogin();
      const user = result.user;

      // Send Google login data to backend
      await axios.post("http://localhost:5000/users", {
        email: user.email,
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: "google",
        lastLogin: new Date(),
      });

      Swal.fire({
        icon: "success",
        title: "Signed in with Google!",
        timer: 1200,
        showConfirmButton: false,
      });

      navigate(location.state ? location.state : "/");
    } catch (err) {
      setError("Google login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-6 max-w-md mx-auto shadow-lg space-y-4 rounded-xl">
      <h2 className="text-2xl font-bold">Login</h2>

      {loading && (
        <div className="absolute inset-0 flex justify-center items-center z-50">
          <Loading />
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full p-2 rounded text-white bg-blue-600"
        >
          Login
        </button>
      </form>

      {error && <p className="text-red-600 mt-2 text-center">{error}</p>}

      <div className="divider">OR</div>

      {/* Google Button */}
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2 p-2 border rounded hover:bg-gray-100"
      >
        <FaGoogle className="text-red-500" /> Continue with Google
      </button>

      <p className="text-center mt-3">
        Don’t have an account?{" "}
        <Link to="/auth/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
