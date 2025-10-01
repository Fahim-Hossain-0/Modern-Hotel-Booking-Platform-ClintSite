import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import Rating from "react-rating-stars-component";
import Swal from "sweetalert2";

const ReviewModal = ({ roomId, isOpen, onClose }) => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!rating || !comment.trim()) {
      Swal.fire("Warning", "Please provide rating and comment", "warning");
      return;
    }

    try {
      await axios.patch(`http://localhost:5000/rooms/${roomId}/reviews`, {
        user: user?.displayName,
        rating,
        comment,
      });

      Swal.fire("Success", "Review submitted successfully!", "success");
      onClose();
      setRating(0);
      setComment("");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to submit review", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Give Review</h2>

        <div className="mb-2">
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="border w-full px-2 py-1 rounded bg-gray-100"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium">Rating</label>
          <Rating
            count={5}
            value={rating}
            onChange={(newRating) => setRating(newRating)}
            size={30}
            activeColor="#ffd700"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border w-full p-2 rounded"
            rows="3"
          ></textarea>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="btn bg-gray-400 text-white">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn bg-green-600 text-white">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
