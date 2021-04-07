import React from 'react';
import { connect } from 'react-redux';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth';

const App = (props) => {
  let index = <Auth />;
  if (props.isAuth) {
    index = <Ingredients />;
  }
  return index;
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.set.isAuth,
  };
};

export default connect(mapStateToProps)(App);
