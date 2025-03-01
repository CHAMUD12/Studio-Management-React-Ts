import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Rental, { RentingDetails } from "../models/Rental";
import Customers from "../models/Customers";
import RentalItems from "../models/RentalItems";

const api = axios.create({
    baseURL: 'http://localhost:3000/rental'
});

interface RentalState {
    rentals: Rental[];
    customers: Customers[];
    rentalItems: RentalItems[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: RentalState = {
    rentals: [],
    customers: [],
    rentalItems: [],
    status: 'idle',
    error: null
};

export const fetchCustomers = createAsyncThunk(
    'rental/fetchCustomers',
    async () => {
        const response = await axios.get('http://localhost:3000/customer/view');
        return response.data;
    }
);

export const fetchRentalItems = createAsyncThunk(
    'rental/fetchRentalItems',
    async () => {
        const response = await axios.get('http://localhost:3000/rentalItem/view');
        return response.data;
    }
);

export const addRental = createAsyncThunk(
    'rental/rent-item',
    async (rental: Rental, { rejectWithValue }) => {
        try {
            console.log("Sending rental data:", rental);
            const response = await api.post('/rent-item', rental);
            console.log("Response from backend:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error adding rental:", error);
            return rejectWithValue(error.response?.data || 'Failed to add rental');
        }
    }
);

const rentalSlice = createSlice({
    name: 'rental',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.customers = action.payload;
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch customers';
            })

            .addCase(fetchRentalItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRentalItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.rentalItems = action.payload;
            })
            .addCase(fetchRentalItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch rental items';
            })

            .addCase(addRental.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addRental.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.rentals.push(action.payload);
            })
            .addCase(addRental.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to add rental';
            });
    }
});

export default rentalSlice.reducer;
