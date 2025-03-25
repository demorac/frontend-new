import { createSlice } from "@reduxjs/toolkit";

// ✅ Ensure the initial state is never undefined
const initialState = localStorage.getItem("token") || ""; 

const jwtSlice = createSlice({
    name: "jwt",
    initialState, 
    reducers: {
        setJwt: (state, action) => action.payload || "", // ✅ Ensure it always returns a string
        removeJwt: () => "", // ✅ Must return a valid value (empty string)
    }
});

export const { setJwt, removeJwt } = jwtSlice.actions;
export default jwtSlice.reducer;
