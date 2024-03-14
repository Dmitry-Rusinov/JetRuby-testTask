import React, { useEffect, useState } from "react";
import styles from "./CharacterList.module.scss";
import axios from "axios";

function CharacterList() {
  const [list, setList] = useState({ results: [] });
  const [checkBoxValue, setCheckBoxValue] = useState('')

  useEffect(() => {
    /* async function fetchDataCharacter() {
      const result = await axios("https://rickandmortyapi.com/api/character/");
      setList(result.data);
    } */
    fetchDataCharacter();
  }, []);

  const handleChange = () => {
    
  };


    async function fetchDataCharacter() {
      const result = await axios("https://rickandmortyapi.com/api/character/");
      setList(result.data);
      console.log('click');
    }

    async function fetchDataLocation() {
      const result = await axios("https://rickandmortyapi.com/api/location/");
      //setList(result.data);
      console.log(result.data);
    }

    async function fetchDataEpisode() {
      const result = await axios("https://rickandmortyapi.com/api/episode/");
      //setList(result.data);
      console.log(result.data);
    }

    const handleChangeValue = (e) => {
        if(e.target.id === 'locations') {
          async function fetchDataLocation() {
            const result = await axios("https://rickandmortyapi.com/api/location/");
            //setList(result.data);
            console.log(result.data);
          }
          fetchDataLocation();
        }
          if(e.target.id === 'characters') {
            async function fetchDataLocation() {
              const result = await axios("https://rickandmortyapi.com/api/character/");
              //setList(result.data);
              console.log(result.data);
            }
            fetchDataCharacter();
        }
        if(e.target.id === 'episodes') {
          async function fetchDataLocation() {
            const result = await axios("https://rickandmortyapi.com/api/episode/");
            //setList(result.data);
            console.log(result.data);
          }
          fetchDataEpisode();
      }
    };

  return (
    <section className={styles.container}>
      <form /* onSubmit={handleSubmit} */>
        <label for="search">Поиск&nbsp;персонажа
        <input type="text" id="search" name="search" placeholder="Поиск" />
        </label>
        
        <div className={styles.checkbox_block}>
          <span>
            Персонажи &ensp;
            <input onChange={handleChangeValue} type="checkbox" name='check' id="characters" />
          </span>
          <span>
            Локации &ensp;
            <input onChange={handleChangeValue} type="checkbox" name='check' id="locations" /* checked={(e) => e.target.value} *//>
          </span>
          <span>
            Эпизоды &ensp;
            <input onChange={handleChangeValue} type="checkbox" name='check' id="episodes" /* checked={(e) => e.target.value} *//>
          </span>
        </div>
      </form>
      <div className={styles.grid}>
        {list.results.map((item) => (
          <div className={styles.card}>
            <img src={item.image} alt={item.name} />
            <div className={styles.description}>
              <h3>{item.name}</h3>
              <span>
                Статус: {item.status === "Alive" ? "Живой" : "Мертвый"}
              </span>
              <span>Раса: {item.species}</span>
              <span>Происхождение: {item.origin.name}</span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button type="button" onClick={handleChange}>
          Предыдущая страница
      </button>
      <button type="button" onClick={handleChange}>
          Следующая страница
      </button>
      </div>
    </section>
  );
}

export default CharacterList;
