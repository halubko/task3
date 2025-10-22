import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { authAPI } from "../services/authService"
import { productsAPI } from "../services/productsService"
import { authSlice } from "./slices/authSlice"
import { cartAPI } from "../services/cartService"
import { cartSlice } from "./slices/cartSlice"

const rootReducer = combineReducers({
   [authAPI.reducerPath]: authAPI.reducer,
   [productsAPI.reducerPath]: productsAPI.reducer,
   [cartAPI.reducerPath]: cartAPI.reducer,
   auth: authSlice.reducer,
   cart: cartSlice.reducer,
})

export const setupStore = () => {
   return configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware().concat(
            authAPI.middleware,
            productsAPI.middleware,
            cartAPI.middleware
         ),
   })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
