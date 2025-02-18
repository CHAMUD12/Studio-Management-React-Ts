import {configureStore} from "@reduxjs/toolkit";
import customerReducer from "../reducers/CustomerReducer";
import instructorReducer from "../reducers/InstructorReducer.ts";
import rentalItemReducer from "../reducers/RentalItemReducer.ts";
// import rentalItemReducer from "../reducers/RentalItemReducer.ts";
// import itemReducer from "../reducers/ItemReducer.ts";

export const store = configureStore({
    reducer :{
        customer : customerReducer,
        instructor : instructorReducer,
        rentalItem : rentalItemReducer,
        // item : itemReducer,
    }
})

export type AppDispatch = typeof store.dispatch;