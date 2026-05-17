import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info_user: {},
  session: "",
};

export const userDataSlice = createSlice({
  name: "state",
  initialState,

  reducers: {
    x_info_user: (state, action) => {
      state.info_user = action.payload;
    },
    x_session: (state, action) => {
      state.session = action.payload;
    },
  },
});

export const { x_info_user, x_session } = userDataSlice.actions;

export default userDataSlice.reducer;
