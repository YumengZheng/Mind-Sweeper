import React from 'react';
import { debug } from 'util';
import store from './store.js';

const app = {
  display:'flex',
  margin:'200px auto',
  width: '500px',
  height: '500px',
  flexDirection:'column',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
}

const row = {
  margin:'0',
  padding:'0',
  display:'flex',
  width:'100%',
  height: '50px',
  border:'0.3px solid 	#ccccff'
}

const box = {
  display:'flex',
  backgroundColor: 'white',
  margin:'0',
  height: '100%',
  border:'0.3px solid 	#ccccff',
  flex:'1',
  boxShadow: '0px 8px 10px 0px rgba(0, 0, 0, .3), inset 0px 4px 1px 1px white, inset  0px -2px 7px 5px  rgba(204,198,197,.5)',
}

const imageBox = {
  width:'80%',
  maxHeight:'80%',
  margin:'auto auto',
  display:'block'
}

const clickedBox = {
  display:'flex',
  backgroundColor: '#e1fbfb',
  margin:'0',
  height: '100%',
  border:'0.3px solid #ccccff',
  flex:'1',
  boxShadow:'inset 0 0 20px #ccccff'
}

const innerbox = {
  display:'block',
  margin:'auto auto',
  color:'	#3377ff'
}



export default class App extends React.Component {
  constructor(props) {
    super(props)
    
    this.makeMinBoard = this.makeMinBoard.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.checkIfMine = this.checkIfMine.bind(this)
    this.checkBox = this.checkBox.bind(this)
    this.checkAroundBox = this.checkAroundBox.bind(this)
    this.checkWin = this.checkWin.bind(this)
  }
  componentWillMount() {
    this.makeMinBoard()
  }

  makeMinBoard() {
    let mineBoard =  [['', '', '', '', '', '', '', '', '', ''],
                      ['', '', '', '', '', '', '', '', '', ''],
                      ['', '', '', '', '', '', '', '', '', ''],
                      ['', '', '', '', '', '', '', '', '', ''],
                      ['', '', '', '', '', '', '', '', '', ''],
                      ['', '', '', '', '', '', '', '', '', ''],
                      ['', '', '', '', '', '', '', '', '', ''],
                      ['', '', '', '', '', '', '', '', '', ''],
                      ['', '', '', '', '', '', '', '', '', ''],
                      ['', '', '', '', '', '', '', '', '', '']];

    for(let i = 0; i < 10; i++) {
      let row = Math.floor(Math.random()*10)
      let col = Math.floor(Math.random()*10)
      if(mineBoard[row][col]!== '@'){
        mineBoard[row][col] = '@'
      } else {
        i--
      }
    }
    console.log(mineBoard)
    store.dispatch({type: 'CHANGE_MINEBOARD', mineBoard: mineBoard});
  }

  handleClick(e) {
    if(!this.props.gameOver){
      let row = Math.floor(e.target.id/10)
      let col = e.target.id%10
      if(this.props.mineBoard[row][col] === '@') {
        let finalBoard = [].concat(this.props.board)
        for(let i = 0; i < 10; i++){
          for(let j = 0; j < 10; j++){
            if(this.props.mineBoard[i][j] === '@'){
              finalBoard[i][j]='@'
            }
          }
        }
        store.dispatch({type:'CHANGE_BOARD', newBoard: finalBoard});
        store.dispatch({type:'GAME_OVER', gameOver: true});
        setTimeout(() => {
          alert('SORRY YOU LOST');
        }, 400)  
      } else {
        let newBoard = [].concat(this.props.board)
        this.checkBox(row, col, newBoard)
        store.dispatch({type:'CHANGE_BOARD', newBoard: newBoard});
        this.checkWin(newBoard)
      } 
    }
  }

  checkBox(row, col, newBoard) {
    if(row<0 || row>9 || col<0 || col>9){
      return 
    }
    if(newBoard[row][col] === 'O') {
      return 
    } else {
      newBoard[row][col] = 'O' 
      let count = 0
      count = this.checkAroundBox(row, col, count, newBoard)
      if(count>0) {
        newBoard[row][col] = count
      }
    }
  }

  checkAroundBox(row, col, count, newBoard) {
    let checkPosition1 = this.checkIfMine(row-1, col-1) 
    let checkPosition2 = this.checkIfMine(row-1, col) 
    let checkPosition3 = this.checkIfMine(row-1, col+1) 
    let checkPosition4 = this.checkIfMine(row, col-1) 
    let checkPosition5 = this.checkIfMine(row, col+1) 
    let checkPosition6 = this.checkIfMine(row+1, col-1) 
    let checkPosition7 = this.checkIfMine(row+1, col) 
    let checkPosition8 = this.checkIfMine(row+1, col+1) 

    if(checkPosition1 === 1){count++} 
    if(checkPosition2 === 1){count++} 
    if(checkPosition3 === 1){count++} 
    if(checkPosition4 === 1){count++} 
    if(checkPosition5 === 1){count++} 
    if(checkPosition6 === 1){count++} 
    if(checkPosition7 === 1){count++} 
    if(checkPosition8 === 1){count++} 

    if(count === 0){
      if(checkPosition1 === 0){
        this.checkBox(row-1, col-1, newBoard)
      }
      if(checkPosition2 === 0){
        this.checkBox(row-1, col, newBoard)
      }
      if(checkPosition3 === 0){
        this.checkBox(row-1, col+1, newBoard)
      } 
      if(checkPosition4 === 0){
        this.checkBox(row, col-1, newBoard)
      }
      if(checkPosition5 === 0){
        this.checkBox(row, col+1, newBoard)
      }
      if(checkPosition6 === 0){
        this.checkBox(row+1, col-1, newBoard)
      }
      if(checkPosition7 === 0){
        this.checkBox(row+1, col, newBoard)
      }
      if(checkPosition8 === 0){
        this.checkBox(row+1, col+1, newBoard)
      }
    }

    return count
  }

  checkIfMine(row, col) {
    if(row<0 || row>9 || col<0 || col>9){
      return 
    }
    if(this.props.mineBoard[row][col] === '@'){
      return 1 
    } else if (this.props.mineBoard[row][col] === ''){
      return 0
    }
  }

  checkWin(board) {
    let count = 0
    board.forEach((n,i) => {
      n.forEach((m,j) => {
        if(m===''){
          count++
        }
      })
    }) 
    if(count===10){
      this.setState({
        gameOver:true
      })
      setTimeout(()=>{
        alert('YOU WIN!!!')
      }, 200)
    }
  }

  render() {
    console.log('boardrender',this.props.board)
    const board = this.props.board.map((n,i) => {
      let list = n.map((m,j) => {
        if(m==='') {
          return <li style={box} id={i*10+j} onClick ={(e) => {this.handleClick(e)}}><div style={innerbox}>{m}</div></li>
        }
        if(m==='O'){
          return <li style={clickedBox} id={i*10+j} onClick ={(e) => {this.handleClick(e)}}><div style={innerbox}></div></li>
        } else if(m==='@'){
          return <li style={clickedBox} id={i*10+j} onClick ={(e) => {this.handleClick(e)}}><img style={imageBox} src='pepper2.png' /></li>
        } else {
          return <li style={clickedBox} id={i*10+j} onClick ={(e) => {this.handleClick(e)}}><div style={innerbox}>{m}</div></li>
        }
      })
      return <ul style={row}>{list}</ul>
    }) 
  return (
    <div style={app}>
    {board}
    </div>
  )
  }
}