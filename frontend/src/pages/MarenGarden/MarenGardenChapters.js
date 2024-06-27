import React from 'react';
import styles from './MarenGarden.module.scss';

const marenGardenChapters = [
  {
    id: 1,
    title: '1. Введение.',
    content: (
      <div>
        <h2>1. Введение.</h2>
        <div className={styles.masterclass__videoContainer}>
          <video controls>
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
    title: '2. Очистка ткани от аппрета',
    content: (
      <div>
        <h2>2. Очистка ткани от аппрета</h2>
        <div className={styles.masterclass__videoContainer}>
          <video controls>
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
    title: '3. Протравливание',
    content: (
      <div>
        <h2>3. Протравливание</h2>
        <div className={styles.masterclass__videoContainer}>
          <video controls>
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
    title: '4. Приготовление экстракта марены',
    content: (
      <div>
        <h2>4. Приготовление экстракта марены</h2>
        <div className={styles.masterclass__videoContainer}>
          <video controls>
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
    title: '5. Подготовка железного одеяла',
    content: (
      <div>
        <h2>5. Подготовка железного одеяла</h2>
        <div className={styles.masterclass__videoContainer}>
          <video controls>
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
    title: '6. Мареновый сад. Процесс окрашивания.',
    content: (
      <div>
        <h2>6. Мареновый сад. Процесс окрашивания.</h2>
        <div className={styles.masterclass__videoContainer}>
          <video controls>
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
    title: '7. Льняная скатерть (бонус).',
    content: (
      <div>
        <h2>7. Льняная скатерть (бонус).</h2>
        <div className={styles.masterclass__videoContainer}>
          <video controls>
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
    title: '8. Исправляем ошибки (бонус).',
    content: (
      <div>
        <h2>8. Исправляем ошибки (бонус).</h2>
        <div className={styles.masterclass__videoContainer}>
          <video controls>
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
    title: '9. Приготовление раствора индиго.',
    content: (
      <div>
        <h2>9. Приготовление раствора индиго.</h2>
        <div className={styles.masterclass__videoContainer}>
          <video controls>
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
    title: '10. Кошениль.',
    content: (
      <div>
        <h2>10. Кошениль</h2>
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
    title: '11. Окрашивание ткани весенними листьями.',
    content: (
      <div>
        <h2>11. Окрашивание ткани весенними листьями.</h2>
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
    title: '12. Обработка листьев танинами.',
    content: (
      <div>
        <h2>12. Обработка листьев танинами.</h2>
        <div className={styles.masterclass__videoContainer}>
          <video controls>
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
    title: '13. Конспекты.',
    content: (
      <div>
        <h2>13. Конспекты.</h2>
        <div className={styles.masterclass__13__contentContainer}>
          <div className={styles.masterclass__13__textContent}>
            <h2>Конспект "Цветной фон"</h2>
            <div className={styles.masterclass__13__iframeContainer}>
              <iframe src="https://drive.google.com/file/d/1HwMy7gnpbNqDNwwYKAFkgegMJnwyjp0K/preview" allow="autoplay"></iframe>
            </div>
            <p>Скачайте файл, нажав на кнопку ниже.</p>
            <a href="https://drive.google.com/uc?export=download&id=1HwMy7gnpbNqDNwwYKAFkgegMJnwyjp0K" className={styles.masterclass__13__downloadButton} download>Скачать конспект "Цветной фон"</a>

            <h2>Конспект "Цветной фон"</h2>
            <div className={styles.masterclass__13__iframeContainer}>
              <iframe src="https://drive.google.com/file/d/16n-r79FSDTSoo2bt2c2_kcwrQmLcHnaC/preview" allow="autoplay"></iframe>
            </div>
            <p>Скачайте файл, нажав на кнопку ниже.</p>
            <a href="https://drive.google.com/uc?export=download&id=16n-r79FSDTSoo2bt2c2_kcwrQmLcHnaC" className={styles.masterclass__13__downloadButton} download>Скачать конспект "Цветной фон"</a>
          </div>
        </div>
      </div>
    ),
  },
]

export default marenGardenChapters;