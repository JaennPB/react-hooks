import React from 'react';

import './IngredientList.css';

const IngredientList = (props) => {
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map((ig) => (
          // .bind() is just to prevent invocation of passed function that will receive paramenters
          // you can alternatively use {() => props.onRemoveItem(ig.id)}
          <li key={ig.id} onClick={() => props.onRemoveItem(ig.id)}>
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
