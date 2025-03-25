import React from 'react';
import './RegisterPage.scss';
import TextField from '../../../shared/ui/TextField/TextField';
import { Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  return (
    <div className="register-page">
      <div className="register-page__card">
        <h2 className="register-page__title">Регистрация</h2>
        <p className="register-page__subtitle">Введите данные для регистрации</p>

        <div className="register-page__field">
          <label htmlFor="name">Имя</label>
          <TextField
            className="register-page__input"
            onChange={() => {}}
            type="text"
            value=""
            placeholder="Введите имя"
          />
        </div>

        <div className="register-page__field">
          <label htmlFor="email">Электронная почта</label>
          <TextField
            className="register-page__input"
            onChange={() => {}}
            type="email"
            value=""
            placeholder="Введите почту"
          />
        </div>

        <div className="register-page__field">
          <label htmlFor="password">Пароль</label>
          <TextField
            className="register-page__input"
            onChange={() => {}}
            type="password"
            value=""
            placeholder="Введите пароль"
          />
        </div>

        <div className="register-page__field">
          <label htmlFor="confirmPassword">Повторите пароль</label>
          <TextField
            className="register-page__input"
            onChange={() => {}}
            type="password"
            value=""
            placeholder="Повторите пароль"
          />
        </div>

        <button className="register-page__btn">Зарегистрироваться</button>

        <div className="register-page__footer">
          <p>Есть аккаунт?</p>
          <Link to="/auth">Войти</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
