import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';




function ContactsPage(): JSX.Element {


  


    return (
      <section className="reviews cont" id="reviews cont">
			<div className="container">
				<div className="bread q">
					<a href="/">
						Главная
					</a>
					<a href="#">
						Контакты
					</a>
				</div>
				<h1>
					контакты
				</h1>
				<div className="cont__box q">
					<div className="cont__content">
						<div className="contacts__item q">
							<img src="/img/c1.svg" alt=""/>
							<div className="cont__area">
								<span>
									Телефон
								</span>
								<a href="tel:+79660211112">
								+7 (966) 021-11-12
								</a>
							</div>
						</div>
						<div className="contacts__item q">
							<img src="/img/c2.svg" alt=""/>
							<div className="cont__area">
								<span>
									Почта
								</span>
								<a href="mailto:pitbit.msk@yandex.ru">
									pitbit.msk@yandex.ru
								</a>
							</div>
						</div>
						<div className="contacts__item q">
							<img src="/img/c3.svg" alt=""/>
							<div className="cont__area">
								<span>
									Адрес
								</span>
								<p>
								Москва, улица Шеногина<br className="mob"/> 4к1
								</p>
							</div>
						</div>
						<div className="contacts__item q">
							<img src="/img/c4.svg" alt=""/>
							<div className="cont__area">
								<span>
									график работы
								</span>
								<p>
									График работы: Пн-сб с 10:00 до 20:00
								</p>
							</div>
						</div>
						<div className="footer__socials q">
							<a href="https://vk.com/pitbitmining" target="_blank">
								<img src="/img/f11.svg" alt="vk.com"/>
							</a>
							<a href="https://t.me/PitBit003"  target="_blank">
								<img src="/img/f22.svg" alt="tg"/>
							</a>
							<a href="#" target="_blank">
								<img src="/img/f33.svg" alt="avito"/>
							</a>
							<a href="#" target="_blank">
								<img src="/img/f44.svg" alt="youtube"/>
							</a>
							<a href="#" target="_blank">
								<img src="/img/f55.svg" alt="inst"/>
							</a>
							<a href="https://wa.me/+79660211112" target="_blank">
								<img src="/img/f66.svg" alt="wa"/>
							</a>
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
		</section>
    
    )
}
export default ContactsPage;