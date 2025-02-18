import { Instructors } from "../models/Instructors.ts";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState: Instructors[] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/instructor'
});

export const saveInstructor = createAsyncThunk(
    'instructor/saveInstructor',
    async (instructor: Instructors) => {
        try {
            const response = await api.post('/add', instructor);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getInstructor = createAsyncThunk(
    'instructor/getInstructor',
    async () => {
        try {
            const response = await api.get('/view');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const deleteInstructor = createAsyncThunk(
    'instructor/deleteInstructor',
    async (id: number) => {
        try {
            const response = await api.delete(`/delete/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const updateInstructor = createAsyncThunk(
    'instructor/updateInstructor',
    async (instructor: Instructors) => {
        try {
            const response = await api.put(`/update/${instructor.InstructorId}`, instructor);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

const instructorSlice = createSlice({
    name: 'instructor',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(saveInstructor.pending, (state, action) => {
                console.log("Save instructor pending");
            })
            .addCase(saveInstructor.fulfilled, (state, action) => {
                console.log("Save instructor fulfilled");
                state.push(action.payload);
            })
            .addCase(saveInstructor.rejected, (state, action) => {
                console.error('Save instructor rejected');
            });
        builder
            .addCase(getInstructor.pending, (state, action) => {
                console.log("Get instructor pending");
            })
            .addCase(getInstructor.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getInstructor.rejected, (state, action) => {
                console.error('Get instructor rejected');
            });
        builder
            .addCase(updateInstructor.pending, (state, action) => {
                console.log("Update instructor pending", action.payload);
            })
            .addCase(updateInstructor.fulfilled, (state, action) => {
                return state.map((instructor: Instructors) =>
                    instructor.InstructorId === action.payload.InstructorId ? { ...instructor, ...action.payload } : instructor
                );
            })
            .addCase(updateInstructor.rejected, (state, action) => {
                console.error('Update instructor rejected');
            });
        builder
            .addCase(deleteInstructor.pending, (state, action) => {
                console.log("Delete instructor pending");
            })
            .addCase(deleteInstructor.fulfilled, (state, action) => {
                return state.filter((instructor: Instructors) => instructor.InstructorId !== action.meta.arg);
            })
            .addCase(deleteInstructor.rejected, (state, action) => {
                console.error('Delete instructor rejected');
            });
    }
});

export default instructorSlice.reducer;