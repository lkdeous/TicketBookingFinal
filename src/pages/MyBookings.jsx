import React, { useEffect, useState } from "react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user || user.role !== "user") return;

    const allBookings = JSON.parse(localStorage.getItem("bookings")) || {};
    const moviesList = JSON.parse(localStorage.getItem("movies")) || [];
    const userBookings = [];

    Object.keys(allBookings).forEach((movieId) => {
      const movieData = moviesList.find((m) => m.id === Number(movieId));
      const userSeats = allBookings[movieId][user.username]?.seats;

      if (movieData && userSeats && Array.isArray(userSeats) && userSeats.length > 0) {
        userBookings.push({ movie: movieData, seats: userSeats });
      }
    });

    setBookings(userBookings);
  }, []);

  if (!user || user.role !== "user") return <p>Сначала войдите как пользователь</p>;

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.length === 0 && <p>У вас пока нет бронирований</p>}
      <ul className="list-group">
        {bookings.map((b, index) => (
          <li key={index} className="list-group-item">
            <strong>Фильм:</strong> {b.movie.title} <br />
            <strong>Места:</strong> {b.seats.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyBookings;
