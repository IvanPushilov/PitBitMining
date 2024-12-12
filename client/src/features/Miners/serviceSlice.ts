import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
// eslint-disable-next-line import/no-duplicates
import type { Service, StateService } from './type';
// eslint-disable-next-line import/no-cycle, import/no-duplicates

const initialState: StateService = {
  services: [],
  message: '',
};

export const serviceAdd = createAsyncThunk('service/add', async (obj: Service) => {
  const response = await api.fetchServiceAdd(obj);
  return response; 
});

export const serviceLoad = createAsyncThunk('service/load', () =>
  api.fetchServiceLoad(),
);
export const serviceUpdate = createAsyncThunk('service/update', (obj: Service) =>
  api.fetchServiceUpdate(obj),
);

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(serviceLoad.fulfilled, (state, action) => {
      state.services = action.payload;
    })
    .addCase(serviceLoad.rejected, (state, action) => {
      state.message = action.error.message;
      console.error('Error loading services:', action.error.message);
    })
      .addCase(serviceAdd.fulfilled, (state, action) => {
        state.services.push(action.payload);
      })
      .addCase(serviceAdd.rejected, (state, action) => {
        state.message = action.error.message;
      })
      .addCase(serviceUpdate.fulfilled, (state, action) => {
        state.services = [action.payload];
      })
      .addCase(serviceUpdate.rejected, (state, action) => {
        state.message = action.error.message;
      });
  },
});

export default serviceSlice.reducer;
