import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

const Ingredients = (props) => {
  // ADD & DELETE
  const [ings, setIngs] = useState([]);

  //UI
  const [loading, setloading] = useState(false);
  const [error, setError] = useState();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(
  //         'https://react-hooks-5d833-default-rtdb.firebaseio.com/ingredients.json'
  //       );
  //       const fetchedIngData = [];
  //       for (let key in res.data) {
  //         fetchedIngData.push({
  //           id: key,
  //           amount: res.data[key].amount,
  //           title: res.data[key].title,
  //         });
  //       }
  //       setIngs(fetchedIngData);
  //       console.log('Fetching ings...');
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, []);
  // // useEffect with [] as a second argument useEffect(() => {}, []) is equal to componentDidMount() and runs once after first mounting

  useEffect(() => {
    console.log('Rendering ingredients...');
  });
  // useEffect with no second argument useEffect(() => {}) is equal to componentDidUpdate() and runs for every render and re-render cycle

  const addIngredientHandler = async (ingredients) => {
    try {
      setloading(true);
      const res = await axios.post(
        'https://react-hooks-5d833-default-rtdb.firebaseio.com/ingredients.json',
        ingredients
      );
      setloading(false);
      setIngs((prevState) => [
        ...prevState,
        { id: res.data.name, ...ingredients },
      ]);
    } catch (err) {
      setError('Something went wrong!! 😯💥');
      setloading(false);
    }
  };

  const deleteHandler = async (id) => {
    try {
      setloading(true);
      await axios.delete(
        `https://react-hooks-5d833-default-rtdb.firebaseio.com/ingredients/${id}.json`
      );
      setloading(false);
      setIngs((prevState) => prevState.filter((ing) => ing.id !== id));
    } catch (err) {
      // set state that are together in the same synchronous execution cycle (e.g. in the same function)
      // will NOT trigger two component re-render cycles
      setError('Something went wrong!! 😯💥');
      setloading(false);
      // Instead, the component will only re-render once and both state updates will be applied simultaneously.
    }
  };

  const filterIngsHandler = useCallback((ingredients) => {
    setIngs(ingredients);
  }, []);

  const modalCloseHandler = () => {
    setError(null);
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={modalCloseHandler}>{error}</ErrorModal>}
      <IngredientForm addIngredient={addIngredientHandler} loading={loading} />

      <section>
        <Search filterIngs={filterIngsHandler} />
        <IngredientList ingredients={ings} onRemoveItem={deleteHandler} />
      </section>
    </div>
  );
};

export default Ingredients;
