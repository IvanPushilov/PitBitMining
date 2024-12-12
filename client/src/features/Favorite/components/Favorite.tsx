/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { useAppDispatch } from '../../../store/store';
import { favoriteLoad } from '../../Miners/favoriteSlice';
import FavoriteItem from './FavoriteItem';
import ProductModal from '../../Miners/components/ProductModal';


function Favorite(): JSX.Element {
  const favorites = useSelector((store: RootState) => store.favorite.favorite);
  const [productModalIsOpen, setProductModalIsOpen] = useState(false); // Состояние для модального окна товара
  const [selectedProduct, setSelectedProduct] = useState(null); // Состояние для выбранного товара

  const openProductModal = (product: any): void => {
    setSelectedProduct(product);
    setProductModalIsOpen(true);
  };

  const closeProductModal = (): void => {
    setProductModalIsOpen(false);
    setSelectedProduct(null);
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(favoriteLoad()).catch(console.log);
  }, []);

  return (
    <div className="container-order1">
      {favorites.length === 0 && (
  <div style={{alignItems: 'center', margin: '25px', width: '30em' }}>
    <p style={{ fontWeight: 500, fontSize: '45px' }}>Тут пока ничего нет</p>
  </div>
)}
      {favorites.map((favorite) => (
        <div key={favorite.id} onClick={() => openProductModal(favorites[0]?.Miner.id)}>
        <FavoriteItem key={favorite.id} favorite={favorite} />
        </div>
      ))}
       <ProductModal 
        isOpen={productModalIsOpen} 
        onRequestClose={closeProductModal} 
        miner={selectedProduct} 
      />
    </div>
  );
}

export default Favorite;
