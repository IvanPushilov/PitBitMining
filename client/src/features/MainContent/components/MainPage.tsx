import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper/core';
import { Pagination, Navigation, Autoplay} from 'swiper/modules';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import type { RootState } from '../../../store/store';
import MinerItem from '../../Miners/components/MinerItem';
// import '../styles/swiper.scss'
import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/css/navigation';
import FeedBack from '../../FeedBack/components/FeedBack';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MainPage(): JSX.Element {
  
  const [buttonText, setButtonText] = useState('Отправить заявку в Telegram');
  const user = useSelector((store: RootState) => store.auth.user);
  const miners = useSelector((store: RootState) => store.miners.miners);


 

  async function sendMessageToTelegram(messageValue: string): Promise<void> {
	if(!user){
		toast.error('Для отправки необходимо авторизоваться');
	  }else{
    const token: string = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chat_id: string = import.meta.env.VITE_TELEGRAM_CHAT_ID; 
    const message = `${messageValue} Пользователь: ${user?.name}, телефон: ${user?.phone}, email: ${user?.email}`;;
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

  let banners = [
    {
      id: 1,
      img: '/img/main.png',
      title: 'Лизинг оборудования',
      description: 'Получите доступ к мощным майнерам через удобный лизинг',
    },
    {
      id: 2,
      img: '/img/main2.png',
      title: 'Лизинг оборудования2',
      description: 'Получите лизинг',
    },
    {
      id: 3,
      img: '/img/main3.png',
      title: 'Лизинг оборудования3',
      description: 'Получите доступ ',
    },
  ];

  SwiperCore.use([Pagination]);
  return (
   <div className="body-wrap">
		<header className="header" id="header">
		<div className="nav__bottom">
					<div className="container">
						<ul>
							<li>
								<a href="#">
									Antminer
								</a>
							</li>
							<li>
								<a href="#">
									Whatsminer
								</a>
							</li>
							<li>
								<a href="#">
									Elpha Pex
								</a>
							</li>
							<li>
								<a href="#">
									Ice River
								</a>
							</li>
							<li>
								<a href="#">
									Jas miner
								</a>
							</li>
						</ul>
					</div>
				</div>
		<div className="header__wrap">
      <img src="img/fig1.png" alt="" className="header__fig1" />
      <img src="img/fig2.png" alt="" className="header__fig2" />
	  <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{
              delay: 8000,
              disableOnInteraction: true,
            }}
			slidesPerView={1}
            slidesPerGroup={1}
            navigation={true}
            pagination={{clickable: true}}
            className="swiper1"
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner.id}>
                <picture>
                  <source srcSet="img/main3.png" media="(max-width: 576px)" />
                  <source srcSet="img/main2.png" media="(max-width: 1200px)" />
                  <img src="img/main.png" alt="" />
                </picture>
                <h1>{banner?.title}</h1>
                <p>{banner?.description}</p>
                <a href="/leasing" className="btn">Подробнее</a>
              </SwiperSlide>
            ))}
          </Swiper>
			</div>
		</header>
		<section className="main" id="main">
			<div className="container">
				<h2>
					Каталог оборудования
				</h2>
				
				<Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        pagination={{
          el: '.swiper-pagination2',
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
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
          

				
				<div className="main-tel q">
					<img src="/img/bg1.png" alt="" className="main-tel__bg"/>
					<img src="/img/tel.svg" alt="" className="main-tel__icon"/>
					<div className="main-tel__content">
						<h3>
							наш канал в Telegram
						</h3>
						<p>
							Еще больше оборудования в наличии и под заказ в <br/> нашем Telegram канале
						</p>
						<a  href="https://t.me/PitBit003" target="_blank" className="btn">
							Перейти на канал
						</a>
					</div>
					<img src="/img/co.png" alt="" className="main-tel__code"/>
				</div>
				<div className="main-wrap q">
					<picture>
						<source srcSet="/img/bg222.png" media="(max-width: 576px)"/>
						<source srcSet="/img/bg22.png" media="(max-width: 1200px)"/>
						<img src="/img/bg2.png" alt="" className="main-wrap__bg"/>
					</picture>
					<div className="main-wrap__content">
						<h3>
							Калькулятор доходности
						</h3>
						<p>
							Актуальные цифры по доходности прошивки PitBit, а так <br/> же сток на данный момент
						</p>
						<a href="#" className="btn btn_2" onClick={() =>
							 sendMessageToTelegram('Оставил заявку на расчет доходности')}>
						{buttonText}
						</a>
					</div>
					<img src="/img/pic2.png" alt="" className="main-wrap__pic"/>
					<img src="/img/pic3.png" alt="" className="main-wrap__pic2"/>
				</div>
			</div>
		</section>
		<section className="about" id="about">
			<div className="container">
				<div className="about__box q">
					<div className="about__content">
						<h2>
							О нас
						</h2>
						<div className="about__text">
							<p>
								Добро пожаловать в PITBIT MINING
							</p>
							<p>
								Мы - Московская компания, которая занимается продажей оборудования для майнинга. На рынке с 2019
								года
							</p>
							<p>
								У нас Вы найдете широкий ассортимент качественного оборудования в наличии в Москве, а так же под
								заказ с нашего склада в Китае
							</p>
						</div>
						<div className="about__row q">
							<div className="about__block">
								<span>
									5
								</span>
								<p>
									Лет в сфере майнинга
								</p>
							</div>
							<div className="about__block">
								<span>
									10 000
								</span>
								<p>
									Довольных покупателей
								</p>
							</div>
							<div className="about__block">
								<span>
									100%
								</span>
								<p>
									Самые интересные цены
								</p>
							</div>
							<div className="about__block">
								<span>
									99,9%
								</span>
								<p>
									Положительных отзывов
								</p>
							</div>
						</div>
					</div>
					<div className="about__info">
						
					
			<Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={
		{nextEl: '.swiper-button-next3',
		prevEl: '.swiper-button-prev3',}
		}
        pagination={{
          el: '.swiper-pagination2',
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          968: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1900: {
            slidesPerView: 2,
            spaceBetween: '15px',
          },
        }}
        modules={[Pagination, Navigation]}
        className="swiper3"
		style={{width: '627px', gap: '10px'}}
      >
			<SwiperSlide>
                <img src="img/directors/Andre.jpg" alt="" />
                <p>Демидов Андрей</p>
                <span>Основатель компании</span>
            </SwiperSlide>
            <SwiperSlide>
                <img src="img/directors/artyom.jpg" alt="" />
                <p>Артем</p>
                <span>Руководитель по развитию программного обеспечения и IT решений</span>
            </SwiperSlide>
            <SwiperSlide>
                <img src="img/directors/yan.jpg" alt="" />
                <p>Ян</p>
                <span>Руководитель отдела сервисного обслуживания и логистики</span>
            </SwiperSlide>
            <SwiperSlide>
                <img src="img/directors/klim.jpg" alt="" />
                <p>Клим</p>
                <span>Руководитель отдела тестирования и апгрейда оборудования</span>
            </SwiperSlide>
            <SwiperSlide>
                <img src="img/directors/paul.jpg" alt="" />
                <p>Павел</p>
                <span>Руководитель по развитию проектов</span>
            </SwiperSlide>
			<SwiperSlide>
                <img src="img/directors/anna.jpg" alt="" />
                <p>Анна</p>
                <span>Менеджер по продажам</span>
            </SwiperSlide>
			<SwiperSlide>
                <img src="img/directors/egor.jpg" alt="" />
                <p>Егор</p>
                <span>Менеджер</span>
            </SwiperSlide>
        </Swiper>
		<div className="swiper-pagination 3">
			
			<div className="about__arrows q">
							<div className="swiper-button-prev3 about-arr">
								<img src="img/l.svg" alt="" className="svg"/>
							</div>
							<div className="swiper-button-next3  about-arr">
								<img src="img/r.svg" alt="" className="svg"/>
							</div>
						</div>

						</div>

					</div>
				</div>
			</div>
		</section>
		<section className="rev" id="rev">
			<div className="container">
				<div className="main-wrap q">
					<picture>
						<source srcSet="/img/bg333.png" media="(max-width: 576px)"/>
						<source srcSet="/img/bg33.png" media="(max-width: 1200px)"/>
						<img src="/img/bg3.png" alt="" className="main-wrap__bg"/>
					</picture>
					<div className="main-wrap__content">
						<h3>
							Подберем для вас оборудование <br/> по актуальным ценам
						</h3>
						<p>
							Оставьте заявку на подбор оборудования, нажав на кнопку ниже. <br/> В течении 30 минут наш
							сотрудник отправит информацию на Ваш Email или в удобные социальные сети
						</p>
						<a href="#" className="btn btn_2" onClick={() =>
							 sendMessageToTelegram('Запрашивает анкету на подбор оборудования')}>
							{buttonText}
						</a>
					</div>
					<img src="/img/pic4.png" alt="" className="main-wrap__pic"/>
				</div>
				<h2>
					отзывы
				</h2>
				
				<FeedBack/>
			</div>
		</section>
		<section className="contacts" id="contacts">
			<div className="container">
				<div className="contacts__box q">
					<div className="contacts__content">
						<img src="/img/c.png" alt="" className="contacts__pic"/>
						<h2>
							Контакты
						</h2>
						<div className="contacts__item q">
							<img src="/img/c1.svg" alt=""/>
							<a href="tel:+79661611116">
							+7 (966) 021-11-12
							</a>
						</div>
						<div className="contacts__item q">
							<img src="/img/c2.svg" alt=""/>
							<a href="mailto:pitbit.msk@yandex.ru">
								pitbit.msk@yandex.ru
							</a>
						</div>
						<div className="contacts__item q">
							<img src="/img/c3.svg" alt=""/>
							<p>
							Москва, улица  <br className="mob"/>Шеногина 4к1
							</p>
						</div>
						<div className="contacts__item q">
							<img src="/img/c4.svg" alt=""/>
							<p>
								График работы: Пн-сб с 10:00 до 20:00
							</p>
						</div>
					</div>
					<div id="map">
					<YMaps>
          <Map
            defaultState={{
              center: [55.764592, 37.506199],
              zoom: 15,
              controls: ['zoomControl', 'fullscreenControl'],
            }}
            style={{ maxWidth: '1170px', height: '406px' }}
            modules={['control.ZoomControl', 'control.FullscreenControl']}
          >
            <Placemark defaultGeometry={[55.764592, 37.506199]} />
          </Map>
        </YMaps> 
					</div>
				</div>
			</div>
		</section>
    </div>
  );
}

export default MainPage;
