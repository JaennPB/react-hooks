import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo((props) => {
  const { filterIngs } = props;
  const [search, setSearch] = useState('');

  useEffect(() => {
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
        // filterIngs(fetchedIngData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [search, filterIngs]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
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
