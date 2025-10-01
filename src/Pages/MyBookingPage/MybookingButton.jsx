import axios from "axios";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyBookingButton = ({ booking }) => {
  const { user } = useContext(AuthContext);
  const [localBooking, setLocalBooking] = useState(booking);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [review, setReview] = useState("");

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

      await axios.patch(`http://localhost:5000/rooms/${booking._id}`, {
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
      await axios.patch(`http://localhost:5000/rooms/${booking._id}`, {
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

  // ---------- Submit Review ----------
  const handleSubmitReview = async () => {
    if (!review.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Empty Review",
        text: "Please write something before submitting.",
      });
      return;
    }

    try {
      await axios.post(`http://localhost:5000/reviews`, {
        bookingId: booking._id,
        user: user?.displayName,
        email: user?.email,
        review,
      });

      setReview("");
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

  return (
    <>
      {!availability && localBooking.bookedDate && (
        <p className="text-red-600 text-sm mt-2">
          Booked for: {new Date(localBooking.bookedDate).toLocaleDateString()}
        </p>
      )}

      {/* Action Buttons */}
      {!availability && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setIsCancelModalOpen(true)}
            className="btn btn-secondary bg-red-600 text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => setIsDateModalOpen(true)}
            className="btn btn-secondary bg-blue-600 text-white"
          >
            Update Date
          </button>
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="btn btn-secondary bg-green-600 text-white"
          >
            Review
          </button>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to cancel this booking?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsCancelModalOpen(false)}
                className="btn btn-secondary bg-gray-400 text-white"
              >
                Don’t Cancel
              </button>
              <button
                onClick={handleConfirmCancel}
                className="btn btn-primary bg-red-600 text-white"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Date Modal */}
      {isDateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Update Booking Date</h2>
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
                className="btn btn-secondary bg-gray-400 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateDate}
                className="btn btn-primary bg-blue-600 text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 text-center">
            <h2 className="text-lg font-semibold mb-4">Leave a Review</h2>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="border rounded w-full p-2 mb-4"
              rows="4"
              placeholder="Write your review..."
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="btn btn-secondary bg-gray-400 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="btn btn-primary bg-green-600 text-white"
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
