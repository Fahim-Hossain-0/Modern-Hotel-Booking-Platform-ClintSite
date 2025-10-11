// import axios from "axios";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyBookingButton = ({ booking }) => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure()
    const [localBooking, setLocalBooking] = useState(booking);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { availability, name } = localBooking;

    // ---------- Cancel Booking ----------
    const handleConfirmCancel = async () => {
        try {
            if (availability) {
                Swal.fire({
                    icon: "warning",
                    title: "Room Not Booked",
                    text: "This room is already available, nothing to cancel!",
                });
                return;
            }

            await axiosSecure.patch(`/rooms/${booking._id}`, {
                availability: true,
                bookedDate: null,
                bookedBy: null,
                email: null,
            });

            setLocalBooking((prev) => ({
                ...prev,
                availability: true,
                bookedDate: null,
                bookedBy: null,
                email: null,
            }));

            setIsCancelModalOpen(false);

            Swal.fire({
                icon: "success",
                title: "Booking Cancelled",
                text: `${name} booking has been cancelled successfully!`,
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error("Cancel booking failed:", error);
            Swal.fire({
                icon: "error",
                title: "Cancel Failed",
                text: "There was an issue cancelling the booking. Please try again later.",
            });
        }
    };

    // ---------- Update Booking Date ----------
    const handleUpdateDate = async () => {
        if (!selectedDate) {
            Swal.fire({
                icon: "warning",
                title: "No Date Selected",
                text: "Please pick a new date before updating.",
            });
            return;
        }

        try {
            await axiosSecure.patch(`/rooms/${booking._id}`, {
                
                bookedDate: selectedDate,
            });

            setLocalBooking((prev) => ({
                ...prev,
                bookedDate: selectedDate,
            }));

            setIsDateModalOpen(false);

            Swal.fire({
                icon: "success",
                title: "Date Updated",
                text: `${name} booking date updated successfully!`,
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error("Update date failed:", error);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: "There was an issue updating the booking date. Please try again later.",
            });
        }
    };

    

  const handleSubmitReview = async () => {
      if (!rating || !comment.trim()) {
          Swal.fire({
              icon: "warning",
              title: "Incomplete Review",
              text: "Please add both rating and comment.",
          });
          return;
      }

      const newReview = {
          user: user?.displayName,
          rating,
          comment,
          timestamp: new Date(),
      };

      try {
          // Send to backend to add to reviews array
         await axiosSecure.post(`/rooms/review/${booking._id}`, {
             review: newReview,
         });




          // Update local state to show immediately
          setLocalBooking((prev) => ({
              ...prev,
              reviews: [...(prev.reviews || []), newReview],
          }));

          setComment("");
          setRating(0);
          setIsReviewModalOpen(false);

          Swal.fire({
              icon: "success",
              title: "Review Submitted",
              text: "Thank you for your feedback!",
              timer: 2000,
              showConfirmButton: false,
          });
      } catch (error) {
          console.error("Review failed:", error);
          Swal.fire({
              icon: "error",
              title: "Submit Failed",
              text: "There was an issue submitting your review. Please try again later.",
          });
      }
  };
const isBookedByCurrentUser = localBooking.email === user?.email;
  
  
    return (
        <>
            {/* Action Buttons */}
            {!availability && isBookedByCurrentUser && (
                <div className="flex flex-col md:flex-row gap-2 mt-4">
                    <button
                        onClick={() => setIsCancelModalOpen(true)}
                        className="btn bg-red-600 text-white"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => setIsDateModalOpen(true)}
                        className="btn bg-blue-600 text-white"
                    >
                        Update Date
                    </button>
                    <button
                        onClick={() => setIsReviewModalOpen(true)}
                        className="btn bg-green-600 text-white"
                    >
                        Review
                    </button>
                </div>
            )}

            {/* Cancel Modal */}
            {isCancelModalOpen && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-[3px] flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-80 text-center">
                        <h2 className="text-lg font-semibold mb-4">
                            Are you sure you want to cancel this booking?
                        </h2>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setIsCancelModalOpen(false)}
                                className="btn bg-gray-400 text-white"
                            >
                                Don’t Cancel
                            </button>
                            <button
                                onClick={handleConfirmCancel}
                                className="btn bg-red-600 text-white"
                            >
                                Confirm Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Date Modal */}
            {isDateModalOpen && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-[3px] flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-80 text-center">
                        <h2 className="text-lg font-semibold mb-4">
                            Update Booking Date
                        </h2>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            className="border rounded px-2 py-1 w-full mb-4"
                            placeholderText="Pick a new date"
                        />
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setIsDateModalOpen(false)}
                                className="btn bg-gray-400 text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateDate}
                                className="btn bg-blue-600 text-white"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Review Modal */}
            {isReviewModalOpen && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-[3px] flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-lg font-semibold mb-4 text-center">
                            Leave a Review
                        </h2>

                        {/* Username */}
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">
                                User
                            </label>
                            <input
                                type="text"
                                value={user?.displayName || "Anonymous"}
                                readOnly
                                className="border rounded w-full p-2 bg-gray-100"
                            />
                        </div>

                        {/* Rating */}
                        <div className="mb-3 text-center">
                            <label className="block text-sm font-medium mb-2">
                                Rating
                            </label>
                            <Rating
                                style={{ maxWidth: 150 }}
                                value={rating}
                                onChange={setRating}
                            />
                        </div>

                        {/* Comment */}
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="border rounded w-full p-2 mb-4"
                            rows="4"
                            placeholder="Write your review..."
                        />

                        {/* Buttons */}
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setIsReviewModalOpen(false)}
                                className="btn bg-gray-400 text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitReview}
                                className="btn bg-green-600 text-white"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyBookingButton;
