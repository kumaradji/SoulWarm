// Lessons07.js
import React from "react";
import Slider from "../../../../components/Slider/Slider";
import styles from './Lesson.module.scss';

const Lesson07 = () => {
  return (
    <div>
      <div>
        <p>Одна из важных тем в природном окрашивании тканей это – модификаторы цвета. Модификаторами могут быть соли
          металлов. Например, медный купорос уводит в тёплые и зелёные цвета. Железный купорос проявляет жилки листа и
          приглушает цвет в серые и чёрные оттенки. Уксус, спирт, лимонный сок могут высветлить ткань, поменять цвет.
          Например, лимонный сок может поменять цвет кошенили (фуксия), увести в оранжевые оттенки.</p>
        <p>Пищевая сода – это самый интересный модификатор цвета. Из своего опыта могу подсказать, что марена с содой,
          золотарник с содой дают интересные результаты. Марена становится ближе к алому цвету. Золотарник с содой и
          листьями каштана дают очень чёткие и красивые отпечатки даже на смесовых тканях (шёлк с хлопком). Если вы
          хотите изучить перед окрашиванием ткани краситель и выбрать стратегию будущего красителя, то можно сделать
          образцы и опустить ткань в разные модификаторы и вы увидите, что получится с цветом.</p>
        <p>Делюсь своими выкрасками. Кошениль, кампеш, серёжки ольхи, корень марены с мыльным орехом.</p>
        <p>Модификторы цвета или добавки, которые помогают изменить цвет природных красителей. Интересно делать
          выкраски и наблюдать, как цвет преображается.</p>
        <p>На фотографиях под номером :</p>
        <ul>
          <li>1 - алюмокалиевые квасцы.</li>
          <li>2 - мед. куп.</li>
          <li>3 - жел. куп.</li>
          <li>4 - сода пищевая</li>
          <li>5 - уксус</li>
          <li>6 - сок лимона</li>
          <li>7 - спирт</li>
          <li>8 - танины (Русхим)</li>
        </ul>
        <p>Корень марены с мыльным орехом (фотография с подписанными образцами)</p>
        <p>Концентрация у всех красителей разная. Модификаторы сыпала не взвешивая. Просто хотела показать
          принцип.</p>
        <p>Самыми доступными и интересными модификаторами цвета чаще всего являются пищевая сода и сок лимона.</p>
        <p>Модификаторы можно наносить на ткань в разное время работы с тканью. На ткань после протравливания, на
          «одеяло» и конечно в конце работы.</p>
        <p>Покрасив образец, вы можете решить в какой последовательности вам использовать тот или иной ингредиент. И
          конечно, как видно на образцах, на одном отрезе ткани можно использовать все модификаторы. Это даст
          разнообразие фону и цвету используемых листьев.</p>

        <div className={styles.sliderContainer}>
          <Slider autoPlay={true} autoPlayTime={4000} width="650px" height="100%" images={[
            {src: '/images/lessons/lesson7_01.jpeg', alt: 'Image 1'},
            {src: '/images/lessons/lesson7_02.jpeg', alt: 'Image 2'},
            {src: '/images/lessons/lesson7_03.jpeg', alt: 'Image 3'},
            {src: '/images/lessons/lesson7_04.jpeg', alt: 'Image 4'},
            {src: '/images/lessons/lesson7_05.jpeg', alt: 'Image 5'}
          ]}/>
        </div>
      </div>
    </div>
  );
};

export default Lesson07;