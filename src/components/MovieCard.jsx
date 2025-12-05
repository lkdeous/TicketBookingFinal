import React from "react";

function MovieCard({ movie }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        <p className="card-text">{movie.description}</p>
      </div>
    </div>
  );
}

export default MovieCard;
