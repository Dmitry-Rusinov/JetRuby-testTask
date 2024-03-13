import React, { useEffect, useState } from 'react';
import styles from './CharacterList.module.scss';
import axios from 'axios';

function CharacterList() {
  const [list, setList] = useState({ results: [] })

  useEffect( () => {
    async function fetchData() {
      const result = await axios('https://rickandmortyapi.com/api/character/');
      console.log(result);
      setList(result.data);
    }
    fetchData()

    
  }, [])

  return (
    <section className={styles.container}>
      <ul>
        {list.results.map(item => (
          <li>{item.name}</li>
        ))}
      </ul>
      
    </section>
  )
}

export default CharacterList
