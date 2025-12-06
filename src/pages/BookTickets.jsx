import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BookTickets() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const b = JSON.parse(localStorage.getItem("selectedSeats"));
    if (!b) navigate("/browse-movies");
    else setBooking(b);
  }, [navigate]);

  if (!booking) return null;

  return (
    <div>
      <h2>Booking Confirmation</h2>
      <p>Movie: {booking.movie.title}</p>
      <p>Seats: {booking.seats.join(", ")}</p>
      <p className="text-success">Your booking has been saved!</p>
    </div>
  );
}

export default BookTickets;
