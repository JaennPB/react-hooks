import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = (props) => {
  const [currIngs, setIngs] = useState([]);

  const addIngredientHandler = (ingredients) => {
    setIngs((prevState) => [
      ...prevState,
      { id: Math.random().toString(), ...ingredients },
    ]);
  };

  const deleteHandler = (id) => {
    setIngs((prevState) => prevState.filter((ing) => ing.id !== id));
  };

  return (
    <div className="App">
      <IngredientForm addIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList ingredients={currIngs} onRemoveItem={deleteHandler} />
      </section>
    </div>
  );
};

export default Ingredients;
