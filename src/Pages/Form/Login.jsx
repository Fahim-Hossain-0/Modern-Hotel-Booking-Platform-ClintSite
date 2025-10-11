import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
// import axios from "axios";
import Loading from "../../Components/Loading";
import { FaRegEye, FaRegEyeSlash, FaGoogle } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Login = () => {
  const axiosSecure = useAxiosSecure()
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

      await axiosSecure.patch("/users", {
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
      await axiosSecure.post("/users", {
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
    <div className="relative p-6 max-w-md mx-auto shadow-lg space-y-4 rounded-xl mt-24">
      <h2 className="text-2xl font-bold text-center">Login</h2>

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


      {/* Google */}
<button
onClick={handleGoogleLogin}
 className="btn bg-white text-black border-[#e5e5e5] w-full text-lg">
  <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
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
