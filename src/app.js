import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Main from './components/Main';
import './scss/style.scss';

ReactDOM.render(
  <Fragment>
    <Header/>
    <Main/>
  </Fragment>, document.getElementById('root'),
);
