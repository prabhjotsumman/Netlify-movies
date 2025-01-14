import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ACTORS_ENDPOINT } from '../constants';

export interface Actor {
    _id?: string;
    name: string;
    dob: string;
    gender: string;
    bio: string;
}

interface ActorState {
    actors: Actor[];
    loading: boolean;
    error: string | null;
}

const initialState: ActorState = {
    actors: [],
    loading: false,
    error: null,
};

// Async thunk to fetch actors
export const fetchActors = createAsyncThunk(
    'actors/fetchActors',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_ACTORS_ENDPOINT + '/getActors');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch actors');
        }
    }
);

// Async thunk to add an actor
export const addActor = createAsyncThunk(
    'actors/addActor',
    async (newActor: Actor, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_ACTORS_ENDPOINT + '/addActor', newActor);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add actor');
        }
    }
);

// Async thunk to update an actor
export const updateActor = createAsyncThunk(
    'actors/updateActor',
    async (updatedActor: Actor, { rejectWithValue }) => {
        try {
            const response = await axios.put( API_ACTORS_ENDPOINT + `/updateActor/${updatedActor._id}`, updatedActor);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update actor');
        }
    }
);

// Async thunk to delete an actor
export const deleteActor = createAsyncThunk(
    'actors/deleteActor',
    async (actorId: string, { rejectWithValue }) => {
        try {
            await axios.delete(API_ACTORS_ENDPOINT + `/deleteActor/${actorId}`);
            return actorId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete actor');
        }
    }
);

const actorSlice = createSlice({
    name: 'actors',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch actors
            .addCase(fetchActors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchActors.fulfilled, (state, action: PayloadAction<Actor[]>) => {
                state.loading = false;
                state.actors = action.payload;
            })
            .addCase(fetchActors.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add actor
            .addCase(addActor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addActor.fulfilled, (state, action: PayloadAction<Actor>) => {
                state.loading = false;
                state.actors.push(action.payload);
            })
            .addCase(addActor.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update actor
            .addCase(updateActor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateActor.fulfilled, (state, action: PayloadAction<Actor>) => {
                state.loading = false;
                const index = state.actors.findIndex((actor) => actor._id === action.payload._id);
                if (index !== -1) {
                    state.actors[index] = action.payload;
                }
            })
            .addCase(updateActor.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete actor
            .addCase(deleteActor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteActor.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.actors = state.actors.filter((actor) => actor._id !== action.payload);
            })
            .addCase(deleteActor.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default actorSlice.reducer;
