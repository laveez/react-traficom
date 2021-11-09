import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Search = () => {

  const [data, setData] = useState({});
  const id = useParams().id;

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`https://trafi2.stat.fi/PXWeb/api/v1/fi/TraFi/${id}?query=*&filter=*`);
      const dataFromServer = await res.json();
      setData(dataFromServer);
    }

    getData().then();
  }, [id]);

  return (
    <div>

      <Link className='button primary' to='/'>Back</Link>

      {data &&
      <h3>{data.title}</h3>
      }

      <form>
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
      </form>

    </div>
  );
};

export default Search;
