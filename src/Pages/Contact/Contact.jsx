import React, { useState } from "react";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can replace this with axios POST if needed
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you for contacting us. We’ll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 pt-[120px]">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="textarea textarea-bordered w-full h-32"
              placeholder="Write your message..."
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Send Message
          </button>
        </form>

        <div className="text-center mt-8 text-gray-600">
          <p>📍 123 Ocean View Road, Cox’s Bazar</p>
          <p>📞 +880 1234-567890</p>
          <p>✉️ support@hotelmotel.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;

