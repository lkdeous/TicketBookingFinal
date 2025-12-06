import React, { useState, useEffect } from "react";

function Admin() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState("");
  const [movies, setMovies] = useState([]);
  const [allBookings, setAllBookings] = useState([]);

  // Загружаем фильмы
  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    setMovies(savedMovies);
  }, []);

  // Загружаем все брони пользователей
  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || {};
    const moviesList = JSON.parse(localStorage.getItem("movies")) || [];
    const bookingsArray = [];

    Object.keys(bookings).forEach((movieId) => {
      const movieData = moviesList.find((m) => m.id === Number(movieId));
      if (!movieData) return;

      const usersBookings = bookings[movieId];
      Object.keys(usersBookings).forEach((username) => {
        const seats = usersBookings[username]?.seats;
        if (seats && seats.length > 0) {
          bookingsArray.push({
            movie: movieData.title,
            user: username,
            seats: seats,
          });
        }
      });
    });

    setAllBookings(bookingsArray);
  }, []);

  // Добавление нового фильма
  const handleAddMovie = () => {
    if (!title || !description || !date || !time || !image) {
      alert("Заполните все поля!");
      return;
    }

    const newMovie = {
      id: Date.now(),
      title,
      description,
      date,
      time,
      image,
    };

    const updatedMovies = [...movies, newMovie];
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));

    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
    setImage("");
  };

  // Удаление фильма
  const handleDeleteMovie = (id) => {
    if (!window.confirm("Вы точно хотите удалить этот фильм?")) return;

    const updatedMovies = movies.filter((movie) => movie.id !== id);
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      {/* Форма добавления фильма */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Title"
          className="form-control mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="form-control mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          className="form-control mb-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          className="form-control mb-2"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="form-control mb-2"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button className="btn btn-success mb-3" onClick={handleAddMovie}>
          Add Movie
        </button>
      </div>

      {/* Список фильмов */}
      <h4>Current Movies:</h4>
      <ul className="list-group mb-4">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              {movie.title} | {movie.date} {movie.time}
            </span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDeleteMovie(movie.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Список всех бронирований */}
      <h4>All User Bookings:</h4>
      {allBookings.length === 0 && <p>Нет бронирований</p>}
      <ul className="list-group">
        {allBookings.map((b, index) => (
          <li key={index} className="list-group-item">
            <strong>Фильм:</strong> {b.movie} <br />
            <strong>Пользователь:</strong> {b.user} <br />
            <strong>Места:</strong> {b.seats.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
