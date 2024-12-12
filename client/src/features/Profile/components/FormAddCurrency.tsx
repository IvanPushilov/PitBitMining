/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { currencyAdd } from '../../Miners/currencySlice';
import {useAppDispatch} from '../../../store/store';
import type { RootState } from '../../../store/store';

const FormAddCurrency = (): JSX.Element => {
  const currencies = useSelector((store: RootState) => store.currencies.currencies);

  const [currency, setCurrency] = useState('');
  const dispatch = useAppDispatch();

  const subbrandAddFetch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = {
        'name': currency,
    }
      
    dispatch(currencyAdd(data)).catch(console.log);
  
    window.location.reload();
  };


  
  return (
    <div className="add__form__container">
      <div className="form-add-miner">
        <form className="add__form" onSubmit={subbrandAddFetch}>
        <label htmlFor="currency-input">Валюты: {currencies.map((cur) => cur.name).join(', ')}</label>
          <input 
            id='currency-input'
            className="input-order" 
            value={currency} 
            placeholder='Введите название Валюты'
            onChange={(e) => setCurrency(e.target.value)}/>
          <button type="submit">Добавить</button>
        </form>
      </div>
    </div>
  );
};

export default FormAddCurrency;
