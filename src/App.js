import React from "react";
import './App.css';
import Search from './Components/Search';
import List from './Components/List';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' exact element={<List />}/>
        <Route path='/search/:id' element={<Search />}/>
      </Routes>
    </div>
  );
}

export default App;
