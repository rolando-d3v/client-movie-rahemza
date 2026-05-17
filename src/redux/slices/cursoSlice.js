import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tema_preguntas: null,
  array_preguntas: [],
  array_respuestas: [],
  curso: null,
  curso_activo: false,
  id_pregunta: 0,
  id_seccion: 0,
};

export const cursoSlice = createSlice({
  name: "state",
  initialState,

  reducers: {
    x_curso: (state, action) => {
      state.curso = action.payload;
      state.curso_activo = true;
    },
    set_curso_activo: (state, action) => {
      state.curso_activo = action.payload;
    },
    set_id_pregunta: (state, action) => {
      state.id_pregunta = action.payload;
    },
    x_tema_preguntas: (state, action) => {
      state.tema_preguntas = action.payload;
      state.id_pregunta = 0;
      state.id_seccion = action.payload?.secciones_id_i;
    },
    x_array_preguntas: (state, action) => {
      state.array_preguntas = action.payload;
    },
    x_array_respuestas: (state, action) => {
      state.array_respuestas = action.payload;
    },
    x_marcarPregunta(state, action) {
      const id = action.payload;
      const pregunta = state.array_preguntas?.find(
        (p) => p.id_pregunta_i === id,
      );
      if (pregunta) {
        pregunta.preg_marcado = 1;
      }
    },
  },
});

export const {
  x_tema_preguntas,
  x_array_preguntas,
  x_array_respuestas,
  x_marcarPregunta,
  x_curso,
  set_curso_activo,
  set_id_pregunta,
} = cursoSlice.actions;

export default cursoSlice.reducer;
