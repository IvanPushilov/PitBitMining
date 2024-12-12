import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function PartnersHostingPage(): JSX.Element {
  const user = useSelector((store: RootState) => store.auth.user);
  const [buttonText, setButtonText] = useState('Отправить заявку в Telegram');

  async function sendMessageToTelegram(): Promise<void> {
	if(!user){
		toast.error('Для отправки необходимо авторизоваться');
	  }else{
    const token: string = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chat_id: string = import.meta.env.VITE_TELEGRAM_CHAT_ID;  
    const message =  `Пользователь ${user?.name} оставил заявку на консультацию по хостингу, телефон: ${user?.phone}, email: ${user?.email}`;
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

  return (
    <>
    <section className="top" id="top">
			<picture>
				<source srcSet="/img/par3.png" media="(max-width: 576px)"/>
				<source srcSet="/img/par2.png" media="(max-width: 1200px)"/>
				<img src="/img/par1.png" alt="" className="top__bg"/>
			</picture>
			<div className="container">
				<div className="top__wrap">
					<div className="bread q">
						<a href="/">
							Главная
						</a>
						<a href="#">
							Система управления майнерами
						</a>
					</div>
					<h1>
						Партнерские хостинги
					</h1>
					<img src="/img/top1.png" alt="" className="top__pic"/>
				</div>
			</div>
		</section>
		<section className="par" id="par">
			<div className="container">
				<div className="par__top">
					<p className="par__title">
						Что такое хостинг/майнинг-отель?
					</p>
					<p className="par__text">
						Майнинг-отели, или хостинги для майнинга, представляют собой специализированные помещения,
						предназначенные для размещения и обслуживания майнингового оборудования. В отличие от традиционных
						центров обработки данных (ЦОД), майнинг-отели сосредоточены исключительно на нуждах майнеров,
						предоставляя все необходимые условия для эффективной и безопасной работы оборудования.
					</p>
				</div>
				<h2>
					Преимущества хостинга
				</h2>
				<div className="par__row q">
					<div className="par__item">
						<img src="/img/par1.svg" alt=""/>
						<span>
							Экономия ресурса
						</span>
						<p>
							Размещение оборудования в майнинг-отеле обходится дешевле, чем самостоятельное обслуживание,
							благодаря снижению затрат на электроэнергию, охлаждение и интернет
						</p>
					</div>
					<div className="par__item">
						<img src="/img/par2.svg" alt=""/>
						<span>
							Безопасность и мониторинг
						</span>
						<p>
							Ваше оборудование будет находиться подкруглосуточным наблюдением профессионалов, что минимизирует
							риск
							поломок и повышает общую эффективность.
						</p>
					</div>
					<div className="par__item">
						<img src="/img/par3.svg" alt=""/>
						<span>
							Комфорт и стабильность
						</span>
						<p>
							Высокая скорость интернета, оптимальные температурные условия и профессиональное обслуживание
							позволяютвашему оборудованию работать на максимальной мощности.
						</p>
					</div>
					<div className="par__item">
						<img src="/img/par4.svg" alt=""/>
						<span>
							Защита от краж и повреждений
						</span>
						<p>
							Современные системы безопасности и круглосуточная охрана защищают ваше оборудование от краж и
							вандализма.
						</p>
					</div>
					<div className="par__item">
						<img src="/img/par5.svg" alt=""/>
						<span>
							Снижение шума и электропотребления дома
						</span>
						<p>
							Перенос оборудования в специализированное помещение освобождает вас от шума и снижает нагрузку на
							домашние электросети.
						</p>
					</div>
					<div className="par__item">
						<img src="/img/par6.svg" alt=""/>
						<span>
							Гибкость в масштабировании
						</span>
						<p>
							Возможность лизинга оборудования позволяет легко масштабировать ваши майнинговые мощности по мере
							необходимости.
						</p>
					</div>
				</div>
				<div className="par__content">
					<h2>
						Техническая поддержка на локации и по телефону
					</h2>
					<p>
						Майнинг-отели предоставляют не только круглосуточную физическую техническую поддержку на месте, но и
						дистанционную помощь через телефон или онлайн. Это позволяет оперативно решать возникающие вопросы,
						начиная от размещения оборудования до устранения неполадок. Ваше оборудование будет обслуживаться
						квалифицированными специалистами, которые следят за его стабильной работой и производительностью.
					</p>
					<h2>
						Прозрачность и безопасность
					</h2>
					<p>
						При заключении договора вы можете быть уверены в прозрачности и честности отношений. Все условия
						размещения и обслуживания оговариваются заранее, что исключает возможность обмана и мошенничества.
						Питбит Майнинг предлагает вам надежные и выгодные условия для размещения вашего оборудования в
						майнинг-отелях наших партнеров. Мы обеспечиваем высокое качество сервиса, безопасность и
						круглосуточную поддержку, чтобы ваше оборудование работало эффективно и без перебоев. Свяжитесь с нами
						для получения консультации и размещения вашего оборудования в одном из наших современных
						майнинг-отелей.
					</p>
				</div>
			</div>
		</section>
		<section className="call" id="call">
			<div className="container">
				<div className="call__wrap">
					<picture>
						<source srcSet="/img/call2.png" media="(max-width: 1200px)"/>
						<img src="/img/call1.png" alt="" className="call__bg"/>
					</picture>
					<div className="call__content">
						<p className="call__title">
							Получите <br/>
							профессиональную консультацию<span>.</span>
						</p>
						<p className="call__txt">
							Оставьте заявку, и наши менеджеры свяжутся с Вами для <br/> проведения консультации
						</p>
					</div>
					<div className="call__area">
          <h2>
            Оставьте заявку
          </h2>
          <p>Нажимая на кнопку, вы отправите <br/> 
          заполненную вашими регистрационнымыми данными заявку
          </p>
          <small>Доступно только авторизованным пользователям</small>
          <form action="#" className="call__form">
            
            
            <button className="btn btn_2"
            type="button"
            onClick={sendMessageToTelegram}>
              {buttonText}
            </button>
            <p>
              Нажимая на кнопку я подтверждаю, что ознакомлен и согласен с <br/> <a href="/policy" target="_blank">
                уловиями политики
                конфиденциальности</a>
            </p>
          </form>
        </div>
				</div>
			</div>
		</section>
    </>
  );
}
export default PartnersHostingPage;
