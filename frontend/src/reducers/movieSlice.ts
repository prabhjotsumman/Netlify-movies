import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Producer } from "./producerSlice";
import { Actor } from "./actorSlice";
import { API_MOVIES_ENDPOINT } from "../constants";

// Define movie interface
export interface Movie {
  _id?: string;
  name: string;
  plot: string;
  poster?: string;
  year: number;
  producer: Producer;
  actors: Actor[];
}

// Define the state for the movie slice
interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
};

// Fetch all movies
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_MOVIES_ENDPOINT + "/getMovies");
      return response.data; // the data containing the list of movies
    } catch (error: any) {
      return rejectWithValue(error.message || "Error fetching movies");
    }
  }
);

// Add a new movie
export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (movieData: Movie, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_MOVIES_ENDPOINT + "/addMovie", movieData);
      return response.data; // the newly created movie
    } catch (error: any) {
      return rejectWithValue(error.message || "Error adding movie");
    }
  }
);

// Update an existing movie
export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async (movieData: Movie, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_MOVIES_ENDPOINT}/updateMovie/${movieData._id}`,
        movieData
      );
      return response.data; // the updated movie
    } catch (error: any) {
      return rejectWithValue(error.message || "Error updating movie");
    }
  }
);

// Delete a movie
export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (movieId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_MOVIES_ENDPOINT}/deleteMovie/${movieId}`);
      return movieId; // return the movieId to remove it from the state
    } catch (error: any) {
      return rejectWithValue(error.message || "Error deleting movie");
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // Local reducer for movie state manipulation
    resetState(state) {
      state.movies = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchMovies async action
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.loading = false;
          state.movies = action.payload;
        }
      )
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle addMovie async action
      .addCase(addMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.loading = false;
        state.movies.push(action.payload);
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle updateMovie async action
      .addCase(updateMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.loading = false;
        const index = state.movies.findIndex(
          (movie) => movie._id === action.payload._id
        );
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle deleteMovie async action
      .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteMovie.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.movies = state.movies.filter(
            (movie) => movie._id !== action.payload
          );
        }
      )
      .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { resetState } = movieSlice.actions;

export default movieSlice.reducer;
