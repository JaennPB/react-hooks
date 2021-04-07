import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/actionsIndex';

import Card from './UI/Card';
import './Auth.css';

const Auth = (props) => {
  return (
    <div className="auth">
      <Card>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <button onClick={props.setAuthState}>Log In</button>
      </Card>
    </div>
  );
};

export default connect(null, actions)(Auth);
