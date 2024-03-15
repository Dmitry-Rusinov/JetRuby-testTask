import React from 'react';
import styles from './DataSelection.module.scss';

function DataSelection({ onChange, onClick }) {
  return (
    <div className={styles.checkbox_block}>
          <span>
            Персонажи &ensp;
            <input
              onChange={onChange}
              onClick={onClick}
              type="radio"
              name="check"
              id="characters"
            />
          </span>
          <span>
            Локации &ensp;
            <input
              onChange={onChange}
              onClick={onClick}
              type="radio"
              name="check"
              id="locations"
            />
          </span>
          <span>
            Эпизоды &ensp;
            <input
              onChange={onChange}
              onClick={onClick}
              type="radio"
              name="check"
              id="episodes"
            />
          </span>
        </div>
  )
}

export default DataSelection
