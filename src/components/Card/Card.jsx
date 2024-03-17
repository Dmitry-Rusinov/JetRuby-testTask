import React from "react";
import styles from "./Card.module.scss";

import planet from "../../images/planet.png";
import RickAndMorty from "../../images/RickAndMorty.png";

function Card({ item, onClick, checkBoxValue }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={
        (checkBoxValue === 'characters' && item.image)
      || (checkBoxValue === 'locations' && planet)
      || (checkBoxValue === 'episodes' && RickAndMorty)
      } alt={item.name} />
      <div className={styles.description}>
        <h3>{item.name}</h3>
        {checkBoxValue === "characters" && (
          <>
            <span>Статус: {item.status === "Alive" ? "Живой" : "Мертвый"}</span>
            <span>Раса: {item.species}</span>
            <span>Пол: {item.gender === "Male" ? "Мужской" : "Женский"}</span>
          </>
        )}
        {checkBoxValue === "locations" && (
          <>
            <span>Тип: {item.type}</span>
            <span>Измерение: {item.dimension}</span>
          </>
        )}
        {checkBoxValue === "episodes" && (
          <>
            <span>Дата выхода: {item.air_date}</span>
            <span>Эпизод: {item.episode}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default Card;
