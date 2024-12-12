import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MinerControlPage(): JSX.Element {
  const user = useSelector((store: RootState) => store.auth.user);
  const [buttonText, setButtonText] = useState('Отправить заявку в Telegram');

  async function sendMessageToTelegram(): Promise<void> {
	if(!user){
		toast.error('Для отправки необходимо авторизоваться');
	  }else{
    const token: string = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chat_id: string = import.meta.env.VITE_TELEGRAM_CHAT_ID;  
    const message =  `Пользователь ${user?.name} оставил заявку на консультацию по системе удаленного мониторинга, телефон: ${user?.phone}, email: ${user?.email}`;
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
    <section className="top top2" id="top">
			<picture>
				<source srcSet="img/par3.png" media="(max-width: 576px)"/>
				<source srcSet="img/par2.png" media="(max-width: 1200px)"/>
				<img src="img/par1.png" alt="" className="top__bg"/>
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
						Система удаленного мониторинга PitBit ONLINE
					</h1>
					<img src="img/top2.png" alt="" className="top__pic"/>
				</div>
			</div>
		</section>
		<section className="par" id="par">
			<div className="container">
				<div className="par__info">
					<p>
						Уникальный сервис, который позволяет отслеживать работу асика и полностью управлять им из любой точки
						мира с помощью обычного компьютера или смартфона.
					</p>
					<p>
						Вы можете дистанционно выбрать режим разгона асика, настроить кулера, изменить пул, задать расписание
						работы режимов, отслеживать статистику работы асика и логи. Так же предусмотрена система автотюна,
						которая автоматически подберет необходимые настройки напряжения блока питания под заданный хешрейт с
						целью минимизации электропотребления.
					</p>
					<p>
						Если асик отключится по какой-либо причине, вам тут же придет уведомление об этом и вы сможете
						оперативно устранить причину неисправности.
					</p>
					<p>
						Система мониторинга, за счет своей сложной архитектуры и отлаженных внутренних процессов, позволит
						вашему асику работать на большем хешрейте с пониженным потреблением и увеличенным аптаймом, что
						позволит вам получать до 30% больше дохода от майнинга. Система бесплатна, входит в стоимость
						прошивки. В прошивке отсутствуют какие-либо комиссии за пользование, поэтому нужно оплатить один раз и
						уже пользоваться всем функционалом.
					</p>
					<p>
						А главное, приобретая прошивку с системой мониторинга , вы получаете продукт, который постоянно
						совершенствуется и развивается, поэтому с каждым новым обновлением ваш асик будет работать более
						производительно.
					</p>
				</div>
			</div>
		</section>
		<section className="call" id="call">
			<div className="container">
				<div className="call__wrap">
					<picture>
						<source srcSet="img/call2.png" media="(max-width: 1200px)"/>
						<img src="img/call1.png" alt="" className="call__bg"/>
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
export default MinerControlPage;
