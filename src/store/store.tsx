import {configureStore} from "@reduxjs/toolkit";
import customerReducer from "../reducers/CustomerReducer";
import instructorReducer from "../reducers/InstructorReducer.ts";
import rentalItemReducer from "../reducers/RentalItemReducer.ts";
import eventPackageReducer from "../reducers/EventPackageReducer.ts";
import bookingReducer from "../reducers/BookingReducer.ts";
import rentalReducer from "../reducers/RentalReducer.ts";

export const store = configureStore({
    reducer :{
        customer : customerReducer,
        instructor : instructorReducer,
        rentalItem : rentalItemReducer,
        eventPackage : eventPackageReducer,
        booking : bookingReducer,
        rental : rentalReducer,
    }
})

export type AppDispatch = typeof store.dispatch;
