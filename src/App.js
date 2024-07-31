import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Readers from './Components/Readers/Readers';
import Surah from './Components/Surah/Surah';
import Surahs from './Components/Surahs/Surahs';

function App() {
    return (
        <div className='App'>
              <Routes>
                  <Route path="/" element={<Readers />} />
                  <Route path="/readers/:readerId" element={<Surahs />} />
                  <Route path="/reader/:readerId/surah/:surahId" element={<Surah />} />
              </Routes>
        </div>
    );
}

export default App;
