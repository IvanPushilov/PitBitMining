import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
// eslint-disable-next-line import/no-duplicates
import type { StateFavorite } from './type';
// eslint-disable-next-line import/no-cycle, import/no-duplicates

const initialState: StateFavorite = {
  favorite: [],
  message: '',
};

export const favoriteAdd = createAsyncThunk('favorite/add', (id: number) =>
  api.fetchFavotireAdd(id),
);
export const favoriteLoad = createAsyncThunk('favorite/load', () => api.fetchFavoriteLoad());
export const favoriteDelete = createAsyncThunk('favorite/delete', (id: number) =>
  api.fetchFavoriteDelete(id),
);

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    clear2: (state) => {
      state.favorite = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(favoriteAdd.fulfilled, (state, action) => {
        state.favorite.push(action.payload);
      })
      .addCase(favoriteAdd.rejected, (state, action) => {
        state.message = action.error.message;
      })
      .addCase(favoriteLoad.fulfilled, (state, action) => {
        state.favorite = action.payload;
      })
      .addCase(favoriteLoad.rejected, (state, action) => {
        state.message = action.error.message;
      })
      .addCase(favoriteDelete.fulfilled, (state, action) => {
        state.favorite = state.favorite.filter((el) => el.Miner.id !== +action.payload);
      })
      .addCase(favoriteDelete.rejected, (state, action) => {
        state.message = action.error.message;
      });
  },
});
export const { clear2 } = favoriteSlice.actions;

export default favoriteSlice.reducer;
