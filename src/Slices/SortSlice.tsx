import { createSlice } from "@reduxjs/toolkit";

const SortSlices = createSlice({
    name: "sort",
    initialState: { sortBy: "Relevance" },

    reducers: {
        updateSort: (state, action) => {
            state.sortBy = action.payload;
            console.log("🔄 Sorting updated:", state.sortBy);
        },
        resetSort: (state) => {
            state.sortBy = "Relevance";
            console.log("🔄 Sorting reset to Relevance");
        },
    },
});

export const { updateSort, resetSort } = SortSlices.actions;
export default SortSlices.reducer;
