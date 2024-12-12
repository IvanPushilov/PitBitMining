import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/nav.css';
import { useSelector } from 'react-redux';
import { type RootState, useAppDispatch } from '../../../store/store';
import { authLogout } from '../../Auth/authSlice';
import * as api from '../../Auth/api';
import logo from '/pitmining.png';
import cart from '/cart.png';
import fav from '/favorite.png';
import menu from '/menu.png';

function NavBar(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useSelector((store: RootState) => store.auth.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  

  const handleLogout = async (): Promise<void> => {
    await api.logoutFetch().then((data) => {
      if (data.message === 'success') {
        dispatch(authLogout()).catch(console.log);
        window.location.reload();
      }
    });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
     <div className='headerr'>
      <div className='div'>
      <div className='menu-icon' onClick={toggleMenu}>
          <img src={menu} style={{ width: '40px', height: '40px' }} alt="Menu" />
        </div>
        <img loading="lazy" className="imglog" src={logo} alt="logo" />
        {user && <span className='hello'>Hello, {user?.name}!</span>}
      {menuOpen && (
        <motion.div
          ref={menuRef}
          className="swipe-menu"
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <ul>
            <li><a className="link-profile" href="/">Главная</a></li>
            <li><a className="link-profile" href="/miners">Каталог</a></li>
            <li><a className="link-profile" href="/leasing">Лизинг</a></li>
            <li><a className="link-profile" href="/about">Клиенты о нас</a></li>
            <li><a className="link-profile" href="/contacts">Контакты</a></li>
            
            {user && (
              <>
                <li>
                  <a className="link-profile" href="/favorite">
                    Избранное
                  </a>
                </li>
                <li>
                  <a className="link-profile" href="/order">
                    Корзина
                  </a>
                </li>
                <li>
                <a className="link-profile" href="/profile">
                  <span> Личный кабинет</span>
                </a>
              </li>
              <li>
                <a
                  onClick={handleLogout}
                  className="link-profile"
                  href="/auth"
                >
                  Выход
                </a>
              </li>
              </>
            )}
          </ul>
        </motion.div>
      )}
         
        
        <div className='menu'>
          <a className="link-profile" href="/">Главная</a>
          <a className="link-profile" href="/miners">Каталог</a>
          <a className="link-profile" href="/leasing">Лизинг</a>
          <a className="link-profile" href="/about">Клиенты о нас</a>
          <a className="link-profile" href="/contacts">Контакты</a>
        </div>
        {user ? (
          <>
            <ul className="menu__group">
              <li>
                <a className="link-profile" href="/favorite">
                  <img loading="lazy" src={fav} alt="fav" style={{ width: '25px', height: '25px' }} />
                  Избранное
                </a>
              </li>
              <li>
                <a className="link-profile" href="/order">
                  <img loading="lazy" src={cart} alt="cart" style={{ width: '25px', height: '25px' }} />
                  Корзина
                </a>
              </li>
              <li>
                <a className="link-profile" href="/profile">
                  <svg
                    width="17px"
                    height="17px"
                    viewBox="0 0 20 20"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <title>Личный кабинет</title>
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-140.000000, -2159.000000)"
                        fill="#000000"
                      >
                        <g id="icons" transform="translate(56.000000, 160.000000)">
                          <path
                            d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998 M103.955674,2016.63598 C103.213556,2013.27698 100.892265,2010.79798 97.837022,2009.67298 C99.4560048,2008.39598 100.400241,2006.33098 100.053171,2004.06998 C99.6509769,2001.44698 97.4235996,1999.34798 94.7348224,1999.04198 C91.0232075,1998.61898 87.8750721,2001.44898 87.8750721,2004.99998 C87.8750721,2006.88998 88.7692896,2008.57398 90.1636971,2009.67298 C87.1074334,2010.79798 84.7871636,2013.27698 84.044024,2016.63598 C83.7745338,2017.85698 84.7789973,2018.99998 86.0539717,2018.99998 L101.945727,2018.99998 C103.221722,2018.99998 104.226185,2017.85698 103.955674,2016.63598"
                            id="profile_round-[#1342]"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                  hello, {user.name}!
                </a>
              </li>
              <li>
                <a
                  onClick={handleLogout}
                  className="link-profile"
                  href="/auth"
                >
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Выход
                </a>
              </li>
            </ul>
          </>
        ) : (
          <a className="link-profile" href="/auth">
            Авторизация
          </a>
        )}
        <div className='socialIcons'>
          <a href="https://vk.com/pitbitmining" target="_blank" className="nav__tel q">
          <div className="q">
								<img src="/img/nav1.svg" alt="" className="svg"/>
                </div>
							</a>
							<a href="https://t.me/PitBit003" target="_blank" className="nav__tel q">
              <div className="q">
								<img src="/img/nav2.svg" alt="" className="svg"/>
                </div>
							</a>
							<a href="https://wa.me/+79660211112" target="_blank" className="nav__tel q">
              <div className="q">
                <img src="/img/nav3.svg" alt="" className="svg"/>
							</div>
              </a>
						<a href="tel:+79661611116" className="nav__tel q">
							<div className="q">
								<img src="/img/nav4.svg" alt="" className="svg"/>
							</div>
							+7 (966) 021-11-12
						</a>
            </div>
        </div>
      </div>      
  );
}

export default NavBar;
