import Redux, { combineReducers }  from 'redux';


var board = (state = 
[['', '', '', '', '', '', '', '', '', ''],
['', '', '', '', '', '', '', '', '', ''],
['', '', '', '', '', '', '', '', '', ''],
['', '', '', '', '', '', '', '', '', ''],
['', '', '', '', '', '', '', '', '', ''],
['', '', '', '', '', '', '', '', '', ''],
['', '', '', '', '', '', '', '', '', ''],
['', '', '', '', '', '', '', '', '', ''],
['', '', '', '', '', '', '', '', '', ''],
['', '', '', '', '', '', '', '', '', '']], action) => {
  switch (action.type) {
  case 'CHANGE_BOARD':
    return action.newBoard || null;
  default:
    return state;
  }
};

var mineBoard = (state = [], action) => {
    switch (action.type) {
    case 'CHANGE_MINEBOARD':
      return action.mineBoard || null;
    default:
      return state;
    }
  };

var gameOver = (state = false, action) => {
  switch (action.type) {
  case 'GAME_OVER':
    console.log('reducer',action.gameOver )
    return action.gameOver || null;
  default:
    return state;
  }
};

var rootReducer = combineReducers({
  board,
  mineBoard,
  gameOver
});


export default rootReducer;