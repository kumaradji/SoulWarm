import React from 'react';
import style from './Navbar.module.scss';

const Navbar = () => {
    return (
        <nav className={style.navbar}>
            <a href="/">Главная</a>
            <a href="/lessons">Уроки</a>
            <a href="/shop">Магазин</a>
            <a href="/about">Обо мне</a>
            <a href="/gallery">Галерея</a>
            <a href="/profile">Профиль</a>
        </nav>
    );
};

export default Navbar;