import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/UserSlice";
import profileReducer from "../Slices/ProfileSlice";
import filterReducer from "../Slices/FilterSlices";
import sortReducer from "../Slices/SortSlice";  // ✅ Correct import
import jwtReducer from "../Slices/JwtSlice";  

export default configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        filter: filterReducer,
        sort: sortReducer,  // ✅ Now it's correctly pointing to SortSlice
        jwt: jwtReducer
    },
});
