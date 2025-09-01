
import { configureStore } from '@reduxjs/toolkit'

import authReducer from "./features/authSlice"
import { apiSlice } from './api/apiSlice'

import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist'

import storage  from 'redux-persist/lib/storage';


const persistConfig = {
    key:"auth",
    storage
}


const persistedAuthReducer = persistReducer(persistConfig,authReducer)


export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,               
        [apiSlice.reducerPath]: apiSlice.reducer, 
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(apiSlice.middleware),
});


export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch





































