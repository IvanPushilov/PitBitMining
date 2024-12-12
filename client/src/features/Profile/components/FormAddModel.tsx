/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { modellAdd } from '../../Miners/modellsSlice';
import {useAppDispatch} from '../../../store/store';
import type { RootState } from '../../../store/store';

const FormAddModel = (): JSX.Element => {
  const modells = useSelector((store: RootState) => store.modells.modells);

  const [modell, setModell] = useState('');
  const dispatch = useAppDispatch();

  const modellAddFetch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = {
        'name': modell,
    }
      
    dispatch(modellAdd(data)).catch(console.log);
  
    window.location.reload();
  };


  
  return (
    <div className="add__form__container">
      <div className="form-add-miner">
        <form className="add__form" onSubmit={modellAddFetch}>
        <label htmlFor="modell-input">Модели: {modells.map((mod) => mod.name).join(', ')}</label>
          <input 
            id='modell-input'
            className="input-order" 
            value={modell} 
            placeholder='Введите название Модели'
            onChange={(e) => setModell(e.target.value)}/>
          <button type="submit">Добавить</button>
        </form>
      </div>
    </div>
  );
};

export default FormAddModel;
