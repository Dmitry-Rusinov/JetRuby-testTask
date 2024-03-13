import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.scss';
import CharacterList from '../CharacterList/CharacterList';
import CharacterPage from '../CharacterPage/CharacterPage';

function App() {
  return (
    <div className='wrapper'>
      <Routes>
        <Route path='/' element={<CharacterList />}/>
        <Route path='/character/:id' element={<CharacterPage />} />
      </Routes>
    </div>
  );
}

export default App;
