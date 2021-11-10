import React, { useCallback, useState } from "react";
import './App.css';
import Search from './Components/Search';
import List from './Components/List';
import { Route, Routes } from 'react-router-dom';
import Results from './Components/Results';
import Loader from './Components/Loader';

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
      <Routes>
        <Route path='/' exact element={<List/>}/>
        <Route path='/search/:id' element={
          <Search
            onSearch={searchData}
            onEmptyRes={emptyRes}
          />
        }/>
      </Routes>
      {loading && <Loader/>}
      {(results && !loading) && <Results results={results}/>}
    </div>
  );
}

export default App;
