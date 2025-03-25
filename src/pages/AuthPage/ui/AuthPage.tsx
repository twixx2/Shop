import React from 'react';
import './AuthPage.scss';
import TextField from '../../../shared/ui/TextField/TextField';
import { Link } from 'react-router-dom';

const AuthPage: React.FC = () => {
  return (
    <div className="auth-page">
      <div className="auth-page__card">
        <h2 className="auth-page__title">Вход</h2>
        <p className="auth-page__subtitle">Введите данные для входа</p>

        <div className="auth-page__field">
          <label htmlFor="login">Логин</label>
          <TextField
            className="auth-page__input"
            onChange={() => {}}
            type="text"
            value=""
            placeholder="Введите логин"
          />
        </div>

        <div className="auth-page__field">
          <label htmlFor="password">Пароль</label>
          <TextField
            className="auth-page__input"
            onChange={() => {}}
            type="password"
            value=""
            placeholder="Введите пароль"
          />
        </div>

        <button className="auth-page__btn">Войти</button>

        <div className="auth-page__footer">
          <p>Нет аккаунта?</p>
          <Link to="/registration">Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
