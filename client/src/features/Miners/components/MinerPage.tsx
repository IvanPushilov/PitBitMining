import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import type { RootState } from '../../../store/store';
import { useAppDispatch } from '../../../store/store';
import Modal,  {type Styles } from 'react-modal';
import FormUpdateMiner from './FormUpdateMiner';
import { minerDel } from '../minersSlice';
import * as api from '../api';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper/core';
import { Pagination, Navigation, Mousewheel } from 'swiper/modules';

import { favoriteAdd } from '../favoriteSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MinerItem from './MinerItem';

const customStyles: Styles = {
  content: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    borderRadius: '20px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxHeight: '70%', 
    overflowY: 'auto', 
    zIndex:'9999999',
  },
};


function MinerPage({ miner_id }: { miner_id?: number }): JSX.Element {
  const { minerId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);

  const selectedMiner = useSelector((store: RootState) =>
    store.miners.miners.find((miner) => miner.id === Number(minerId || miner_id)),
  );
  
  const service = useSelector((store: RootState) => store.services.services);

  const user = useSelector((store: RootState) => store.auth.user);
  const miners = useSelector((store: RootState) => store.miners.miners);
  const brands = useSelector((store: RootState) => store.brands.brands);
  const subbrands = useSelector((store: RootState) => store.subbrands.subbrands);
  const modells = useSelector((store: RootState) => store.modells.modells);
  const hashrates = useSelector((store: RootState) => store.hashrates.hashrates);
  const currencies = useSelector((store: RootState) => store.currencies.currencies);
  const algorithms = useSelector((store: RootState) => store.algorithms.algorithms);

  const currentBrand = brands.find((brand) => brand.id === selectedMiner?.brand_id);
  const currentSubBrand = subbrands.find((subbrand) => subbrand.id === selectedMiner?.subbrand_id);
  const currentModell = modells.find((modell) => modell.id === selectedMiner?.modell_id);
  const currentHashrate = hashrates.find((hashrate) => hashrate.id === selectedMiner?.hashrate_id);
  const currentCurrency = currencies.filter((currency) => selectedMiner?.currency_id.includes(currency.id)).map((currency) => currency.name);
  const currentAlgorithm = algorithms.find(
    (algorithm) => algorithm.id === selectedMiner?.algorithm_id,
  );
  
  const [activeTab, setActiveTab] = useState('description');
  const [buttonText, setButtonText] = useState('Забронировать в Telegram');
  const [text1, setText1] = useState('В избранное');
  const [text2, setText2] = useState('В корзину');
  const [isServiceSelected, setIsServiceSelected] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  

  const switchTab = (tabId: string) => {
    setActiveTab(tabId);
  };

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  async function sendMessageToTelegram(): Promise<void> {
    if(!user){
      toast.error('Для отправки необходимо авторизоваться');
    }else{
    const token: string = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chat_id: string = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    const message = `Пользователь ${user?.name} оставил заяку на приобретение майнера. ${currentBrand?.name} ${currentSubBrand?.name} ${currentModell?.name}
    телефон: ${user?.phone}, email: ${user?.email}`;
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(message)}`;

    try {
      const response = await fetch(url, { method: 'GET' });
      const data = await response.json();
      if (data.ok) {
        setButtonText('Заявка отправлена');
      }
    } catch (error) {
      console.error(error);
    }
  }
  }


  if (!selectedMiner) {
    return <div>Карточка не найдена</div>;
  }


  const AddItemInOrder = async (): Promise<void> => {
	if(!user){
		toast.error('Для добавления в корзину необходимо авторизоваться');
	}else{
    await api
      .fetchOrderAdd({ status: 'Корзина', id: selectedMiner.id, service_id: serviceProps })
      .catch(console.log);
    setText2('Добавлено!');
    toast.success('Товар добавлен в корзину');
	}
  };

  const AddFavorite = async (id: number): Promise<void> => {
	if(!user){
		toast.error('Для добавления в избранное необходимо авторизоваться');
	}else{
    dispatch(favoriteAdd(id)).catch(console.log);
    setText1('Добавлено!');
    toast.success('Товар добавлен в избранное');
	}
  };

  const minerDelete = (): void => {
    dispatch(minerDel(selectedMiner?.id)).catch(console.log);
    navigate('/miners');
    toast.warning('Товар удален');
  };
  const setSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsServiceSelected(isChecked);
    if (isChecked) {
      toast.success('Добавлена услуга сервиса'); // Сообщение при включении
    } else {
      toast.warning('Услуга сервиса отключена'); // Сообщение при отключении
    }
  };
  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };



 

  const totalPrice = isServiceSelected
    ? selectedMiner.price + service[0]?.price
    : selectedMiner.price;
  const serviceProps = isServiceSelected ? service[0]?.id : 0;




  SwiperCore.use([Mousewheel, Pagination]);



  return (
    
      <section className="card cont" id="card">
        <div className="container">
          <div className="bread q">
            <a href="/">Главная</a>
            <a href="/miners">Каталог</a>
            <a href="#">
              Асик майнер {currentSubBrand?.name} {currentModell?.name}
            </a>
          </div>
          <div className="card__box q">
            <div className="card__info">
              <div className="swiper5">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <img src={selectedMiner?.img[0]} alt='miner'/>
                  </div>
                </div>
              </div>
              {/* {selectedMiner?.img.length > 0 &&
              <div className="swiper55">
              <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={{
          nextEl: '.swiper-button-next5',
		      prevEl: '.swiper-button-prev5',
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          968: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1900: {
            slidesPerView: 4,
            spaceBetween: '15px',
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwipere"
      >
        
            {selectedMiner?.img.length > 1 && (
    selectedMiner?.img.map((i) => (
        <SwiperSlide>
            <img src={i} />
        </SwiperSlide>
    ))
)}
       </Swiper>
  
              </div>
} */}
              
              {/* <div className="about__arrows q">
                <div className="swiper-button-prev5 about-arr">
                  <img src="/img/l.svg" alt="" className="svg" />
                </div>
                <div className="swiper-button-next5 about-arr">
                  <img src="/img/r.svg" alt="" className="svg" />
                </div>
              </div> */}
            </div>
            <div className="card__content">
              <h1>
                {currentSubBrand?.name} {currentModell?.name}
              </h1>
              <div className="card__row q">
                <p>{currentBrand?.name}</p>
                <p>Рейтинг:</p>
                <div className="card__stars q">
                  <img src="/img/st.svg" alt="" />
                  <img src="/img/st.svg" alt="" />
                  <img src="/img/st.svg" alt="" />
                  <img src="/img/st.svg" alt="" />
                  <img src="/img/st.svg" alt="" />
                </div>
              </div>
              <p className="card__title">Характеристики:</p>
              <div className="card__flex q">
                <div className="card__item q">
                  <img src="/img/ic1.svg" alt="" />
                  <p>Потребление: {selectedMiner?.expense}Вт ± 10%</p>
                </div>
                <div className="card__item q">
                  <img src="/img/ic2.svg" alt="" />
                  <p>Хэшрейт: {currentHashrate?.rate}</p>
                </div>
                <div className="card__item q">
                  <img src="/img/ic3.svg" alt="" />
                  {Array.isArray(currentCurrency) && (
  <p>Криптовалюта: {currentCurrency.join('/')}</p>
)}                </div>
                <div className="card__item q">
                  <img src="/img/ic4.svg" alt="" />
                  <p>Алгоритм: {currentAlgorithm?.algo}</p>
                </div>
              </div>
              <p className="card__title">Описание:</p>
              <p className="card__text" style={{ whiteSpace: 'pre-wrap' }}>{selectedMiner?.description}</p>
             
                  <div className="annotation">
                  <a href="#descriptions">Подробная информация</a>
                  </div>

              {user?.role === 'admin' ? 
    <button className='btnchange' type='button' onClick={(e) => {
      e.stopPropagation();
      openModal();
    }}>Изменить</button>
    : null}
    
  <Modal
isOpen={modalIsOpen}
onRequestClose={closeModal}
style={customStyles}
contentLabel="Example Modal"

>
<FormUpdateMiner miner={selectedMiner} />
</Modal>
              

              <div className="card__area">
                
                <div className="price-container">
                  <span>Цена</span>
                  <p className="card__sum">{totalPrice.toLocaleString()} ₽</p>
                  <p className="card__sub">
                    * Цена может варьироваться на момент обращения в зависимости <br /> от курса
                    доллара и криптовалюты
                  </p>
                  
                  <div className="annotation">
                    <label>
                      <input
                        className="auth-form__checkbox"
                        onChange={setSelected}
                        type="checkbox"
                      />
                      Service
                    </label>
                    <span
                      className="question-icon"
                      onClick={toggleTooltip}
                      style={{ cursor: 'pointer', marginLeft: '10px' }}
                    >
                      ❓
                    </span>{' '}
                    {showTooltip && (
                      <div className="tooltip" style={{ marginLeft: '10px', width: '200px' }}>
                        Специальный сервис для майнеров представлен в нашем магазине в виде услуги
                        предоставления кастомного ПО для асика.
                        <span
                          className="close-tooltip"
                          onClick={toggleTooltip}
                          style={{ cursor: 'pointer', marginLeft: '10px' }}
                        >
                          ✖
                        </span>{' '}
                      </div>
                    )}
                  </div>

                </div>
                <div className="card__links q">
                  <a href="#"
				  	 className="card__btn btn btn_3"
					 onClick={sendMessageToTelegram}>
                    {buttonText}
                  </a>
                  <div className="card__btns q">
                  <a
                    href="#"
                    className="card__like q"
                    onClick={() => {
                      AddFavorite(selectedMiner.id);
                    }}
                  >
                    <img src="/img/t1.svg" alt="" />
					
                  </a>
				  {text1}
                  <a href="#"
				  	 className="card__basket q"
					 onClick={AddItemInOrder}>
                    <img src="/img/t2.svg" alt="" />
                  </a>
				  {text2}
                </div>



                
                  <div className="card__per q">
                    <a href="/service" className="card__link q">
                      <img src="/img/b1.svg" alt="" className="svg" />
                      <p>Сервисное обсулуживание</p>
                    </a>
                    <a href="/leasing" className="card__link q">
                      <img src="/img/b2.svg" alt="" className="svg" />
                      <p>Лизинг оборудования</p>
                    </a>
                    <a href="/guarantee" className="card__link q">
                      <img src="/img/b3.svg" alt="" className="svg" />
                      <p>Проверить гарантию</p>
                    </a>
					{user?.role === 'admin' && (
          <button className="delete-button" onClick={minerDelete}>
            Удалить
          </button>
        )}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-card" id='descriptions'>
  <h2>Подробнее</h2>
  <p>{currentSubBrand?.name} {currentModell?.name}</p>
  <div className="tabs">

    <ul>

      <li>
              <a
                href="#description"
                className={activeTab === 'description' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  switchTab('description');
                }}
                >
                Описание
              </a>
        </li>

      <li>
              <a
                href="#characteristics"
                className={activeTab === 'characteristics' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  switchTab('characteristics');
                }}
                >
                Характеристики
              </a>
        </li>

      <li>
              <a
                href="#payment"
                className={activeTab === 'payment' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  switchTab('payment');
                }}
                >
                Оплата
              </a>
        </li>

      <li>
              <a
                href="#delivery"
                className={activeTab === 'delivery' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  switchTab('delivery');
                }}
                >
                Доставка
              </a>
        </li>

    </ul>

    <div className="tab-content">
      <div id="description" className={`tab-pane ${activeTab === 'description' ? 'active' : ''}`}>

        <h3>Описание товара</h3>
        <p style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: selectedMiner?.about }}></p>
        
      </div>
      <div id="characteristics" className={`tab-pane ${activeTab === 'characteristics' ? 'active' : ''}`}>
        <table>
          
          <tr>
          
            <th>Потребление</th>
            <td>{selectedMiner?.expense} Вт ± 10%</td>

          </tr>
          <tr>

            <th>Хэшрейт</th>
            <td>{currentHashrate?.rate}</td>

          </tr>
          <tr>

            <th>Криптовалюта</th>
            <td>{currentCurrency.join('/')}</td>

          </tr>
          <tr>

            <th>Алгоритм</th>
            <td>{currentAlgorithm?.algo}</td>

          </tr>
          <tr>

            <th>Рабочее напряжение</th>
            <td>{selectedMiner?.volt} volt</td>

          </tr>
          <tr>

            <th>Тип Охлаждения </th>
            <td>{selectedMiner?.cooling}</td>

          </tr>
          <tr>

            <th>Рабочая Температура </th>
            <td>{selectedMiner?.temp} °C</td>

          </tr>
          <tr>

            <th>Размеры </th>
            <td>{selectedMiner?.size}</td>

          </tr>
          <tr>

            <th>Уровень Шума </th>
            <td>{selectedMiner?.loud} дБ </td>

          </tr>
        </table>
      </div>
      <div id="payment" className={`tab-pane ${activeTab === 'payment' ? 'active' : ''}`}>
        <p>Информация об оплате</p>
      </div>
      <div id="delivery" className={`tab-pane ${activeTab === 'delivery' ? 'active' : ''}`}>
        <p>Информация о доставке</p>
      </div>
    </div>
  </div>
</div>


        <div className="main main-card">
          <div className="container">
            <h2>
              С этим товаром <br className="mob" /> покупают
            </h2>
			
			<Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          968: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1900: {
            slidesPerView: 4,
            spaceBetween: '15px',
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        
            {miners.length > 0 ? (
    miners.map((miner) => (
        <SwiperSlide key={miner.id}>
            <MinerItem miner={miner} />
        </SwiperSlide>
    ))
) : (
    <div>Нет доступных майнеров</div>
)}
       </Swiper>
          </div>
        </div>
        <div className="main-tel q">
          <img src="/img/bg1.png" alt="" className="main-tel__bg" />
          <img src="/img/tel.svg" alt="" className="main-tel__icon" />
          <div className="main-tel__content">
            <h3>наш канал в Telegram</h3>
            <p>
              Еще больше оборудования в наличии и под заказ в <br /> нашем Telegram канале
            </p>
            <a  href="https://t.me/PitBit003" target="_blank" className="btn">
              Перейти на канал
            </a>
          </div>
          <img src="/img/co.png" alt="" className="main-tel__code" />
        </div>
      </section>
    
  );
}

export default MinerPage;
