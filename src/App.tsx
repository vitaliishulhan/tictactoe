import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './features/board/Board'
import BoardSizeCounter from './features/boardSizeCounter/BoardSizeCounter'
import { selectRole } from './features/role/roleSlice'
import {
  selectWonX,
  selectWonO,
  selectDraw
} from './features/statistics/statisticsSlice'
import { useSelector } from 'react-redux'
import { selectMessage } from './features/message/messageSlice';

function App() {

  const role = useSelector(selectRole)

  const message = useSelector(selectMessage)

  const wonX = useSelector(selectWonX)
  const wonO = useSelector(selectWonO)
  const draw = useSelector(selectDraw)

  const handleClick = () => {
    console.log('App')
  }

  return (
    <div className="App">
      <header className="tictactoe-header">
        <div className="tictactoe-title">Tic Tac Toe</div>
        <BoardSizeCounter />
      </header>
      <Board />
      <footer className="tictactoe-footer">
        <div className="tictactoe-game-info">
          <div>{`Actual step: ${role}`}</div>
          <div>
            <div>{message}</div>
            <div>{message && 'Click on the screen to start new round'}</div>
          </div>
        </div>
        <div className="tictactoe-statistics">
          <div style={{marginBottom: 10}}>Statistics</div>
          <div>{`X won: ${wonX}`}</div>
          <div>{`O won: ${wonO}`}</div>
          <div>{`Draw: ${draw}`}</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
