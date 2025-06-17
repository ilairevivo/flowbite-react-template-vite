import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import  searchSlice  from "./serachSlice";
const store = configureStore({
  reducer: { userSlice ,  searchSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RootReducer = combineReducers({ userSlice , searchSlice });
export type TRootState = ReturnType<typeof RootReducer>;

export default store;
