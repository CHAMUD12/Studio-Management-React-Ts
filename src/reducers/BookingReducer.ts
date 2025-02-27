import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Booking, { BookingDetails } from "../models/Booking";

const api = axios.create({
    baseURL: 'http://localhost:3000/booking'
});

interface BookingState {
    bookings: Booking[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: BookingState = {
    bookings: [],
    status: 'idle',
    error: null
};

export const addBooking = createAsyncThunk(
    'booking/addBooking',
    async (booking: Booking) => {
        const response = await api.post('/book-event', booking);
        return response.data;
    }
);

export const getBookings = createAsyncThunk(
    'booking/getBookings',
    async () => {
        const response = await api.get('/bookings');
        return response.data;
    }
);

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addBooking.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addBooking.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.bookings.push(action.payload);
            })
            .addCase(addBooking.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to add booking';
            })
            .addCase(getBookings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getBookings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.bookings = action.payload;
            })
            .addCase(getBookings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to load bookings';
            });
    }
});

export default bookingSlice.reducer;
