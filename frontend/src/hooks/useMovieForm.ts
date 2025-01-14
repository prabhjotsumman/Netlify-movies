import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

import { addMovie, updateMovie, Movie } from "../reducers/movieSlice";

import { fetchActors, Actor, deleteActor } from "../reducers/actorSlice";

import {
  deleteProducer,
  fetchProducers,
  Producer,
} from "../reducers/producerSlice";
import React from "react";

interface UseMovieFormProps {
  initialMovie?: Movie | null;
  mode: "add" | "edit";
  onCancel: () => void;
}

const useMovieForm = ({
  initialMovie = null,
  mode,
  onCancel,
}: UseMovieFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  // State for the movie form
  const [movie, setMovie] = useState<Movie>(
    initialMovie || {
      name: "",
      year: 2000,
      plot: "",
      producer: {} as Producer,
      actors: [],
    }
  );

  const [selectedActors, setSelectedActors] = useState<Actor[]>(
    initialMovie?.actors || []
  );
  const [selectedProducer, setSelectedProducer] = useState<Producer[]>(
    initialMovie?.producer ? [initialMovie.producer] : []
  );

  // Fetch actors and producers from the store
  const actors = useSelector((state: RootState) => state.actors.actors);
  const producers = useSelector(
    (state: RootState) => state.producers.producers
  );

  useEffect(() => {
    dispatch(fetchActors());
    dispatch(fetchProducers());
  }, [dispatch]);

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !movie.name ||
      !movie.year ||
      !movie.plot ||
      !selectedActors.length ||
      !selectedProducer.length
    )
      return;

    const actorIds = selectedActors.map((actor) => actor._id);
    const producer = selectedProducer[0];

    const movieData: Movie = {
      ...movie,
      producer,
      actors: actorIds as any, // Adjust if necessary
    };

    if (mode === "add") {
      dispatch(addMovie(movieData));
      resetForm();
    } else if (mode === "edit" && movie._id) {
      dispatch(updateMovie({ ...movieData, _id: movie._id }));
      onCancel();
    }
  };

  // Reset form for adding a new movie
  const resetForm = () => {
    setMovie({
      name: "",
      year: 2000,
      plot: "",
      producer: {} as Producer,
      actors: [],
    });
    setSelectedActors([]);
    setSelectedProducer([]);
  };

  // Handlers for adding and deleting actors/producers
  const handleNewActor = (newActor: Actor) => {
    setSelectedActors((prev) => [...prev, newActor]);
  };

  const handleDeleteActorFromDatabase = (option: Actor) => {
    dispatch(deleteActor(option._id as string));
  };

  const handleDeleteProducerFromDatabase = (option: Producer) => {
    dispatch(deleteProducer(option._id as string));
  };

  return {
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
  };
};

export { useMovieForm };
