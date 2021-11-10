import React, { useCallback, useState } from "react";
import './App.css';
import Search from './Components/Search';
import List from './Components/List';
import { Link, Route, Routes } from 'react-router-dom';
import About from './Components/About';

const App = () => {

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchData = async (data, apiUrl) => {
    setLoading(true);

    const res = await fetch(
      apiUrl,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      },
    );
    const response = await res.json();

    setLoading(false);
    setResults(response.value);
  }

  const emptyRes = useCallback(() => {
    setResults([]);
  },[]);

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
          <Search
            onSearch={searchData}
            onEmptyRes={emptyRes}
            loading={loading}
            results={results}
          />
        }/>
        <Route path='/about' exact element={<About />}/>
      </Routes>
    </div>
  );
}

export default App;
