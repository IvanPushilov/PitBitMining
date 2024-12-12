import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { HashrateState } from "./type";
import * as api from './api'

const initialState: HashrateState = {
  hashrates: [],
  message: '',
}

export const hashratesLoad = createAsyncThunk('hashrates/load', () => api.hashratesLoadFetch())
export const hashrateAdd = createAsyncThunk('hashrates/add', (obj: object) => api.hashratesAddFetch(obj))
export const getHashrateId = createAsyncThunk('hashrate/id', (id: string | undefined) => api.hashrateIdFetch(id))

const hashratesSlice = createSlice({
  name: 'hashrates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(hashratesLoad.fulfilled, (state, action) => {state.hashrates = action.payload; state.message = '';})
    .addCase(hashratesLoad.rejected, (state, action) => { state.message = action.error.message})
    .addCase(hashrateAdd.fulfilled, (state, action) =>{
    state.hashrates.push(action.payload);
  })
  .addCase(hashrateAdd.rejected, (state, action) => {
    state.message = action.error.message;
  })
  }
})

export default hashratesSlice.reducer