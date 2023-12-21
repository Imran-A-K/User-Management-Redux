import { configureStore } from "@reduxjs/toolkit";
import { api } from "../Slices/apiSlice";
import authReducer from "@/components/Redux/Slices/authSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  // devTools: true
});

export default store;
