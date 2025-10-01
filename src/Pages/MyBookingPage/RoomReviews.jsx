import React, { useEffect, useState } from "react";
import axios from "axios";

const RoomReviews = ({ roomId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/rooms/${roomId}`)
      .then(res => setReviews(res.data.reviews || []))
      .catch(err => console.error(err));
  }, [roomId]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((review, idx) => (
          <div key={idx} className="border p-3 rounded mb-2">
            <h3 className="font-bold">{review.user}</h3>
            <p>⭐ {review.rating}/5</p>
            <p>{review.comment}</p>
            {review.timestamp && (
              <small className="text-gray-500">
                {new Date(review.timestamp).toLocaleString()}
              </small>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default RoomReviews;
