import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./CharacterList.module.scss";
import Card from "../Card/Card";
import DataSelection from "../DataSelection/DataSelection";
import Button from "../Button/Button";

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
    localStorage.setItem("radioId", JSON.stringify("characters"));
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
    <section data-testid="data-list" className={styles.container}>
      <form data-testid="form" onSubmit={handleSubmit}>
        <label htmlFor="search">
          Поиск&nbsp;персонажа
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            id="search"
            name="search"
            placeholder="Поиск"
            data-testid="search"
          />
        </label>
        <Button
          onClick={handleSubmit}
          type="submit"
          size="16px"
          text="Поиск"
          margin="0 30px 0 0"
        />
        <DataSelection
          onChange={handleChangeValue}
          onClick={(e) => handleClickRadio(e.target.id)}
        />
      </form>
      <div data-testid="grid-container" className={styles.grid}>
        {checkBoxValue &&
          list.results.map((item) => (
            <Card
              item={item}
              onClick={() => handleClickCard(item.id)}
              checkBoxValue={checkBoxValue}
              key={item.id}
            />
          ))}
      </div>
      <div>
        <Button
          onClick={handlePrevPage}
          text="Предыдущая страница"
          prop="prev_next"
          margin="0 100px 12px 0"
        />
        <Button
          onClick={handleNextPage}
          text="Следующая страница"
          margin="0 0 12px 0"
        />
      </div>
    </section>
  );
}

export default CharacterList;
