import { EventPackages } from "../models/EventPackages";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState: EventPackages[] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/eventPackage'
});

export const saveEventPackage = createAsyncThunk(
    'eventPackage/saveEventPackage',
    async (pkg: EventPackages) => {
        try {
            const response = await api.post('/add', pkg);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getEventPackages = createAsyncThunk(
    'eventPackage/getEventPackages',
    async () => {
        try {
            const response = await api.get('/view');
            if (!Array.isArray(response.data)) {
                console.error("Invalid data format received:", response.data);
                return [];
            }
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
);


export const deleteEventPackage = createAsyncThunk(
    'eventPackage/deleteEventPackage',
    async (id: string) => {
        try {
            const response = await api.delete(`/delete/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const updateEventPackage = createAsyncThunk(
    'eventPackage/updateEventPackage',
    async (pkg: EventPackages) => {
        try {
            const response = await api.put(`/update/${pkg.PackageId}`, pkg);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

const eventPackageSlice = createSlice({
    name: 'eventPackage',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(saveEventPackage.pending, (state, action) => {
                console.log("Save event package pending");
            })
            .addCase(saveEventPackage.fulfilled, (state, action) => {
                console.log("Save event package fulfilled");
                state.push(action.payload);
            })
            .addCase(saveEventPackage.rejected, (state, action) => {
                console.error('Save event package rejected');
            });
        builder
            .addCase(getEventPackages.pending, (state, action) => {
                console.log("Get event packages pending");
            })
            .addCase(getEventPackages.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getEventPackages.rejected, (state, action) => {
                console.error('Get event packages rejected');
            });
        builder
            .addCase(updateEventPackage.pending, (state, action) => {
                console.log("Update event package pending", action.payload);
            })
            .addCase(updateEventPackage.fulfilled, (state, action) => {



                // if (!action.payload || !action.payload.PackageId) {
                //     console.error("Invalid response from updateEventPackage:", action.payload);
                //     return state; // Avoids crashing
                // }



                return state.map((pkg: EventPackages) =>
                    pkg.PackageId === action.payload.PackageId ? { ...pkg, ...action.payload } : pkg
                );
            })
            .addCase(updateEventPackage.rejected, (state, action) => {
                console.error('Update event package rejected');
            });
        builder
            .addCase(deleteEventPackage.pending, (state, action) => {
                console.log("Delete event package pending");
            })
            .addCase(deleteEventPackage.fulfilled, (state, action) => {
                return state.filter((pkg: EventPackages) => pkg.PackageId !== action.meta.arg);
            })
            .addCase(deleteEventPackage.rejected, (state, action) => {
                console.error('Delete event package rejected');
            });
    }
});

export default eventPackageSlice.reducer;