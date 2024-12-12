/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react';
import type { Favorite } from '../../Miners/type';
import { favoriteDelete } from '../../Miners/favoriteSlice';
import { type RootState, useAppDispatch } from '../../../store/store';
import * as api from '../../Miners/api';
import cart from '/cart.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';


function FavoriteItem({ favorite }: { favorite: Favorite }): JSX.Element {
  
  const subbrand = useSelector((store: RootState) => store.subbrands.subbrands.find((subbrand) => subbrand.id === favorite.Miner.subbrand_id));
  const model = useSelector((store: RootState) => store.modells.modells.find((model) => model.id === favorite.Miner.modell_id));

  const dispatch = useAppDispatch();
  const handleDelete = async (id: number): Promise<void> => {
    dispatch(favoriteDelete(id)).catch(console.log);
    toast.warning('Товар удален из избранного');
  };

  const AddItemInOrder = async (): Promise<void> => {
    await api.fetchOrderAdd({ status: 'Корзина', id: favorite.Miner.id, service_id: 0 }).catch(console.log);
    toast.success('Товар добавлен в корзину');
  };

  return (
    
    <div className="product-item">
      <div className="product-list">
      <h3>{subbrand?.name}</h3>
      <p>{model?.name}</p>
        <img src={favorite.Miner.img[0]} alt="" />
        <span className="price">{`${favorite.Miner.price.toLocaleString()} ₽`}</span>
        <button
        style={{ border: 'none' }}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(favorite.Miner.id);
          }}
          className="button1color" 
        >
        <svg width="30px" height="30px" viewBox="0 0 1024 1024" className="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M725.333333 192c-89.6 0-168.533333 44.8-213.333333 115.2C467.2 236.8 388.266667 192 298.666667 192 157.866667 192 42.666667 307.2 42.666667 448c0 253.866667 469.333333 512 469.333333 512s469.333333-256 469.333333-512c0-140.8-115.2-256-256-256z" fill="#F44336" /><path d="M76.010667 136.448L136.32 76.117333l809.941333 809.941334-60.330666 60.330666z" fill="#37474F" /></svg>
        </button>
        <button 
        type="submit"  
        onClick={(e) => {
            e.stopPropagation();
            AddItemInOrder();
          }} 
          className="button1"> 
        <img loading="lazy" src={cart} alt="cart"
                  style={{width: '25px', height: '25px'}}/>
        </button>
      </div>
    </div>
  );
}

export default FavoriteItem;
