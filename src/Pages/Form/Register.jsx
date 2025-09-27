import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import Loading from "../../Components/Loading";

const Register = () => {
  const { createUser,googleLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const form = e.target;
    const firstName = form.elements.firstName.value;
    const lastName = form.elements.lastName.value;
    const email = form.elements.email.value;
    const phone = form.elements.phone.value;
    const age = form.elements.age.value;
    const gender = form.elements.gender.value;
    const photoURL = form.elements.photo.value;
    const password = form.elements.password.value;

    try {
      // 1️⃣ Create Firebase user
      const userCredential = await createUser(email, password);
      const user = userCredential.user;

      // 2️⃣ Update profile
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
        photoURL: photoURL,
      });

      // 3️⃣ Send data to backend
      const postData = {
        firstName,
        lastName,
        email,
        password,
        phone,
        age,
        gender,
        photoURL,
      };

      await axios.post("http://localhost:5000/users", postData);

      // 4️⃣ Show success alert
      Swal.fire({
        icon: "success",
        title: "Account created!",
        text: "Welcome to the app.",
        timer: 1200,
        showConfirmButton: false,
      });

      form.reset();
      navigate(location.state ? location.state : "/");

    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError("An account with this email already exists.");
      } else if (err.code === 'auth/weak-password') {
        setError("Password is too weak.");
      } else {
        setError(err.message || "Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  }
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
    <div className="relative p-6 max-w-md mx-auto  shadow-lg space-y-4 rounded-xl">
      <h2 className="text-2xl font-bold">Register</h2>

     {/* Loading overlay */}
  {loading && (
    <div className="absolute inset-0 flex justify-center items-center z-50">
      <Loading />
    </div>
  )}


      <form onSubmit={handleRegister} className="space-y-3">
        <input name="firstName" placeholder="First Name" className="w-full p-2 border rounded" required />
        <input name="lastName" placeholder="Last Name" className="w-full p-2 border rounded" required />
        <input name="email" type="email" placeholder="Email" className="w-full p-2 border rounded" required />
        <input name="phone" placeholder="Phone" className="w-full p-2 border rounded" />
        <input name="age" type="number" placeholder="Age" className="w-full p-2 border rounded" />
        <select name="gender" className="w-full p-2 border rounded">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input name="photo" placeholder="Photo URL" className="w-full p-2 border rounded" />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            required
            placeholder="Password"
            className="w-full p-2 border rounded"
            minLength="6"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
            title="Must be at least 6 characters, including a number, a lowercase and an uppercase letter"
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
      className={`w-full p-2 rounded text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600'}`}
      disabled={loading}
    >
      Register
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

      <p className="text-center">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
