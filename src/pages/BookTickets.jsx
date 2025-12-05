import React from "react";

function BookTickets() {
  const booking = JSON.parse(localStorage.getItem("selectedSeats"));

  if (!booking) {
    return <p>No booking found.</p>;
  }

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
