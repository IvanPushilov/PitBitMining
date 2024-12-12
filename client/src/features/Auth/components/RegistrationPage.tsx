/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { object, ref, string } from 'yup';
import { RootState, useAppDispatch } from '../../../store/store';
import { authRegistration } from '../authSlice';
import type { UserForRegistration } from '../type';
import { useSelector } from 'react-redux';

const checkfild = object().shape({
  name: string().required('Необходимо указать имя'),
  email: string().required('Необходимо указать электронную почту'),
  phone: string().required('Необходимо указать номер телефона'),
  password: string()
    .required('Необходимо указать пароль')
    .min(8, 'Пароль должен быть более 8 символов')
    .max(25, 'Пароль должен быть не более 25 символов'),
  rpassword: string()
    .required('Необходимо подтвердить пароль')
    .min(8, 'Пароль должен быть более 8 символов')
    .max(25, 'Пароль должен быть не более 25 символов')
    .oneOf([ref('password')], 'Пароли не совпадают'),
});

function RegistrationPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const message = useSelector((store: RootState) => store.auth.message);

  const [checked, setChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForRegistration>({
     resolver: yupResolver(checkfild),
      defaultValues: {
        phone: '+7',
      }
    });

  const closeModal = (modalContainer: HTMLElement) => {
    document.body.removeChild(modalContainer);
  };

  const showModal = (modalMessage: string) => {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.textContent = modalMessage;

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Закрыть';
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', () => {
      closeModal(modalContainer);
    });

    modal.appendChild(closeButton);
    modalContainer.appendChild(modal);
    document.body.appendChild(modalContainer);

    // Закрываем модальное окно при клике вне его области
    const closeOnClickOutside = (event: MouseEvent) => {
      if (!(event.target instanceof Node && modal.contains(event.target))) {
        closeModal(modalContainer);
        document.removeEventListener('click', closeOnClickOutside);
      }
    };

    document.addEventListener('click', closeOnClickOutside);
  };

  const registration: SubmitHandler<UserForRegistration> = async (data: UserForRegistration) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:\+7|8)\s*\(?\d{3}\)?\s*\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;

    if (!phoneRegex.test(data.phone)) {
      showModal('Введите корректный номер телефона!');
      return;
    }

    if (!emailRegex.test(data.email)) {
      showModal('Введите корректную почту!');
      return;
    }

    try {
      await dispatch(authRegistration(data));
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-form">
  <div className="auth-form__container">
    <div className="auth-form__content">
      <form className="auth-form__form" onSubmit={handleSubmit(registration)}>
        <div className="auth-form__input-group">
          <input
            type="text"
            className="auth-form__input"
            placeholder="Ваше имя"
            {...register('name')}
          />
          <i className="auth-form__icon" />
          <div className="auth-form__error">{errors.name?.message}</div>
        </div>
        <input
            type="text"
            className="auth-form__input"
            placeholder="Ваш номер телефона"
            {...register('phone')}
          />
          <i className="auth-form__icon" />
          <div className="auth-form__error">{errors.phone?.message}</div>
        <div className="auth-form__input-group">
          <input
            type="text"
            className="auth-form__input"
            placeholder="Электронная почта"
            {...register('email')}
          />
          <i className="auth-form__icon" />
          <div className="auth-form__error">{errors.email?.message}</div>
        </div>
        <div className="auth-form__input-group">
          <input
            type="password"
            className="auth-form__input"
            placeholder="Пароль"
            {...register('password')}
          />
          <i className="auth-form__icon" />
          <div className="auth-form__error">{errors.password?.message}</div>
        </div>
        <div className="auth-form__input-group">
          <input
            type="password"
            className="auth-form__input"
            placeholder="Повторите пароль"
            {...register('rpassword')}
          />
          <i className="auth-form__icon" />
          <div className="auth-form__error">{errors.rpassword?.message}</div>
        </div>
        <label>
          <input
            className="auth-form__checkbox"
            onChange={(e) => setChecked(e.target.checked)}
            checked={checked}
            type="checkbox"
          />
          Согласен с условиями обработки
          <br /> персональных данных
        </label>
        <div className="message-container"> {message}</div>
        <div className="auth-form__form-group">
          <button disabled={!checked} type="submit" className="auth-form__button">
            Регистрация
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
  );
}
export default RegistrationPage;
