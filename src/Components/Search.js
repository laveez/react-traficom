import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from './Loader';
import Results from './Results';

const Search = () => {

  const [data, setData] = useState({});
  const id = useParams().id;

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * Fetch the parameters and lists of values for the search form
   * Set result to an empty array
   */
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`https://trafi2.stat.fi/PXWeb/api/v1/fi/TraFi/${id}?query=*&filter=*`);
      const dataFromServer = await res.json();
      setData(dataFromServer);
    }
    setResults([]);
    getData().then();
  }, [id]);

  /**
   * Format the query data correctly to the TraFi API specifications
   * and trigger a search event with the data.
   * Triggered by form submit.
   * @param e event
   */
  const onSubmit = (e) => {
    e.preventDefault();

    let data = {
      'query': [],
      'response': {
        'format': 'json-stat2'
      }
    };

    for (let i = 0; i < e.target.length - 1; i++) {
      data.query.push({
        'code': e.target[i].id,
        'selection': {
          'filter': 'item',
          'values': [e.target[i].value]
        }
      });
    }

    searchData(data).then();
  }

  /**
   * Do a post request to TraFi API to search with given data values
   * Set results from the response
   * @param data given data values
   * @returns {Promise<void>}
   */
  const searchData = async (data) => {
    setLoading(true);

    const res = await fetch(
      `https://trafi2.stat.fi/PXWeb/api/v1/fi/TraFi/${id}?query=*&filter=*`,
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

  return (
    <div>

      <Link className='button primary' to='/'>Back</Link>

      {data &&
      <h3>{data.title}</h3>
      }

      <form onSubmit={onSubmit}>
        {data.variables && data.variables.map((item, index) => (
          <div key={'input' + index}>
            <label key={'label' + index} className='inline' htmlFor={item.code}>{item.code}</label>
            <div key={'select' + index} className='select'>
              <select key={item.code + index} name={item.code} id={item.code}>
                {item.values.map((value, index) => (
                  <option key={value} value={value}>{item['valueTexts'][index]}</option>
                ))
                }
              </select>
            </div>
          </div>

        ))
        }
        <input type='submit' value='Search' className='button button-primary' />
      </form>
      {loading && <Loader/>}
      {(results && !loading) && <Results results={results}/>}
    </div>
  );
};

export default Search;
