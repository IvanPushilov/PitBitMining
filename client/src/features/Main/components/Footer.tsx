import React from 'react';


function Footer(): JSX.Element {

  return (
    <footer className="footer" id="footer">
    <div className="container">
      <div className="footer__box q">
        <div className="footer__content">
          <img src="/img/footer-logo.svg" alt="" className="footer__logo"/>
          <div className="footer__socials q">
            <a href="https://vk.com/pitbitmining" target="_blank">
              <img src="/img/f1.svg" alt="vk.com"/>
            </a>
            <a href="https://t.me/PitBit003" target="_blank">
              <img src="/img/f2.svg" alt="telegram"/>
            </a>
            <a href="https://www.avito.ru/user/e74cc6afaec339ab9a70fb18c572b17f/profile?src=sharing"
             target="_blank">
              <img src="/img/f3.svg" alt="avito"/>
            </a>
            <a href="https://youtube.com/@pitbit003?si=cHTi2XgS7JkzQJnK" target="_blank">
              <img src="/img/f4.svg" alt="youtube"/>
            </a>
            <a href="https://www.instagram.com/pitbit_mining?igsh=MWVpanZpbTQ2ZWt1dQ%3D%3D&utm_source=qr"
             target="_blank">
              <img src="/img/f5.svg" alt="inst"/>
            </a>
            <a href="https://wa.me/+79660211112" target="_blank">
              <img src="/img/f6.svg" alt="whatsapp"/>
            </a>
          </div>
        </div>
        <div className="footer__info q">
          <div className="footer__item">
            <p>
              Компания
            </p>
            <ul>
              <li>
                <a href="/">
                  О нас
                </a>
              </li>
              <li>
                <a href="#">
                  Сервис
                </a>
              </li>
              <li>
                <a href="/about">
                  Клиенты о нас
                </a>
              </li>
              <li>
                <a href="#">
                  Помощь майнеру
                </a>
              </li>
              <li>
                <a href="/contacts">
                  Контакты
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__item">
            <p>
              Услуги
            </p>
            <ul>
              <li>
                <a href="/miners">
                  Каталог оборудования
                </a>
              </li>
              <li>
                <a href="/leasing">
                  Лизинг оборудования
                </a>
              </li>
              <li>
                <a href="/guarantee">
                  Проверить гарантию
                </a>
              </li>
              <li>
                <a href="/miner-control">
                  Система управления майнерами
                </a>
              </li>
              <li>
                <a href="/partners-hosting">
                  Партнерские хостинги
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__item">
            <p>
              кОНТАКТЫ
            </p>
            <div className="footer__el q">
              <img src="/img/ff1.svg" alt=""/>
              <p>
              Москва, улица Шеногина<br className="mob"/> 4к1
              </p>
            </div>
            <div className="footer__el q">
              <img src="/img/ff2.svg" alt=""/>
              <a href="mailto:pitbit.msk@yandex.ru">
                pitbit.msk@yandex.ru
              </a>
            </div>
            <div className="footer__el q">
              <img src="/img/ff3.svg" alt=""/>
              <a href="tel:+79660211112">
              +7 (966) 021-11-12
              </a>
            </div>
            <p className="footer__sub">
              График работы: Пн-сб с <br className="mob"/> 10:00 до 20:00
            </p>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>
        © ООО «ПИТБИТ МАЙНИНГ» 2019-2024 <br/>
          ОГРН {' '}1237700801722 <br/>
          <a href="/policy" target="_blank"> Политика конфиденциальности</a>
        </p>
      </div>
    </div>
  </footer>
  );
}

export default Footer;
