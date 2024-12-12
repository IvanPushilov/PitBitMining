/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { minerAdd } from '../minersSlice';
import { RootState, useAppDispatch } from '../../../store/store';
import '../styles/form.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader'; 



const FormAddMiner = (): JSX.Element => {
  const brands = useSelector((store: RootState) => store.brands.brands);
  const subbrands = useSelector((store: RootState) => store.subbrands.subbrands);
  const modells = useSelector((store: RootState) => store.modells.modells);
  const hashrates = useSelector((store: RootState) => store.hashrates.hashrates);
  const currencies = useSelector((store: RootState) => store.currencies.currencies);
  const algorithms = useSelector((store: RootState) => store.algorithms.algorithms);


  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState<FileList | null | undefined>(null);
  const [expense, setExpense] = useState('');
  const [brand, setBrand] = useState('');
  const [subBrand, setSubBrand] = useState('');
  const [modell, setModell] = useState('');
  const [algorithm, setAlgorithm] = useState('');
  const [currency, setCurrency] = useState<string[]>(['']);
  const [hashrate, setHashrate] = useState('');
  const [about, setAbout] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [volt, setVolt] = useState('');
  const [cooling, setCooling] = useState('');
  const [temp, setTemp] = useState('');
  const [size, setSize] = useState('');
  const [loud, setLoud] = useState('');



  const dispatch = useAppDispatch();


  const minerAddFetch = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();


     // Проверка на пустые поля
     if (!price || !description || !img || !expense || !brand || !subBrand || !modell || !algorithm || !currency || !hashrate) {
      toast.warning('Пожалуйста, заполните все поля!');
      return; // Прекращаем выполнение функции, если есть пустые поля
  }


    const imgFile = img?.[0];
    const formData = new FormData();
   
    formData.append('price', price);
    formData.append('expense', expense);
    const descriptions = description;


const formattedDescription = descriptions.replace(/\n/g, '\n');

console.log('1111111111',  Array.isArray(currency) ? currency.map((id) => parseInt(id)) : [parseInt(currency)]);

formData.append('description', formattedDescription);
    formData.append('brand_id', brand);
    formData.append('subbrand_id', subBrand);
    formData.append('modell_id', modell);
    formData.append('algorithm_id', algorithm);
    formData.append('currency_id', Array.isArray(currency) ? currency.map((id) => parseInt(id)).join(',') : String(parseInt(currency)));
    formData.append('hashrate_id', hashrate);
    formData.append('about', about);
    formData.append('volt', volt);
    formData.append('cooling', cooling);
    formData.append('temp', temp);
    formData.append('size', size);
    formData.append('loud', loud);


    if (imgFile) {
      Array.from(img).forEach(file => {
        formData.append('img', file);
      });
    }    
    try{
     await dispatch(minerAdd(formData)).catch(console.log);
    toast.success('Товар добавлен!');
    }catch(error: any){
      toast.error('Произошла ошибка при добавлении товара!', error);
    }finally{
    setIsLoading(false); 
    // setTimeout(() => window.location.reload(), 5000);
  }
};


  useEffect(() => {
    if (brands.length > 0) {
      setBrand(brands[0].id.toString()); // Установить первый бренд как выбранный
    }
    if (modells.length > 0) {
      setModell(modells[0].id.toString()); // Установить первую модель как выбранную
    }
    if (subbrands.length > 0) {
      setSubBrand(subbrands[0].id.toString()); // Установить первый суббренд как выбранный
    }
    if (algorithms.length > 0) {
      setAlgorithm(algorithms[0].id.toString()); // Установить первый алгоритм как выбранный
    }
    if (currencies.length > 0) {
      setCurrency([currencies[0].id.toString()]); // Установить первую валюту как выбранную
    }
    if (hashrates.length > 0) {
      setHashrate(hashrates[0].id.toString()); // Установить первый хэшрейт как выбранный
    }
  }, [brands, subbrands, modells, algorithms, currencies, hashrates]);
 



  
  return (
    <div className="add__form__container">
      <div className="form-add-miner">
        <form className="add__form" onSubmit={minerAddFetch}>
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
              required
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
          <input
            className="input-order"
            value={volt}
            placeholder="Напряжение"
            onChange={(e) => setVolt(e.target.value)}
          />
          <input
            className="input-order"
            value={cooling}
            placeholder="Охлаждение"
            onChange={(e) => setCooling(e.target.value)}
          />
          <input
            className="input-order"
            value={temp}
            placeholder="Температура"
            onChange={(e) => setTemp(e.target.value)}
          />
          <input
            className="input-order"
            value={size}
            placeholder="Размер"
            onChange={(e) => setSize(e.target.value)}
          />
          <input
            className="input-order"
            value={loud}
            placeholder="Громкость"
            onChange={(e) => setLoud(e.target.value)}
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
          <div>
  {currencies.map((option: any) => (
    <div key={option.id}>
      <input
        type="checkbox"
        value={option.id}
        checked={currency.includes(option.id.toString())}
        onChange={(e) => {
          if (e.target.checked) {
            setCurrency([...currency, option.id.toString()]);
          } else {
            setCurrency(currency.filter((id) => id !== option.id.toString()));
          }
        }}
      />
      <span>{option.name}</span>
    </div>
  ))}
</div>
          <select
            className="input-order"
            value={hashrate}
            onChange={(e) => setHashrate(e.target.value)}
          >
            {hashrates.map((option: any) => (
              <option key={option.id} value={option.id}>
                {option.rate} 
              </option>
            ))}
          </select>
          <button type="submit">Добавить</button>
        </form>
        {isLoading && (
          <div className="spinner-container">
            <ClipLoader color="#36D7B7" loading={isLoading} size={50} />
          </div>
        )}
      </div>
    </div>
  );
};


export default FormAddMiner;
