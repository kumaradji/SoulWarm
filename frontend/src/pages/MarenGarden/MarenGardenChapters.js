import React from 'react';
import styles from './MarenGarden.module.scss';
import {Link} from "react-router-dom";

const marenGardenChapters = [
  {
    id: 1,
    title: 'Введение',
    content: (
      <div key="chapter-1">
        <h2>Введение</h2>
        <div className={styles.masterclass__videoContainer}>
          <video controls key="video-1">
            <source
              src="/videos/marengarden/Vvedenie.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: 'Очистка ткани от аппрета',
    content: (
      <div key="chapter-2">
        <h2>Очистка ткани от аппрета</h2>
        <div className={styles.masterclass__videoContainer}>
          <video controls key="video-2">
            <source
              src="/videos/marengarden/Ochistka_tkani_ot_opreta.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: 'Протравливание',
    content: (
      <div key="chapter-3">
        <h3>Протравливание</h3>
        <div className={styles.masterclass__videoContainer}>
          <video controls key="video-3">
            <source
              src="/videos/marengarden/Protravlivanie.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: 'Приготовление экстракта марены',
    content: (
      <div key="chapter-4">
        <h3>Приготовление экстракта марены</h3>
        <div className={styles.masterclass__videoContainer}>
          <video controls key="video-4">
            <source
              src="/videos/marengarden/Prigotovlenie_ekstrakta_mareni.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: 'Подготовка железного одеяла',
    content: (
      <div key="chapter-5">
        <h3>Подготовка железного одеяла</h3>
        <div className={styles.masterclass__videoContainer}>
          <video controls key="video-5">
            <source
              src="/videos/marengarden/Podgotovka_zeleznogo_odeyala.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: 'Мареновый сад. Процесс окрашивания',
    content: (
      <div key="chapter-6">
        <h3>Мареновый сад. Процесс окрашивания</h3>
        <div className={styles.masterclass__videoContainer}>
          <video controls key="video-6">
            <source
              src="/videos/marengarden/Process_okrashivaniya.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    title: 'Льняная скатерть (бонус)',
    content: (
      <div key="chapter-7">
        <h3>Льняная скатерть (бонус)</h3>
        <div className={styles.masterclass__videoContainer}>
          <video controls key="video-7">
            <source
              src="/videos/marengarden/Lnanaya_skatert_bonus.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    ),
  },
  {
    id: 8,
    title: 'Исправляем ошибки (бонус)',
    content: (
      <div key="chapter-8">
        <h3>Исправляем ошибки (бонус)</h3>
        <div className={styles.masterclass__videoContainer}>
          <video controls key="video-8">
            <source
              src="/videos/marengarden/Ispravlyaem_oshibki_bonus.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    ),
  },
  {
    id: 9,
    title: 'Приготовление раствора индиго',
    content: (
      <div key="chapter-9">
        <h3>Приготовление раствора индиго</h3>
        <div className={styles.masterclass__videoContainer}>
          <video controls key="video-9">
            <source
              src="/videos/marengarden/Prigotovlenie_rastvora_indigo.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    ),
  },
  {
    id: 10,
    title: 'Кошениль',
    content: (
      <div>
        <h3>Кошениль</h3>
        <div className={styles.masterclass__10__contentContainer}>
          <div className={styles.masterclass__10__textContent}>
            <p>В моей практике кошениль показала себя очень хорошо. Кармин, который находиться в жучках, стоек к свету,
              образует прочный лак, связываясь с солями металлов.</p>
            <p>В конспекте есть рецепт который хорошо подходит для свежих листьев. Вот ещё один способ для окрашивания
              кошенилью с использованием сухих листьев. И в этом случае холодный цвет фуксии с жёлтыми листьями будет
              смотреться не грязно.</p>
            <p>Основной способ. Ткань протравить алюмокалиевыми квасцами 20% от веса ткани. Кошениль (5 гр. при весе
              ткани от 50-70 гр.) измельчить и залить кипятком (всё по конспекту). Нижние листья на полчаса замачиваем в
              железном купоросе 0,1-0,5 гр. с добавление танина чая (около столовой ложки заварки из чайника, можно
              меньше).</p>
            <p>Листья в спирту тогда на фоне тёмных листьев будут контрастные светлые. Одеяло из остатков экстракта
              кошенили. Также можно добавить железный купорос 0,1-0,5 гр. чем меньше железного купороса, тем чище фон
              (этот принцип работает для всех красителей).</p>
            <p>Если вы хотите получить светлый фон и чёткие листья, то листья замачиваются только в железном купоросе с
              добавлением танинов чая (или какие есть). Если одеяло без железного купороса, то будет розовый фон, а с
              добавлением железного купороса - фон будет сиренево-серый в зависимости от концентрации.</p>
            <p>И ещё один способ. При любой концентрации делать второе протравливание. После алюмокалиевых квасцов ткань
              высушить и протравить второй раз железным купоросом до 1 гр. при весе до 100 гр. кратко опустить ткань, и
              вытащить.</p>
            <p>Высушить и работать как в конспекте.</p>
            <p>При работе с кошенилью можно листья обрабатывать и лимонным соком (свежий из лимона). Кармин так же как и
              кампеш чувствителен к Рh, но более стабилен. Для окрашивания хлопка или льна нужно увеличить количество
              кошенили. Очень хорошо добавлять кору дуба в экстракт с кошенилью (примерно 100 гр. коры дуба на 100 гр.
              ткани).</p>
            <p>Танины помогают связаться красителю кошенили с растительным волокном, увеличивается светопрочность. На
              фото палантин из шерсти с шёлком, где было второе протравливание железным купоросом.</p>
          </div>
          <div className={styles.imageContent}>
            <img src={'/images/masterclass/M10.jpeg'} alt="Кошениль"/>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 11,
    title: 'Окрашивание ткани весенними листьями',
    content: (
      <div>
        <h3>Окрашивание ткани весенними листьями</h3>
        <div className={styles.masterclass__11__contentContainer}>
          <div className={styles.masterclass__11__textContent}>
            <p>Сезон окрашивания свежими листьями начинается с первых майских листьев. Свежие листья дают нежные
              отпечатки, но есть растения, которые еще не набрали танинов и разных красящих веществ. Для того, чтобы
              получить стопроцентный результат, лучше использовать таниновые экстракты и увеличить количество железного
              купороса, так сказать - сыграть на контрасте.</p>
            <p>На фотографии палантин из эксельсиора, где я использовала именно этот приём.</p>
            <p>Экстракт из серёжек ольхи (50 гр. сухого сырья), эксельсиор 25 гр. в алюмокалиевых квасцах 20% от веса
              ткани. Замочила на ночь в экстракте серёжек ольхи. Нижние листья клёна (лучше чтобы черенки были
              красноватые), верхние листья свежие, без обработки, как и нижние.</p>
            <p>Одеяло из остатков экстракта серёжек ольхи и 0,2 гр. медного купороса и 0,6 гр. железного купороса.
              Вместо серёжек ольхи вы можете использовать любой другой экстракт с танинами.</p>
            <p>Весной хорошо красят такие листья: земляника, гравилат, герань, клён, черёмуха, рябинник, дёрен, каштан,
              шиповник, роза.</p>
          </div>
          <div className={styles.masterclass__11__imageContent}>
            <img src={'/images/masterclass/M11_1.jpeg'} alt="Окрашивание ткани весенними листьями"/>
            <img src={'/images/masterclass/M11_2.jpeg'} alt="Окрашивание ткани весенними листьями"/>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 12,
    title: 'Обработка листьев танинами',
    content: (
      <div key="chapter-12">
        <h3>Обработка листьев танинами</h3>
        <div className={styles.masterclass__videoContainer}>
          <video controls key="video-12">
          <source
              src="/videos/marengarden/Obrabotka_listyev_taninami.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    ),
  },
  {
    id: 13,
    title: 'Конспекты',
    content: (
      <div>
        <Link
          to="/conspects"
          style={{
            display: 'inline-block',
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: 'var(--color-blue)',
            color: 'var(--color-white)',
            textAlign: 'center',
            textDecoration: 'none',
            borderRadius: '5px',
            transition: 'background-color 0.3s'
          }}
          className="conspect-button"
        >
          Посмотреть и скачать конспекты
        </Link>
      </div>
    ),
  }
]

export default marenGardenChapters;