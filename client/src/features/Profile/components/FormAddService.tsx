/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { serviceUpdate } from '../../Miners/serviceSlice';
import {useAppDispatch} from '../../../store/store';
import type { RootState } from '../../../store/store';
import type { Service } from '../../Miners/type';

const FormAddService = (): JSX.Element => {
  const service = useSelector((store: RootState) => store.services.services);
  const [service1, setService1] = useState('');
  const dispatch = useAppDispatch();

  const serviceAddFetch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data: Service = {
      id: service[0].id,
      price: Number(service1),
    }
      
    dispatch(serviceUpdate(data)).catch(console.log);
  
    window.location.reload();
  };


  
  return (
    <div className="add__form__container">
      <div className="form-add-miner">
        <form className="add__form" onSubmit={serviceAddFetch}>
        <label htmlFor="modell-input">цена прошивки: {service[0]?.price}</label>
          <input 
            id='service-input'
            className="input-order" 
            value={service1} 
            placeholder='Введите новую цену прошивки'
            onChange={(e) =>  setService1(e.target.value)}/>
          <button type="submit">Добавить</button>
        </form>
      </div>
    </div>
  );
};

export default FormAddService;
