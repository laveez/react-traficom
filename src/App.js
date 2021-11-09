import React from "react";
import './App.css';
import Search from './Components/Search';
import List from './Components/List';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  /*
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const getItems = async () => {
      const res = await fetch(`https://trafi2.stat.fi/PXWeb/api/v1/fi/TraFi${path}?query=*&filter=*`);
      const itemsFromServer = await res.json();
      setItems(itemsFromServer);
    }

    getItems().then();
  }, [path]);

  const handleChange = event => {
    setFilter(event.target.value);
  };

  const lowerCaseFilter = filter.toLowerCase();

  const filteredData = items.filter(item => {
    return Object.keys(item).some(key =>
      typeof item[key] === "string" && item[key].toLowerCase().includes(lowerCaseFilter)
    );
  });
*/
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
