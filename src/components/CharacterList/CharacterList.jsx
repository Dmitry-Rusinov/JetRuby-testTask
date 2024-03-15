import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./CharacterList.module.scss";

import planet from "../../images/planet.png";
import RickAndMorty from "../../images/RickAndMorty.png";

function CharacterList() {
  const [list, setList] = useState({ results: [] });
  const [checkBoxValue, setCheckBoxValue] = useState("characters");
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  //Счетчик страниц вперед
  const handleNextPage = () => {
    setPage(page + 1);
  };

  //Счетчик страниц назад
  const handlePrevPage = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  //Запрос за данными о персонажах
  async function fetchDataCharacter() {
    const result = await axios(
      `https://rickandmortyapi.com/api/character/?name=${query}`
    );
    setList(result.data);
  }

  //Запрос следующей страницы персонажей
  async function fetchNextPageCharacter() {
    const result = await axios(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
    setList(result.data);
  }

  //Запрос за данными о локациях
  async function fetchDataLocation() {
    const result = await axios("https://rickandmortyapi.com/api/location/");
    setList(result.data);
  }

  //Запрос за данными о эпизодах
  async function fetchDataEpisode() {
    const result = await axios("https://rickandmortyapi.com/api/episode/");
    setList(result.data);
  }

  //Запрос на изменение приходящих данных с сервера
  const handleChangeValue = (e) => {
    if (e.target.id === "locations") {
      fetchDataLocation();
    } else if (e.target.id === "characters") {
      fetchDataCharacter();
    } else if (e.target.id === "episodes") {
      fetchDataEpisode();
    }
    setCheckBoxValue(e.target.id);
  };

  //Поиск персонажей
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(query);
  };

  const handleClickCard = (cardId) => {
    localStorage.setItem("cardId", JSON.stringify(cardId));
    navigate(`/character/${cardId}`);
  };

  const handleClickRadio = (radioId) => {
    localStorage.setItem("radioId", JSON.stringify(radioId));
  };

  useEffect(() => {
    localStorage.setItem("radioId", JSON.stringify('characters'));
    fetchDataCharacter()
      .then((data) => data)
      .catch((error) => {
        alert("Извините, ничего не найдено");
        console.log(`Код ошибки: ${error}`);
      });
    fetchNextPageCharacter();
  }, [search, page]);

  useEffect(() => {
    if (checkBoxValue === "characters") {
      fetchDataCharacter();
    }
    if (checkBoxValue === "locations") {
      fetchDataLocation();
    }
    if (checkBoxValue === "episodes") {
      fetchDataEpisode();
    }
  }, [checkBoxValue]);

  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">
          Поиск&nbsp;персонажа
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            id="search"
            name="search"
            placeholder="Поиск"
          />
        </label>
        <button type="submit">Поиск</button>

        <div className={styles.checkbox_block}>
          <span>
            Персонажи &ensp;
            <input
              onChange={handleChangeValue}
              onClick={(e) => handleClickRadio(e.target.id)}
              type="radio"
              name="check"
              id="characters"
            />
          </span>
          <span>
            Локации &ensp;
            <input
              onChange={handleChangeValue}
              onClick={(e) => handleClickRadio(e.target.id)}
              type="radio"
              name="check"
              id="locations"
            />
          </span>
          <span>
            Эпизоды &ensp;
            <input
              onChange={handleChangeValue}
              onClick={(e) => handleClickRadio(e.target.id)}
              type="radio"
              name="check"
              id="episodes"
            />
          </span>
        </div>
      </form>
      <div className={styles.grid}>
        {checkBoxValue === "characters" &&
          list.results.map((item) => (
            <div
              key={item.id}
              className={styles.card}
              onClick={() => handleClickCard(item.id)}
            >
              <img src={item.image} alt={item.name} />
              <div className={styles.description}>
                <h3>{item.name}</h3>
                <span>
                  Статус: {item.status === "Alive" ? "Живой" : "Мертвый"}
                </span>
                <span>Раса: {item.species}</span>
                <span>
                  Пол: {item.gender === "Male" ? "Мужской" : "Женский"}
                </span>
              </div>
            </div>
          ))}

        {checkBoxValue === "locations" &&
          list.results.map((item) => (
            <div
              key={item.id}
              className={styles.card}
              onClick={() => handleClickCard(item.id)}
            >
              <img src={planet} alt={item.name} />
              <div className={styles.description}>
                <h3>{item.name}</h3>
                <span>Тип: {item.type}</span>
                <span>Измерение: {item.dimension}</span>
              </div>
            </div>
          ))}

        {checkBoxValue === "episodes" &&
          list.results.map((item) => (
            <div
              key={item.id}
              className={styles.card}
              onClick={() => handleClickCard(item.id)}
            >
              <img src={RickAndMorty} alt={item.name} />
              <div className={styles.description}>
                <h3>{item.name}</h3>
                <span>Дата выхода: {item.air_date}</span>
                <span>Эпизод: {item.episode}</span>
              </div>
            </div>
          ))}
      </div>
      <div>
        <button type="button" onClick={handlePrevPage}>
          Предыдущая страница
        </button>
        <button type="button" onClick={handleNextPage}>
          Следующая страница
        </button>
      </div>
    </section>
  );
}

export default CharacterList;
