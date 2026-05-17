import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  estado_modal: false,
  open_toggle: false,
  open_sidebar_numero_preguntas: false,
  time_preguntas: { hours: 0, minutes: 0, seconds: 0 },
};

export const stateSlice = createSlice({
  name: "state",
  initialState,

  reducers: {
    openToggleModal: (state, action) => {
      state.estado_modal = action.payload;
    },
    xopenToggle: (state, action) => {
      state.open_toggle = action.payload;
    },
    setOpenSidebarNumeroPreguntas: (state, action) => {
      state.open_sidebar_numero_preguntas = action.payload;
    },
    setTimePreguntas: (state, action) => {
      state.time_preguntas = action.payload;
    },
    
  },
});

export const {
  openToggleModal, xopenToggle, setOpenSidebarNumeroPreguntas, setTimePreguntas
} = stateSlice.actions;

export default stateSlice.reducer;
