import { createSlice } from "@reduxjs/toolkit";

const FilterSlices = createSlice({
    name: "filter",
    initialState: {},

    reducers: {
        updateFilter: (state, action) => {
            const newState = { ...state, ...action.payload }; // ✅ Creates a new state object
            console.log("🔄 Updating Filter State:", newState);
            return newState;
        },

        resetFilter: () => {
            console.log("🔄 Resetting Filter State to Empty");
            return {}; // ✅ Ensures state is reset properly
        },
    },
});

export const { updateFilter, resetFilter } = FilterSlices.actions;
export default FilterSlices.reducer;
