import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web

// Import your slices
import authSlice from "./authSlice";
// Uncomment these when the slices are ready
// import jobSlice from "./jobSlice";
// import companySlice from "./companySlice";
// import applicationSlice from "./applicationSlice";

// Configure persist settings
const persistConfig = {
    key: "root", // Key for the persisted data
    version: 1,
    storage, // Define the storage engine (localStorage in this case)
};

// Combine reducers
const rootReducer = combineReducers({
    auth: authSlice,
    // Uncomment these when the slices are ready
    // job: jobSlice,
    // company: companySlice,
    // application: applicationSlice,
});

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Persistor to persist the store
export const persistor = persistStore(store);
export default store;
