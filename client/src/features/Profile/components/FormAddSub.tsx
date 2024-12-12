/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { subbrandsAdd } from '../../Miners/subSlice';
import {useAppDispatch} from '../../../store/store';
import type { RootState } from '../../../store/store';

const FormAddSubBrand = (): JSX.Element => {
  const subbrands = useSelector((store: RootState) => store.subbrands.subbrands);

  const [subBrand, setSubBrand] = useState('');
  const [subBrandImg, setSubBrandImg] = useState<FileList | null | undefined>(null);
  const dispatch = useAppDispatch();

  const subbrandAddFetch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const imgFile = subBrandImg?.[0];
    const formData = new FormData();


    
         formData.append('name', subBrand);
         if(imgFile){
         formData.append('img', imgFile)
         }
    
      
    dispatch(subbrandsAdd(formData)).catch(console.log);
  
    window.location.reload();
  };


  
  return (
    <div className="add__form__container">
      <div className="form-add-miner">
        <form className="add__form" onSubmit={subbrandAddFetch}>
        <label htmlFor="subBrand-input">Суббренды: {subbrands.map((sub) => sub.name).join(', ')}</label>
          <input 
            id='subBrand-input'
            className="input-order" 
            value={subBrand} 
            placeholder='Введите название Суббренда'
            onChange={(e) => setSubBrand(e.target.value)}
            />

            <label htmlFor="img-input" />
            <input
            id='img-input'
            className='input-order'
            type="file"
            placeholder='Добавьте логотип'
            onChange={(e) => setSubBrandImg(e.target.files)}
            />
          <button type="submit">Добавить</button>
        </form>
      </div>
    </div>
  );
};

export default FormAddSubBrand;
