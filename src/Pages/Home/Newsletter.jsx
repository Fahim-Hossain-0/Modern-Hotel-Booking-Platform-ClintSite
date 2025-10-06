import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email");
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <div className="w-[70%] mx-auto bg-white py-24 px-4 rounded md:px-20 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Subscribe to Our Newsletter
      </h2>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        Stay updated with our latest offers, exclusive discounts, and travel tips.
        Subscribe today and make your stay unforgettable!
      </p>
      <form
        onSubmit={handleSubscribe}
        className="flex flex-col md:flex-row items-center justify-center gap-3"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full md:w-96"
          required
        />
        <button type="submit" className="btn bg-[#FF6B6B] w-full md:w-auto">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
