import axios from "axios";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

const MyBookingButton = ({ booking }) => {
  const { user } = useContext(AuthContext);
  const [localBooking, setLocalBooking] = useState(booking);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { availability, name } = localBooking;

  // open modal for cancel confirmation
  const handleCancelClick = () => setIsModalOpen(true);

  // close modal without cancelling
  const handleCloseModal = () => setIsModalOpen(false);

  // confirm cancellation
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

      setIsModalOpen(false);

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

  return (
    <>
      {!availability && localBooking.bookedDate && (
        <p className="text-red-600 text-sm mt-2">
          Booked for: {new Date(localBooking.bookedDate).toLocaleDateString()}
        </p>
      )}

      {/* Show "Not Available" button if already booked */}
      {!availability && (
        <button
          onClick={handleCancelClick}
          className="btn btn-secondary mt-4 bg-red-600 text-white"
        >
          Cancel
        </button>
      )}

      {/* Cancel Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to cancel this booking?
            </h2>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleCloseModal}
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
    </>
  );
};

export default MyBookingButton;
