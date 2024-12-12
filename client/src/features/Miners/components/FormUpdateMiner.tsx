/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { minerUpdate } from '../minersSlice';
import { RootState, useAppDispatch } from '../../../store/store';
import '../styles/form.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Miner } from '../type';

const FormUpdateMiner = ({miner}:{miner: Miner}): JSX.Element => {
  const brands = useSelector((store: RootState) => store.brands.brands);
  const subbrands = useSelector((store: RootState) => store.subbrands.subbrands);
  const modells = useSelector((store: RootState) => store.modells.modells);
  const hashrates = useSelector((store: RootState) => store.hashrates.hashrates);
  const currencies = useSelector((store: RootState) => store.currencies.currencies);
  const algorithms = useSelector((store: RootState) => store.algorithms.algorithms);

  const [price, setPrice] = useState(miner.price.toString());
  const [description, setDescription] = useState(miner.description);
  const [img, setImg] = useState<FileList | null | undefined>(null);
  const [expense, setExpense] = useState(miner.expense.toString());
  const [brand, setBrand] = useState('');
  const [subBrand, setSubBrand] = useState('');
  const [modell, setModell] = useState('');
  const [algorithm, setAlgorithm] = useState('');
  const [currency, setCurrency] = useState('');
  const [hashrate, setHashrate] = useState('');
  const [about, setAbout] = useState(miner?.about?.toString())

  const dispatch = useAppDispatch();

  const minerUpdateFetch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

        // Проверка на пустые поля
        if (!price || !description || !expense || !brand || !subBrand || !modell || !algorithm || !currency || !hashrate) {
          toast.warning('Пожалуйста, заполните все поля!');
          return; // Прекращаем выполнение функции, если есть пустые поля
      }

    const imgFile = img?.[0];
    const formData = new FormData();
    formData.append('price', price);
    formData.append('expense', expense);
    formData.append('description', description);
    formData.append('brand_id', brand);
    formData.append('subbrand_id', subBrand);
    formData.append('modell_id', modell);
    formData.append('algorithm_id', algorithm);
    formData.append('currency_id', currency);
    formData.append('hashrate_id', hashrate);
    formData.append('about', about);
    formData.append('img', imgFile !== null && imgFile !== undefined ? imgFile : '');

    const data = {
      id: miner.id,
      obj: formData
    };
    
    dispatch(minerUpdate(data)).catch(console.log);
    toast.success('Товар изменен!');
    setTimeout(() => window.location.reload(), 5000);
  };

  useEffect(() => {
    if (brands.length > 0) {
      setBrand(brands.find((brand) => brand.id === miner.brand_id)?.id?.toString()?? ''); 
    }
    if (modells.length > 0) {
      setModell(modells.find((modell) => modell.id === miner.modell_id)?.id.toString()?? ''); 
    }
    if (subbrands.length > 0) {
      setSubBrand(subbrands.find((subbrand) => subbrand.id === miner.subbrand_id)?.id.toString()?? ''); 
    }
    if (algorithms.length > 0) {
      setAlgorithm(algorithms.find((algorithm) => algorithm.id === miner.algorithm_id)?.id.toString()?? '');
    }
    if (currencies.length > 0) {
      setCurrency(currencies.find((currency) => currency.id === miner.currency_id[0])?.id.toString()?? ''); 
    }
    if (hashrates.length > 0) {
      setHashrate(hashrates.find((hashrate) => hashrate.id === miner.hashrate_id)?.id.toString()?? ''); 
    }
  }, [brands, subbrands, modells, algorithms, currencies, hashrates]);
  
 


  
  return (
    <div className="add__form__container">
      <div className="form-add-miner">
        <form className="add__form" onSubmit={minerUpdateFetch}>
          <input
            className="input-order"
            value={price}
            placeholder="цена"
            onChange={(e) => setPrice(e.target.value)}
          />
          <textarea
            className="input-order"
            value={description}
            placeholder="описание"
            onChange={(e) => setDescription(e.target.value)}
          />
          <textarea
            className="input-order"
            value={about}
            placeholder="Подробное описание"
            onChange={(e) => setAbout(e.target.value)}
          />
          <label>
            Фото
            <input
              className="input-order"
              type="file"
              placeholder="img"
              multiple
              onChange={(e) => setImg(e.target.files)}
            />
          </label>
          <input
            className="input-order"
            value={expense}
            placeholder="Расход"
            onChange={(e) => setExpense(e.target.value)}
          />
          <select 
            className="input-order" 
            value={brand} 
            onChange={(e) => setBrand(e.target.value)}>
              {brands.map((option:any) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
          </select>
          <select
            className="input-order"
            value={subBrand}
            onChange={(e) => setSubBrand(e.target.value)}
          >
            {subbrands.map((option: any) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <select 
            className="input-order" 
            value={modell} 
            onChange={(e) => setModell(e.target.value)}>
            {modells.map((option: any) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <select
            className="input-order"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            {algorithms.map((option: any) => (
              <option key={option.id} value={option.id}>
                {option.algo}
              </option>
            ))}
          </select>
          <select
            className="input-order"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {currencies.map((option: any) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <select
            className="input-order"
            value={hashrate}
            onChange={(e) => setHashrate(e.target.value)}
          >
            {hashrates.map((option: any) => (
              <option key={option.id} value={option.id}>
                {option.rate} th/s
              </option>
            ))}
          </select>
          <button type="submit">Добавить</button>
        </form>
      </div>
    </div>
  );
};

export default FormUpdateMiner;
