var changeBoard = (newBoard) => {
  console.log('action',newBoard)
  return {
    type: 'CHANGE_BOARD',
    newBoard: newBoard
    }
}


var changeMineBoard = (mineBoard) =>({
  type: 'CHANGE_MINEBOARD',
  mineBoard: mineBoard
})

var GameStatus = (gameOver) =>({
  type: 'GAME_OVER',
  gameOver: gameOver
})


  
module.exports.changeBoard = changeBoard;
module.exports.changeMineBoard = changeMineBoard;
module.exports.GameStatus = GameStatus;
