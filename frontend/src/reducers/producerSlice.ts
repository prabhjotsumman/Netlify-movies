import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_PRODUCERS_ENDPOINT } from '../constants';

export interface Producer {
    _id?: string;
    name: string;
    gender: string;
    dob: string;
    bio: string;
}

interface ProducerState {
    producers: Producer[];
    loading: boolean;
    error: string | null;
}

const initialState: ProducerState = {
    producers: [],
    loading: false,
    error: null,
};

// Async thunk to fetch producers
export const fetchProducers = createAsyncThunk(
    'producers/fetchProducers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_PRODUCERS_ENDPOINT + '/getProducers');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch producers');
        }
    }
);

// Async thunk to add a producer
export const addProducer = createAsyncThunk(
    'producers/addProducer',
    async (newProducer: Producer, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_PRODUCERS_ENDPOINT + '/addProducer', newProducer);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add producer');
        }
    }
);

// Async thunk to update a producer
export const updateProducer = createAsyncThunk(
    'producers/updateProducer',
    async (updatedProducer: Producer, { rejectWithValue }) => {
        try {
            const response = await axios.put(API_PRODUCERS_ENDPOINT + `/updateProducer/${updatedProducer._id}`, updatedProducer);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update producer');
        }
    }
);

// Async thunk to delete a producer
export const deleteProducer = createAsyncThunk(
    'producers/deleteProducer',
    async (producerId: string, { rejectWithValue }) => {
        try {
            await axios.delete(API_PRODUCERS_ENDPOINT + `/deleteProducer/${producerId}`);
            return producerId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete producer');
        }
    }
);

const producerSlice = createSlice({
    name: 'producers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch producers
            .addCase(fetchProducers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducers.fulfilled, (state, action: PayloadAction<Producer[]>) => {
                state.loading = false;
                state.producers = action.payload;
            })
            .addCase(fetchProducers.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add producer
            .addCase(addProducer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProducer.fulfilled, (state, action: PayloadAction<Producer>) => {
                state.loading = false;
                state.producers.push(action.payload);
            })
            .addCase(addProducer.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update producer
            .addCase(updateProducer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProducer.fulfilled, (state, action: PayloadAction<Producer>) => {
                state.loading = false;
                const index = state.producers.findIndex((producer) => producer._id === action.payload._id);
                if (index !== -1) {
                    state.producers[index] = action.payload;
                }
            })
            .addCase(updateProducer.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete producer
            .addCase(deleteProducer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProducer.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.producers = state.producers.filter((producer) => producer._id !== action.payload);
            })
            .addCase(deleteProducer.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default producerSlice.reducer;
