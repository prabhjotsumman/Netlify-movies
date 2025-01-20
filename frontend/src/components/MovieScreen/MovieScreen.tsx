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

      {/* Display loading state */}
      {loading && <div className="loading" role="status" aria-live="polite">Loading...</div>}

      {/* Display error state */}
      {error && !loading && <div className="error" role="alert">Error: {error}</div>}

      <div className="movie-list-items">
        {movies?.map((movie) => (
          <div key={movie._id} className="movie-item" role="listitem">
            <div className="movie-poster">
              <React.Suspense fallback={<div>Loading...</div>}>
                <img
                  src={`https://picsum.photos/300/300?random=${movie._id}`}
                  alt={`${movie.name} Poster`}
                  className="poster-image"
                  loading="lazy"
                />
              </React.Suspense>
            </div>
            <div className="movie-details">
              <span className="movie-name">
                {movie.name.length > 20
                  ? `${movie.name.substring(0, 20)}...`
                  : movie.name}
              </span>
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
                  aria-label={`Edit ${movie.name}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(movie._id as string)}
                  className="delete-button"
                  aria-label={`Delete ${movie.name}`}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add new movie button */}
      <div className="add-new-movie-container">
        <button type="button" onClick={handleAddClick} aria-label="Add a new Movie">
          Add a new Movie!!
        </button>
      </div>

      {/* Movie form for editing */}
      {showForm && editMovie && (
        <MovieForm
          initialMovie={editMovie}
          mode="edit"
          onCancel={handleCancel}
        />
      )}

      {/* Movie form for adding */}
      {!editMovie && showForm && (
        <MovieForm mode="add" onCancel={handleCancel} />
      )}
    </div>
  );
};

export default React.memo(MovieScreen);
