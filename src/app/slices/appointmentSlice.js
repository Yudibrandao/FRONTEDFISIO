import { createSlice } from "@reduxjs/toolkit";

export const citasSlice = createSlice({
    name: "citas",
    initialState: null,
    reducers: {
        appointmentDetail: (state, action) => {
            return action.payload
        }
    }
})

export const getAppointmentId = (state) => state.appointment
export default citasSlice.reducer