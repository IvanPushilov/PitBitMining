import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { BrandState } from "./type";
import * as api from './api'

const initialState: BrandState = {
  brands: [],
  message: '',
}

export const brandsLoad = createAsyncThunk('brands/load', () => api.brandsLoadFetch())
export const brandAdd = createAsyncThunk('brands/add', (obj: object)=>api.brandAddFetch(obj));
export const getBrandId = createAsyncThunk('brand/id', (id: string | undefined) => api.brandIdFetch(id))

const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(brandsLoad.fulfilled, (state, action) => {state.brands = action.payload; state.message = '';})
    .addCase(brandsLoad.rejected, (state, action) => { state.message = action.error.message})
    .addCase(brandAdd.fulfilled, (state, action) => {
      state.brands.push(action.payload);
    })
    .addCase(brandAdd.rejected, (state, action) => {
      state.message = action.error.message;
    })
  }
})

export default brandsSlice.reducer