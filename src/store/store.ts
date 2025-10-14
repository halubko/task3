import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userAPI} from "../services/userService";
import {productsAPI} from "../services/productsService";

const rootReducer = combineReducers({
    [userAPI.reducerPath]: userAPI.reducer,
    [productsAPI.reducerPath]: productsAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(userAPI.middleware, productsAPI.middleware),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]