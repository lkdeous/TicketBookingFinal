import React, { useState, useEffect } from "react";

function Admin() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Загружаем фильмы из localStorage при старте
  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    setMovies(savedMovies);
  }, []);

  const handleAddMovie = () => {
    if (!title || !description) return;

    const newMovie = {
      id: Date.now(),
      title,
      description,
    };

    const updatedMovies = [...movies, newMovie];
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));

    // Сброс формы
    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div className="mb-4">
        <h4>Add a New Movie</h4>
        <input
          type="text"
          placeholder="Title"
          className="form-control mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="form-control mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleAddMovie}>
          Add Movie
        </button>
      </div>

      <h4>Existing Movies</h4>
      <ul className="list-group">
        {movies.map((movie) => (
          <li key={movie.id} className="list-group-item">
            {movie.title} - {movie.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
