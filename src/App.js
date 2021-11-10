import React from "react";
import './App.css';
import Search from './Components/Search';
import List from './Components/List';
import { Link, Route, Routes } from 'react-router-dom';
import About from './Components/About';

const App = () => {
  return (
    <div className="App">
      <nav className="navbar">
        <ul className="nav">
          <li><Link to='/'>List of APIs</Link></li>
        </ul>
        <button className="icon-button dropdown"><i className="icon">menu</i></button>
        <div className="nav-collapse">
          <ul className="nav">
            <li><Link to='/about'>About</Link></li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path='/' exact element={<List/>}/>
        <Route path='/search/:id' element={
          <Search />
        }/>
        <Route path='/about' exact element={<About />}/>
      </Routes>
    </div>
  );
}

export default App;
