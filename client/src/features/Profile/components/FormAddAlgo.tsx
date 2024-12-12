/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { algorithmAdd } from '../../Miners/algSlice';
import { useAppDispatch } from '../../../store/store';
import type { RootState } from '../../../store/store';

const FormAddAlgo = (): JSX.Element => {
  const algorithms = useSelector((store: RootState) => store.algorithms.algorithms);

  const [algorithm, setAlgorithm] = useState('');
  const dispatch = useAppDispatch();

  
  const algorithmAddFetch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = {
        'algo': algorithm,
    }
    
      
    dispatch(algorithmAdd(data)).catch(console.log);
  
    window.location.reload();
  };


  
  return (
    <div className="add__form__container">
      <div className="form-add-miner">
        <form className="add__form" onSubmit={algorithmAddFetch}>
        <label htmlFor="algo-input">Алгоритмы: {algorithms.map((algo) => algo.algo).join(', ')}</label>
          <input 
            id='algo-input'
            className="input-order" 
            value={algorithm} 
            placeholder='Введите название алгоритма'
            onChange={(e) => setAlgorithm(e.target.value)}/>
          <button type="submit">Добавить</button>
        </form>
      </div>
    </div>
  );
};

export default FormAddAlgo;
