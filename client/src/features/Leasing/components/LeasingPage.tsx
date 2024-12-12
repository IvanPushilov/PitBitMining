import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function LeasingPage(): JSX.Element {
  const [buttonText, setButtonText] = useState('Отправить заявку в Telegram');
  const user = useSelector((store: RootState) => store.auth.user);

  async function sendMessageToTelegram(): Promise<void> {
    if(!user){
      toast.error('Для отправки необходимо авторизоваться');
      }else{
    const token: string = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chat_id: string = import.meta.env.VITE_TELEGRAM_CHAT_ID; 
    const message =  `Пользователь ${user?.name} оставил заявку на лизинг, телефон: ${user?.phone}, email: ${user?.email}`;
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
    <section className="top top3" id="top">
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
          <a href="/miners">
            Каталог
          </a>
        </div>
        <h1>
          получите доступ к высокотехнологичному <br/> оборудованию без больших инвестиций
        </h1>
        <img src="/img/top6.png" alt="" className="top__pic"/>
      </div>
    </div>
  </section>
  <section className="par par3" id="par3">
    <div className="container">
      <div className="par__info">
        <p>
          <span>Лизинг</span> -инструмент, позволяющий вашей компании оперативно получать необходимые активы в
          долгосрочную
          аренду с правом их последующего выкупа. Клиент постепенно выплачивает лизинговой компании стоимость
          имущества в соответствии с утвержденным графиком платежей и согласованным первоначальным взносом.
        </p>
        <p>
          Лизинг сочетает в себе элементы аренды и кредита. По своей сути он представляет собой выгодную
          рассрочку с возможностью приобрести необходимый, как правило, дорогостоящий актив сейчас, когда у
          компании нет требуемых ресурсов в текущий момент времени, но их получение запланировано в дальнейшем.
        </p>
        <p>
          Отличие лизинга от кредита – меньший процент и простота оформления. Отличие лизинга от аренды –
          возможность дальнейшего выкупа актива (при финансовом лизинге)
        </p>
        <p className="leasing__title">
          <span>
            Участниками в лизинге выступают:
          </span>
        </p>
        <ul>
          <li>
            - лизинговая компания (тот, кто приобретает предмет договора лизинга и передает его клиенту);
          </li>
          <li>
            - лизингодатель (клиент, которому необходим определенный актив);
          </li>
          <li>
            - продавец или поставщик (компания, которая владеет этим активом и готова его продать);
          </li>
          <li>
            - страховая компания.
          </li>
        </ul>
        <p>
          На сегодняшний день в российской практике распространено 3 вида лизинга: финансовый, операционный,
          <br/>
          возвратный. Наиболее востребованным является финансовый лизинг.
        </p>
      </div>
      <div className="leasing__wrap">
        <img src="/img/bgg.png" alt="" className="leasing__bg"/>
        <h2>
          Финансовый лизинг
        </h2>
        <p className="leasing__text">
          это одна из форм долгосрочной аренды актива (оборудование, транспортное средство, недвижимость и тд.),
          при котором арендатор получает право пользования активом в течение определенного срока, по истечении
          которого он может выкупить актив по остаточной стоимости.
        </p>
        <p className="leasing__sub">
          Преимущества финансового лизинга:
        </p>
        <ul>
          <li className="q">
            <img src="/img/list.svg" alt=""/>
            <p>
              сохранение оборотного капитала (компании не нужно отвлекать денежные средства на выкуп предмета
              лизинга, достаточно лишь внести небольшую часть от стоимости актива, а в дальнейшем оплачивать
              только лизинговые платежи по согласованному графику. Это особенно выгодно компаниям, у которых
              высокие обороты по текущим расходам);
            </p>
          </li>
          <li className="q">
            <img src="/img/list.svg" alt=""/>
            <p>
              четкое представление по платежам (компании точно знают, какую сумму им необходимо «отложить» на
              покрытие лизингового платежа. Это позволяет оптимизировать денежный поток компании, с
              возможностью улучшить его финансовое состояние);
            </p>
          </li>
          <li className="q">
            <img src="/img/list.svg" alt=""/>
            <p>
              ускоренный процесс получение лизинга (как правило, лизинговые компании более лояльны к
              кредитоспособности клиента, чем банки);
            </p>
          </li>
          <li className="q">
            <img src="/img/list.svg" alt=""/>
            <p>
              налоговые льготы.
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div className="leasing__area">
      <div className="container">
        <h2>
          ЛИЗИНГ В Pitbit
        </h2>
        <p className="leasing__text">
          Наша компания готова предоставить своим клиентам покупку майнинг-оборудования в лизинг.
        </p>
        <ul>
          <li className="q">
            <img src="/img/list.svg" alt=""/>
            <p>
              Первоначальный взнос по лизингу – 30%.
            </p>
          </li>
          <li className="q">
            <img src="/img/list.svg" alt=""/>
            <p>
              Срок лизинга – от 18 месяцев.
            </p>
          </li>
          <li className="q">
            <img src="/img/list.svg" alt=""/>
            <p>
              Минимальная сумма – от 10 млн рублей.
            </p>
          </li>
          <li className="q">
            <img src="/img/list.svg" alt=""/>
            <p>
              Лимит первой сделки по лизингу – 30-40 млн рублей.
            </p>
          </li>
        </ul>
        <div className="leasing__block">
          <p className="leasing__name">
            Срок лизинга может быть уменьшен так же, как и первоначальный взнос, в зависимости от дальнейшего
            анализа компании, а лимит по сделке увеличен.
          </p>
          <p className="leasing__per">
            Стабильная работа компании и финансовая устойчивость – ваши преимущества!
          </p>
          <p className="leasing__per">
            Мы стараемся подбирать лучшие лизинговые условия для Вас, расширяя сотрудничество с другими
            лизинговыми компаниями.
          </p>
          <p className="leasing__per">
            Нашим клиентам одобряют лизинг в таким компаниях, как: ТРАНСЛИЗИНГ, МСБ-ЛИЗИНГ, РЕКОРД-ЛИЗИНГ.
          </p>
          <img src="/img/gift.png" alt=""/>
        </div>
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

export default LeasingPage;
