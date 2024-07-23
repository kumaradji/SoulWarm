// LandingPage.jsx
import React, { useContext } from 'react';
import styles from './LandingPage.module.scss';
import { Link } from "react-router-dom";
import Slider from "../../components/Slider/Slider";
import Leaf01 from "../../assets/leaf_1.png";
import Leaf02 from "../../assets/leaf_2.png";
import images from "./ImageList";
import { AuthContext } from '../../context/AuthContext';

const LandingPage = () => {
  const { user } = useContext(AuthContext);
  const isVIP = user && user.groups && user.groups.includes('VIP');

  return (
    <div className={styles.landingPage}>
      <div className={styles.titleBlock}>
        <h1 className={styles.titleBlock__textTitle}>ДушуГрею</h1>
        <h1 className={styles.titleBlock__textCopyright}>© Нина Кольцова</h1>
        <img className={styles.mainLeaf01} src={Leaf01} alt="Leaf image"/>
      </div>

      <div className={styles.landingPage__ecoprint}>
        <h1>Экопринт</h1>
        <br/>
        <br/>
        <p>
          Экопринт - это метод натурального окрашивания, который позволяет перенести природные цвета растений на ткань
          или бумагу с использованием солей металлов.
        </p>
        <p>
          Одной из основных особенностей экопринта является его уникальность и индивидуальность. Даже листья с одного и
          того же растения могут окрашивать ткань по-разному. Это открывает бесконечные возможности для творчества и
          экспериментов с различными вариантами окрашивания.
        </p>
      </div>

      <Slider autoPlay={true} autoPlayTime={4000} images={images}/>

      <div className={styles.landingPage__process}>
        <h1>Процесс</h1>
        <br/>
        <br/>
        <p>
          Процесс начинается с подготовки ткани. Ткань предварительно обрабатывается протравой, содержащей соли
          металлов. Эти соли помогают пигменту из листьев осесть на ткани и закрепиться, обеспечивая стойкость
          окрашивания.
        </p>
        <p>
          Важно отметить, что каждый мастер может использовать свои собственные рецепты и методы обработки, так как
          точного рецепта для всех не существует. Сезон сбора листьев, жесткость воды и другие факторы могут влиять на
          окончательный результат окрашивания.
        </p>
      </div>

      <div className={styles.landingPage__video}>
        <video muted autoPlay loop>
          <source
            src="/videos/landingPage/Process_zadnik.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
          Ваш браузер не поддерживает тег видео.
        </video>
      </div>

      <div className={styles.landingPage__plants}>
        <h1>Растения</h1>
        <br/>
        <br/>
        <p>
          Растения играют ключевую роль в процессе экопринта. Разные виды растений имеют различные свойства окрашивания,
          отдавая свои уникальные оттенки и оттиски на ткань. Некоторые растения могут давать яркие и насыщенные цвета,
          в то время как другие создают более нежные и пастельные оттенки.
        </p>
        <p>
          Например, листья эвкалипта могут создавать оттенки от оливково-зеленого до ярко-оранжевого, а листья ольхи от
          зеленого до графитового. Это позволяет мастерам экопринта экспериментировать с комбинациями различных растений
          для создания удивительных эффектов и уникальных цветовых схем. Какие растения выбрать и какие результаты
          получить - решение остается за мастером экопринта.
        </p>
      </div>

      <img className={styles.mainLeaf02} src={Leaf02} alt="Leaf image"/>

      <div className={styles.landingPage__video}>
        <video muted autoPlay loop>
          <source
            src="/videos/landingPage/Rasteniya_zadnik.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
          Ваш браузер не поддерживает тег видео.
        </video>
      </div>

      <div className={styles.landingPage__lets_magic}>
        <h1>Давайте волшебничать!</h1>
        <br/>
        <br/>

        <p>
          Экопринт предлагает гармоничный подход к окрашиванию тканей в сотрудничестве с природой. Он позволяет
          сохранить уникальность и неповторимость каждого изделия, созданного в результате этого процесса. Кроме того,
          такой способ окрашивания является экологически дружественным, поскольку не требует использования химических
          красителей или загрязняющих веществ.
        </p>
        <p>
          Предлагаю вам самим попробовать этот уникальный творческий эксперимент рука об руку с природой. Давайте вместе
          волшебничать, если вам кажется, что это сложно и не для вас, то я предлагаю стать смелее. Посмотрите мои
          <Link to="/lessons" className={styles.landingPage__link}> бесплатные уроки,</Link> и если решитесь – приобретайте мой мастер-класс, в котором я подробно рассказываю все
          тонкости процесса.
        </p>
      </div>

      {!isVIP && (
        <div className={styles.landingPage__bye}>
          <h1>Покупайте мастер-класс!</h1>
          <br/>
          <br/>
          <p>
            Если Вы хотите приобрести мастер-класс "Цветной фон",
            состоящий из девяти видео и подробных конспектов,
            <Link to="/auth" className={styles.landingPage__link}> зарегистрируйтесь. </Link>
            Добавьте его в корзину и после оплаты вы сможете получить полный доступ к в личном кабинете.
          </p>
          <Link to="/promo" className={styles.landingPage__button}>
            Подробнее
          </Link>
          <p>Цена 4000 рублей.</p>
          <p>Волшебничайте! И Ваша жизнь станет волшебством.</p>
          <br/>
        </div>
      )}
    </div>
  );
};

export default LandingPage;