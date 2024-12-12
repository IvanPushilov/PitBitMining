/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { useAppDispatch } from '../../../store/store';
import type { UserForAuthorisation } from '../type';
import { authLogin } from '../authSlice';

const checkfild = object().shape({
  email: string().required('Необходимо указать электронную почту'),
  password: string().required('Необходимо указать пароль'),
});

function AuthorisationPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const message = useSelector((store: RootState) => store.auth.message);
 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForAuthorisation>({ resolver: yupResolver(checkfild) });

  const login: SubmitHandler<UserForAuthorisation> = async (data: UserForAuthorisation) => {
    try {
      await dispatch(authLogin(data));
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="auth-form">
    <div className="auth-form__container">
      <div className="auth-form__content">
        <form className="auth-form__form" onSubmit={handleSubmit(login)}>
      
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
          <div/>
          <div className="message-container"> {message}</div>
          <div className="auth-form__form-group">
            <button type="submit" className="auth-form__button" >
              ВХОД
            </button>
          </div>
        </form>
        
      </div>
    </div>
  </div>
  );
}

export default AuthorisationPage;
