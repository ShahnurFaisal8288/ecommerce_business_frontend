import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi/baseApi";
import { cartSlice } from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    cartItems: cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
