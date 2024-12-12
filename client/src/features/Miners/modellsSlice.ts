import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ModellState } from "./type";
import * as api from './api'

const initialState: ModellState = {
  modells: [],
  message: '',
}

export const modellsLoad = createAsyncThunk('modells/load', () => api.modellsLoadFetch())
export const modellAdd = createAsyncThunk('modells/add', (obj: object) => api.modellAddFetch(obj))
export const getModellId = createAsyncThunk('modell/id', (id: string | undefined) => api.modellIdFetch(id))

const modellsSlice = createSlice({
  name: 'modells',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(modellsLoad.fulfilled, (state, action) => {state.modells = action.payload; state.message = '';})
    .addCase(modellsLoad.rejected, (state, action) => { state.message = action.error.message})
    .addCase(modellAdd.fulfilled, (state, action) =>{
      state.modells.push(action.payload);
    })
    .addCase(modellAdd.rejected, (state, action) => {
      state.message = action.error.message;
    })
  }
})

export default modellsSlice.reducer