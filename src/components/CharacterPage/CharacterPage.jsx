import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./CharacterPage.module.scss";
import planet from "../../images/planet.png";
import RickAndMorty from "../../images/RickAndMorty.png";

function CharacterPage() {
  const [cardData, setCardData] = useState({});
  const [cardType, setCardType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let radioId = JSON.parse(localStorage.getItem("radioId"));
    setCardType(radioId);
    if (radioId === "characters") {
      fetchItemCharacter();
    }
    if (radioId === "locations") {
      fetchItemLocation();
    }
    if (radioId === "episodes") {
      fetchItemEpisode();
    }
  }, []);

  //Запрос за данными о персонаже
  async function fetchItemCharacter() {
    let cardId = JSON.parse(localStorage.getItem("cardId"));
    await axios(`https://rickandmortyapi.com/api/character/${cardId}`)
      .then((data) => {
        setCardData(data.data);
      })
      .catch((error) => console.log(error));
  }

  //Запрос за данными о локации
  async function fetchItemLocation() {
    let cardId = JSON.parse(localStorage.getItem("cardId"));
    await axios(`https://rickandmortyapi.com/api/location/${cardId}`)
      .then((data) => {
        setCardData(data.data);
      })
      .catch((error) => console.log(error));
  }

  //Запрос за данными о эпизоде
  async function fetchItemEpisode() {
    let cardId = JSON.parse(localStorage.getItem("cardId"));
    await axios(`https://rickandmortyapi.com/api/episode/${cardId}`)
      .then((data) => {
        setCardData(data.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    (cardType === "characters" && (
      <section className={styles.container}>
        <div className={styles.description}>
          <img src={cardData.image} alt={cardData.name} />
          <div className={styles.info}>
            <h3>{cardData.name}</h3>
            <span>
              Статус: {cardData.status === "Alive" ? "Живой" : "Мертвый"}
            </span>
            <span>Раса: {cardData.species}</span>
            <span>
              Пол: {cardData.gender === "Male" ? "Мужской" : "Женский"}
            </span>
          </div>
        </div>
        <button onClick={() => navigate(-1)} type="button">
          Назад
        </button>
      </section>
    )) ||
    (cardType === "locations" && (
      <section className={styles.container}>
        <div className={styles.description}>
          <img src={planet} alt={cardData.name} />
          <div className={styles.info}>
            <h3>{cardData.name}</h3>
            <span>Тип: {cardData.type}</span>
            <span>Измерение: {cardData.dimension}</span>
          </div>
        </div>
        <button onClick={() => navigate(-1)} type="button">
          Назад
        </button>
      </section>
    )) ||
    (cardType === "episodes" && (
      <section className={styles.container}>
        <div className={styles.description}>
          <img src={RickAndMorty} alt={cardData.name} />
          <div className={styles.info}>
            <h3>{cardData.name}</h3>
            <span>Дата выхода: {cardData.air_date}</span>
            <span>Эпизод: {cardData.episode}</span>
          </div>
        </div>
        <button onClick={() => navigate(-1)} type="button">
          Назад
        </button>
      </section>
    ))
  );
}

export default CharacterPage;
