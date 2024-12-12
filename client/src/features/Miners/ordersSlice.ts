import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
// eslint-disable-next-line import/no-duplicates
import type { OrderItemId, StateOrder } from './type';
// eslint-disable-next-line import/no-cycle, import/no-duplicates

const initialState: StateOrder = {
  orders: [],
  message: '',
  loading: false,
};

export const orderAdd = createAsyncThunk('order/add', (obj: { id: number; status: string, service_id: number }) =>
  api.fetchOrderAdd(obj),
);
export const orderLoad = createAsyncThunk('order/load', () => api.fetchOrdersLoad());
export const orderDelete = createAsyncThunk('order/delete', (id: OrderItemId) =>
  api.fetchOrderDel(id),
);
export const orderDecreaseQuantity = createAsyncThunk('order/decreaseQuantity', (id: OrderItemId) =>
  api.fetchOrderDecreaseQuantity(id).then(() => ({ id })),
);
export const orderIncreaseQuantity = createAsyncThunk('order/increaseQuantity', (id: OrderItemId) =>
  api.fetchOrderIncreaseQuantity(id).then(() => ({ id })),
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clear: (state) => {
      state.orders = [];
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderAdd.pending, (state) => {
        state.loading = true; 
      })
      .addCase(orderAdd.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false; 
      })
      .addCase(orderAdd.rejected, (state, action) => {
        state.loading = false; 
        state.message = action.error.message;
      })
      .addCase(orderLoad.pending, (state) => {
        state.loading = true; 
      })
      .addCase(orderLoad.fulfilled, (state, action) => {
        if (action.payload.message === 'ok') {
          state.orders = action.payload.orders;
        }
        state.loading = false; 
      })
      .addCase(orderLoad.rejected, (state, action) => {
        state.loading = false; 
        state.message = action.error.message;
      })
      .addCase(orderDelete.fulfilled, (state, action) => {
        state.orders = state.orders.filter((el) => el.Miner.id !== +action.payload.id);
      })
      .addCase(orderDelete.rejected, (state, action) => {
        state.message = action.error.message;
      })
      .addCase(orderDecreaseQuantity.fulfilled, (state, action) => {
        const updatedOrders = state.orders.map((order) => {
          if (order.Miner.id === action.payload.id) {
            return {
              ...order,
              count: Math.max(order.count - 1, 0),
            };
          }
          return order;
        }).filter(order => order.count > 0);
        state.orders = updatedOrders;
      })
      .addCase(orderDecreaseQuantity.rejected, (state, action) => {
        state.message = action.error.message;
      })
      .addCase(orderIncreaseQuantity.fulfilled, (state, action) => {
        const updatedOrders = state.orders.map((order) => {
          if (order.Miner.id === action.payload.id) {
            return {
              ...order,
              count: order.count + 1,
            };
          }
          return order;
        });
        state.orders = updatedOrders;
      })
      .addCase(orderIncreaseQuantity.rejected, (state, action) => {
        state.message = action.error.message;
      });
  },
});

export const { clear } = ordersSlice.actions;
export default ordersSlice.reducer;