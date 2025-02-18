import { RentalItems } from "../models/RentalItems";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState: RentalItems[] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/rentalItem'
});

export const saveRentalItem = createAsyncThunk(
    'rentalItem/saveRentalItem',
    async (item: RentalItems) => {
        try {
            const response = await api.post('/add', item);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getRentalItem = createAsyncThunk(
    'rentalItem/getRentalItem',
    async () => {
        try {
            const response = await api.get('/view');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const deleteRentalItem = createAsyncThunk(
    'rentalItem/deleteRentalItem',
    async (id: string) => {
        try {
            const response = await api.delete(`/delete/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const updateRentalItem = createAsyncThunk(
    'rentalItem/updateRentalItem',
    async (item: RentalItems) => {
        try {
            const response = await api.put(`/update/${item.RentalItemId}`, item);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

const rentalItemSlice = createSlice({
    name: 'rentalItem',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(saveRentalItem.pending, (state, action) => {
                console.log("Save rental item pending");
            })
            .addCase(saveRentalItem.fulfilled, (state, action) => {
                console.log("Save rental item fulfilled");
                state.push(action.payload);
            })
            .addCase(saveRentalItem.rejected, (state, action) => {
                console.error('Save rental item rejected');
            });
        builder
            .addCase(getRentalItem.pending, (state, action) => {
                console.log("Get rental item pending");
            })
            .addCase(getRentalItem.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getRentalItem.rejected, (state, action) => {
                console.error('Get rental item rejected');
            });
        builder
            .addCase(updateRentalItem.pending, (state, action) => {
                console.log("Update rental item pending", action.payload);
            })
            .addCase(updateRentalItem.fulfilled, (state, action) => {
                return state.map((item: RentalItems) =>
                    item.RentalItemId === action.payload.RentalItemId ? { ...item, ...action.payload } : item
                );
            })
            .addCase(updateRentalItem.rejected, (state, action) => {
                console.error('Update rental item rejected');
            });
        builder
            .addCase(deleteRentalItem.pending, (state, action) => {
                console.log("Delete rental item pending");
            })
            .addCase(deleteRentalItem.fulfilled, (state, action) => {
                return state.filter((item: RentalItems) => item.RentalItemId !== action.meta.arg);
            })
            .addCase(deleteRentalItem.rejected, (state, action) => {
                console.error('Delete rental item rejected');
            });
    }
});

export default rentalItemSlice.reducer;