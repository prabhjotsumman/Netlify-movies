import React from "react";
import { useMovieScreen } from "../../hooks/useMovieScreen"; 

import MovieForm from "../MovieForm/MovieForm";

import "./MovieScreen.css";

const MovieScreen = () => {
  const {
    movies,
    loading,
    error,
    editMovie,
    showForm,
    handleEditClick,
    handleAddClick,
    handleDeleteClick,
    handleCancel,
  } = useMovieScreen();

  return (
    <div className="movie-list-container">
      <h1 className="page-title">Movies</h1>
      {loading && <div className="loading">Loading...</div>}
      {error && !loading && <div className="error">Error: {error}</div>}

      <div className="movie-list-items">
        {movies?.map((movie) => (
          <div key={movie._id} className="movie-item">
            <div className="movie-poster">
              <img
                src={`https://picsum.photos/300/300?random=${movie._id}`}
                alt={`${movie.name} Poster`}
                className="poster-image"
              />
            </div>
            <div className="movie-details">
              <span className="movie-name">{movie.name}</span>
              <span className="movie-year">Year: {movie.year}</span>
              <span className="movie-producer">
                Producer: {movie.producer.name}
              </span>
              <span className="movie-actors">
                Actors: {movie.actors.map((actor) => actor.name).join(", ")}
              </span>
              <div className="buttons">
                <button
                  onClick={() => handleEditClick(movie)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(movie._id as string)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="add-new-movie-container">
        <button type="button" onClick={handleAddClick}>
          Add a new Movie
        </button>
      </div>

      {showForm && editMovie && (
        <MovieForm
          initialMovie={editMovie}
          mode="edit"
          onCancel={handleCancel}
        />
      )}

      {!editMovie && showForm && (
        <MovieForm mode="add" onCancel={handleCancel} />
      )}
    </div>
  );
};

export default React.memo(MovieScreen);
