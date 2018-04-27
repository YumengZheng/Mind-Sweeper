import React from 'react';
import { connect } from 'react-redux';
import App from './app.js';


var mapStateToProps = (state) => ({
  board: state.board,
  mineBoard: state.mineBoard,
  gameOver: state.gameOver
});

var AppContainer = connect(mapStateToProps)(App);

export default  AppContainer;