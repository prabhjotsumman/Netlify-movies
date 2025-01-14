import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, Movie, deleteMovie } from "../reducers/movieSlice";
import { AppDispatch } from "../store";

interface UseMovieScreenReturn {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  editMovie: Movie | null;
  showForm: boolean;
  handleEditClick: (movie: Movie) => void;
  handleAddClick: () => void;
  handleDeleteClick: (id: string) => void;
  handleCancel: () => void;
}

export const useMovieScreen = (): UseMovieScreenReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error } = useSelector((state: any) => state.movies);

  const [editMovie, setEditMovie] = useState<Movie | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchMovies()); // Fetch movies on mount
  }, [dispatch]);

  const handleEditClick = (movie: Movie) => {
    setEditMovie(movie);
    setShowForm(true);
  };

  const handleAddClick = () => {
    setEditMovie(null);
    setShowForm(true);
  };

  const handleDeleteClick = (id: string) => {
    dispatch(deleteMovie(id));
  };

  const handleCancel = () => {
    setEditMovie(null);
    setShowForm(false);
  };

  return {
    movies,
    loading,
    error,
    editMovie,
    showForm,
    handleEditClick,
    handleAddClick,
    handleDeleteClick,
    handleCancel,
  };
};
