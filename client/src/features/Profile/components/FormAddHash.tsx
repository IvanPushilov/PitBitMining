/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { hashrateAdd } from '../../Miners/hashratesSlice';
import { useAppDispatch } from '../../../store/store';
import type {RootState} from '../../../store/store';

const FormAddHash = (): JSX.Element => {
    const hashrates = useSelector((store: RootState) => store.hashrates.hashrates);

  const [hashrate, setHashrate] = useState('');
  const dispatch = useAppDispatch();

  
  const hashratesAddFetch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = {
        'rate': hashrate,
      };   
  
    
      
    dispatch(hashrateAdd(data)).catch(console.log);
  
    window.location.reload();
  };


  
  return (
    <div className="add__form__container">
      <div className="form-add-miner">
        <form className="add__form" onSubmit={hashratesAddFetch}>
        <label htmlFor="hash-input">Хешрейты: {hashrates.map((hr) => hr.rate).join(', ')}</label>
          <input 
            id='hash-input'
            className="input-order" 
            value={hashrate} 
            placeholder='Введите название хешрейта'
            onChange={(e) => setHashrate(e.target.value)}/>
          <button type="submit">Добавить</button>
        </form>
      </div>
    </div>
  );
};

export default FormAddHash;
