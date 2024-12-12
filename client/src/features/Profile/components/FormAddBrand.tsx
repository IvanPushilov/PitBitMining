/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { brandAdd } from '../../Miners/brandsSlice';
import {useAppDispatch} from '../../../store/store';
import type { RootState } from '../../../store/store';

const FormAddBrand = (): JSX.Element => {
  const brands = useSelector((store: RootState) => store.brands.brands);

  const [brand, setBrand] = useState('');
  const dispatch = useAppDispatch();

  const brandAddFetch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = {
        'name': brand,
    }
      
    dispatch(brandAdd(data)).catch(console.log);
  
    window.location.reload();
  };


  
  return (
    <div className="add__form__container">
      <div className="form-add-miner">
        <form className="add__form" onSubmit={brandAddFetch}>
        <label htmlFor="brand-input">Бренды: {brands.map((br) => br.name).join(', ')}</label>
          <input 
            id='brand-input'
            className="input-order" 
            value={brand} 
            placeholder='Введите название бренда'
            onChange={(e) => setBrand(e.target.value)}/>
          <button type="submit">Добавить</button>
        </form>
      </div>
    </div>
  );
};

export default FormAddBrand;
