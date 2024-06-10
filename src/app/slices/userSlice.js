import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user", 
    initialState: { 
        token: "",
        decodificado: {
            role: "",
            firstName: "",
            email: "",
            id: "",
        },
        vecesLogeado: 10,
        appointments: [], // Nuevo campo para almacenar las citas del usuario
        adminEdithUsersId : 0 
    },
    reducers: {
        userLogin: (state, action) => {
            return {
                ...state,
                ...action.payload,
                vecesLogeado: state.vecesLogeado + 1
            };
        },
        userLogout: (state, action) => {
            return {
                token: "",
                decodificado: {
                    name: "",
                    email: "",
                    id: ""
                },
                vecesLogeado: state.vecesLogeado,
                appointments: [] // Limpiar las citas al cerrar sesión
            };
        },
        resetCount: (state, action) => {
            return {
                ...state,
                vecesLogeado: 0
            };
        },
        setUserAppointments: (state, action) => {
            state.appointments = action.payload;
        }
    }
});

export const { userLogin, userLogout, resetCount, setUserAppointments } = userSlice.actions;

export const userData = (state) => state.user;
export const loggedAmount = (state) => state.user.vecesLogeado;

export default userSlice.reducer;
