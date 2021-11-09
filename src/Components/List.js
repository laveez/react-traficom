import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const List = () => {

  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const getItems = async () => {
      const res = await fetch(`https://trafi2.stat.fi/PXWeb/api/v1/fi/TraFi?query=*&filter=*`);
      const itemsFromServer = await res.json();
      setItems(itemsFromServer);
    }

    getItems().then();
  }, []);

  const handleChange = event => {
    setFilter(event.target.value);
  };

  const lowerCaseFilter = filter.toLowerCase();

  const filteredData = items.filter(item => {
    return Object.keys(item).some(key =>
      typeof item[key] === "string" && item[key].toLowerCase().includes(lowerCaseFilter)
    );
  });

  return (
    <div>
      <h1> List of TraFi APIs: </h1>
      <div>
        <input
          value={filter}
          onChange={handleChange}
          placeholder='Search...'
        />
        <table>
          <thead>
          <tr>
            <th>Title</th>
            <th>Path</th>
          </tr>
          </thead>
          <tbody>
          {filteredData && filteredData.map((item, index) => (
            <tr key={index.toString()}>
              <td><Link to={`/search/${item.id}`}>{item.title}</Link></td>
              <td>{item.path}</td>
            </tr>
          ))
          }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
