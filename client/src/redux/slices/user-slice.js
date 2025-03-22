import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
      userData: JSON.parse(localStorage.getItem('userData')) || null,
      isAuthenticated: localStorage.getItem('token') ? true : false,
    },
    reducers: {
      setUserData: (state, action) => {
        state.userData = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem('userData', JSON.stringify(action.payload));
        localStorage.setItem('token', action.payload.token);
      },
      removeUserData: (state) => {
        state.userData = null;
        state.isAuthenticated = false;
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
      }
    }
  });

export const { setUserData, removeUserData } = userSlice.actions;
export const selectUserData = (state) => state.user.userData
export const selectIsAuthenticated = (state) => state.user.isAuthenticated

export default userSlice.reducer