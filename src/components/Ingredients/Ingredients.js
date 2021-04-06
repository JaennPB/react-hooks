import React, { useState, useEffect } from 'react';
import axios from 'axios';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = (props) => {
  const [currIngs, setIngs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'https://react-hooks-5d833-default-rtdb.firebaseio.com/ingredients.json'
        );
        const fetchedIngData = [];
        for (let key in res.data) {
          fetchedIngData.push({
            id: key,
            amount: res.data[key].amount,
            title: res.data[key].title,
          });
        }
        setIngs(fetchedIngData);
        console.log('Fetching ings...');
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  // useEffect with [] as a second argument useEffect(() => {}, []) is equal to componentDidMount() and runs once after first mounting

  useEffect(() => {
    console.log('Rendering ingredients...');
  });
  // useEffect with no second argument useEffect(() => {}) is equal to componentDidUpdate() and runs for every render and re-render cycle

  const addIngredientHandler = async (ingredients) => {
    try {
      const res = await axios.post(
        'https://react-hooks-5d833-default-rtdb.firebaseio.com/ingredients.json',
        ingredients
      );
      setIngs((prevState) => [
        ...prevState,
        { id: res.data.name, ...ingredients },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = (id) => {
    setIngs((prevState) => prevState.filter((ing) => ing.id !== id));
  };

  const filterIngsHandler = (ingredients) => {
    setIngs(ingredients);
  };

  return (
    <div className="App">
      <IngredientForm addIngredient={addIngredientHandler} />

      <section>
        <Search filterIngs={filterIngsHandler} />
        <IngredientList ingredients={currIngs} onRemoveItem={deleteHandler} />
      </section>
    </div>
  );
};

export default Ingredients;
