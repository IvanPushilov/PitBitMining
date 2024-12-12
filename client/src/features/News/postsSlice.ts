import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../Miners/api';
// eslint-disable-next-line import/no-duplicates
import type { StatePost } from '../Miners/type';
// eslint-disable-next-line import/no-cycle, import/no-duplicates

const initialState: StatePost = {
  posts: [],
  message: '',
};

export const postAdd = createAsyncThunk('post/add', async (obj: FormData) => {
  const response = await api.fetchPostAdd(obj);
  return response; 
});

export const postLoad = createAsyncThunk('post/load', () =>
  api.fetchPostsLoad(),
);
export const postUpdate = createAsyncThunk('post/update', (obj: { id: number | undefined; obj: FormData }) =>
  api.fetchPostUpdate(obj),
);
export const postDel = createAsyncThunk('posts/del', (id: number) => api.fetchPostDelete(id));


const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(postLoad.fulfilled, (state, action) => {
      state.posts = action.payload;
    })
    .addCase(postLoad.rejected, (state, action) => {
      state.message = action.error.message;
      console.error('Error loading posts:', action.error.message);
    })
      .addCase(postAdd.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(postAdd.rejected, (state, action) => {
        state.message = action.error.message;
      })
      .addCase(postUpdate.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) => 
          post.id === action.payload?.id ? action.payload : post,
         );
      })
      .addCase(postUpdate.rejected, (state, action) => {
        state.message = action.error.message;
      })
      .addCase(postDel.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload.id);
      })
      .addCase(postDel.rejected, (state, action) => {
        state.message = action.error.message;
      });
  },
});

export default postSlice.reducer;
