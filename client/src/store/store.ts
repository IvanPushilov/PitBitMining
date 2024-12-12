import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "../features/Auth/authSlice";
import minersSlice from "../features/Miners/minersSlice";
import brandsSlice from "../features/Miners/brandsSlice";
import currencySlice from "../features/Miners/currencySlice";
import algSlice from "../features/Miners/algSlice";
import hashratesSlice from "../features/Miners/hashratesSlice";
import modellsSlice from "../features/Miners/modellsSlice";
import subSlice from "../features/Miners/subSlice";
import ordersSlice from "../features/Miners/ordersSlice";
import favoriteSlice from "../features/Miners/favoriteSlice";
import deliverySlice from "../features/Miners/deliverySlice";
import serviceSlice from "../features/Miners/serviceSlice";
import postsSlice from "../features/News/postsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    services: serviceSlice,
    miners: minersSlice,
    brands: brandsSlice,
    currencies: currencySlice,
    algorithms: algSlice,
    modells: modellsSlice,
    subbrands: subSlice,
    hashrates: hashratesSlice,
    order: ordersSlice,
    favorite: favoriteSlice,
    deliveries: deliverySlice,
    posts: postsSlice,
  }
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export type RootState = ReturnType<typeof store.getState>
