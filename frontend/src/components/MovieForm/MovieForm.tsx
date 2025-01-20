import React from "react";
import { useMovieForm } from "../../hooks";
import { Movie } from "../../reducers/movieSlice";

import "./AddMovie.css";
import "./MovieForm.css";
import AddProducer from "../AddProducer/AddProducer";
import AddActor from "../AddActor/AddActor";
import MultiSelect from "../common/MultiSelect/MultiSelect";

interface MovieFormProps {
  initialMovie?: Movie | null;
  mode: "add" | "edit";
  onCancel: () => void;
}

const MovieForm: React.FC<MovieFormProps> = ({
  initialMovie,
  mode,
  onCancel,
}) => {
  const {
    movie,
    setMovie,
    selectedActors,
    setSelectedActors,
    selectedProducer,
    setSelectedProducer,
    actors,
    producers,
    handleSubmit,
    handleNewActor,
    handleDeleteActorFromDatabase,
    handleDeleteProducerFromDatabase,
    errors,
    validateForm,
  } = useMovieForm({ initialMovie, mode, onCancel });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e);
    }
  };

  return (
    <div className="movie-form-container">
      <h2>{mode === "add" ? "Add New Movie" : "Edit Movie"}</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-row">
          <label htmlFor="movie-name">Movie Name</label>
          <input
            id="movie-name"
            type="text"
            placeholder="Movie Name"
            value={movie.name}
            onChange={(e) => setMovie({ ...movie, name: e.target.value })}
            aria-required="true"
          />
          {errors.name && (
            <span className="error" role="alert">
              {errors.name}
            </span>
          )}
          <label htmlFor="movie-year">Year</label>
          <input
            id="movie-year"
            type="number"
            placeholder="Year"
            value={movie.year}
            onChange={(e) =>
              setMovie({ ...movie, year: parseInt(e.target.value, 10) })
            }
            aria-required="true"
          />
          {errors.year && (
            <span className="error" role="alert">
              {errors.year}
            </span>
          )}
        </div>
        <label htmlFor="movie-plot">Plot</label>
        <textarea
          id="movie-plot"
          placeholder="Plot"
          className="input-plot"
          value={movie.plot}
          onChange={(e) => setMovie({ ...movie, plot: e.target.value })}
          aria-required="true"
        />
        {errors.plot && (
          <span className="error" role="alert">
            {errors.plot}
          </span>
        )}

        <MultiSelect
          title="Actors"
          options={actors}
          selectedOptions={selectedActors}
          setSelectedOptions={setSelectedActors}
          multiple
          onItemDelete={handleDeleteActorFromDatabase}
        />
        {errors.actors && (
          <span className="error" role="alert">
            {errors.actors}
          </span>
        )}

        <AddActor onActorAdded={handleNewActor} />

        <MultiSelect
          title="Producer"
          options={producers}
          selectedOptions={selectedProducer}
          setSelectedOptions={setSelectedProducer}
          onItemDelete={handleDeleteProducerFromDatabase}
        />
        {errors.producer && (
          <span className="error" role="alert">
            {errors.producer}
          </span>
        )}
        <AddProducer />

        <button
          type="submit"
          disabled={
            !movie.name ||
            !movie.year ||
            !movie.plot ||
            !selectedActors.length ||
            !selectedProducer.length
          }
        >
          {mode === "add" ? "Add Movie" : "Save Changes"}
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default React.memo(MovieForm);
