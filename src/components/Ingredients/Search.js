import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo((props) => {
  const { filterIngs } = props;
  const [search, setSearch] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search === inputRef.current.value) {
        const fetchData = async () => {
          try {
            const query =
              search.length === 0 ? '' : `?orderBy="title"&equalTo="${search}"`;
            const res = await axios.get(
              'https://react-hooks-5d833-default-rtdb.firebaseio.com/ingredients.json' +
                query
            );
            const fetchedIngData = [];
            for (let key in res.data) {
              fetchedIngData.push({
                id: key,
                amount: res.data[key].amount,
                title: res.data[key].title,
              });
            }
            filterIngs(fetchedIngData);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }
    }, 500);
    // useEffect can take a clean up function that runs before every useEffect
    // return the clean up function
    return () => {
      clearTimeout(timer);
    };
  }, [search, filterIngs, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
