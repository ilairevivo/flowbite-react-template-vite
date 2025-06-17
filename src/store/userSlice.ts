import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type TUser = {
  _id?: string;
  name: {
    first: string;
    middle?: string;
    last: string;
  };
  phone: string;
  email: string;
  password?: string;
  image?: {
    url: string;
    alt: string;
  };
  address?: {
    state?: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
  isBusiness: boolean;
  isAdmin?: boolean;
};

const initialState = {
  user: null as TUser | null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },

    register: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["x-auth-token"];
    },

    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;

export type TRootState = {
  userSlice: typeof initialState;
  searchSlice: {
    searchWord: string;
  };
  
};
