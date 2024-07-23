// Lessons.js
import React from 'react';
import Lesson01 from "./Lessons/Lesson01";
import Lesson02 from "./Lessons/Lesson02";
import Lesson03 from "./Lessons/Lesson03";
import Lesson04 from "./Lessons/Lesson04";
import Lesson05 from "./Lessons/Lesson05";
import Lesson06 from "./Lessons/Lesson06";
import Lesson07 from "./Lessons/Lesson07";
import Lesson08 from "./Lessons/Lesson08";

const lessons = [
  {
    id: 1,
    title: 'Самодельная протрава',
    image: '/images/lessons/L01.png',
    component: <Lesson01 />
  },
  {
    id: 2,
    title: 'Окрашивание керамики листьями',
    image: '/images/lessons/L02.png',
    component: <Lesson02 />
  },
  {
    id: 3,
    title: 'Экстрагирование корня марены',
    image: '/images/lessons/lesson3_01.jpeg',
    component: <Lesson03 />
  },
  {
    id: 4,
    title: 'Танины для окрашивания ткани: что это и как использовать',
    image: '/images/lessons/lesson4_01.jpeg',
    component: <Lesson04 />
  },
  {
    id: 5,
    title: 'Соли металлов',
    image: '/images/lessons/lesson5_01.png',
    component: <Lesson05 />
  },
  {
    id: 6,
    title: 'Окрашивание ткани с использованием растительных красителей и натуральных материалов',
    image: '/images/lessons/lesson6_01.jpeg',
    component: <Lesson06 />
  },
  {
    id: 7,
    title: 'Изменение цвета в природном окрашивании ткани',
    image: '/images/lessons/lesson7_01.jpeg',
    component: <Lesson07 />
  },
  {
    id: 8,
    title: 'Как ухаживать за изделиями',
    image: '/images/lessons/L08.jpeg',
    component: <Lesson08 />
  }
];

export default lessons;