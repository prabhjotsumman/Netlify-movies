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

const sampleMovies: Movie[] = [
  {
    _id: "1",
    name: "Inception",
    year: 2010,
    producer: {
      name: "Emma Thomas",
      bio: "British film producer",
      gender: "Female",
      dob: "1968-12-09",
    },
    actors: [
      {
        name: "Leonardo DiCaprio",
        bio: "American actor and film producer",
        gender: "Male",
        dob: "1974-11-11",
      },
      {
        name: "Joseph Gordon-Levitt",
        bio: "American actor and filmmaker",
        gender: "Male",
        dob: "1981-02-17",
      },
    ],
    plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
  },
  {
    _id: "2",
    name: "The Dark Knight and his wife and 2 children, 5 grand children and 7 uncles",
    year: 2008,
    producer: {
      name: "Christopher Nolan",
      bio: "British-American film director, producer, and screenwriter",
      gender: "Male",
      dob: "1970-07-30",
    },
    actors: [
      {
        name: "Christian Bale",
        bio: "Welsh actor",
        gender: "Male",
        dob: "1974-01-30",
      },
      {
        name: "Heath Ledger",
        bio: "Australian actor and music video director",
        gender: "Male",
        dob: "1979-04-04",
      },
    ],
    plot: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
  },
  {
    _id: "3",
    name: "Interstellar",
    year: 2014,
    producer: {
      name: "Emma Thomas",
      bio: "British film producer",
      gender: "Female",
      dob: "1968-12-09",
    },
    actors: [
      {
        name: "Matthew McConaughey",
        bio: "American actor and producer",
        gender: "Male",
        dob: "1969-11-04",
      },
      {
        name: "Anne Hathaway",
        bio: "American actress",
        gender: "Female",
        dob: "1982-11-12",
      },
    ],
    plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    _id: "4",
    name: "The Matrix",
    year: 1999,
    producer: {
      name: "Joel Silver",
      bio: "American film producer",
      gender: "Male",
      dob: "1952-07-14",
    },
    actors: [
      {
        name: "Keanu Reeves",
        bio: "Canadian actor",
        gender: "Male",
        dob: "1964-09-02",
      },
      {
        name: "Laurence Fishburne",
        bio: "American actor, playwright, producer, screenwriter, and film director",
        gender: "Male",
        dob: "1961-07-30",
      },
    ],
    plot: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
  },
  {
    _id: "5",
    name: "Gladiator",
    year: 2000,
    producer: {
      name: "Douglas Wick",
      bio: "American film producer",
      gender: "Male",
      dob: "1954-04-07",
    },
    actors: [
      {
        name: "Russell Crowe",
        bio: "New Zealand actor, film producer, and musician",
        gender: "Male",
        dob: "1964-04-07",
      },
      {
        name: "Joaquin Phoenix",
        bio: "American actor, producer, and activist",
        gender: "Male",
        dob: "1974-10-28",
      },
    ],
    plot: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
  },
];

const useMovieScreen = (): UseMovieScreenReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: any) => state.movies);
  const movies = sampleMovies;

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

export default useMovieScreen;