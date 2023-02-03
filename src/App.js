import { useState } from 'react';
import './App.css';

const TicTacToeRow = ({ row, fields, setField, user, complete }) => {
  return (
    <div className='tic-tac-row'>
      <div className='tic-tac-cell' onClick={()=> {if (!complete) setField(row, 0, user)}}>
        <p>{fields[row][0]}</p>
      </div>
      <div className='tic-tac-cell' onClick={()=> {if (!complete) setField(row, 1, user)}}>
        <p>{fields[row][1]}</p>
      </div>
      <div className='tic-tac-cell' onClick={()=> {if (!complete) setField(row, 2, user)}}>
        <p>{fields[row][2]}</p>
      </div>
    </div>
  )
}

function App() {

  const initialFields = [[false, false, false],
                         [false, false, false],
                         [false, false, false]];

  //Each field can be either false, user1 or user2                       
  const [fields, setFields] = useState(initialFields);
  //Counter for wins
  const [user1, setUser1] = useState(0);
  const [user2, setUser2] = useState(0);
  //Current user to make a move, id by num for ease
  const [curUser, setCurUser] = useState('X');
  const [complete, setComplete] = useState(false);

  function resetBoard() {
    setFields(initialFields);
    setComplete(false);
  }

  function checkRow(row, user) {
    //[row][0], [1], [2]
    let num = 0;
    fields[row].forEach((e) => {
      //if not user
      if ((e === user)) num++;
    });
    if (num !== 3) return false;
    return true;
  }

  function checkColumn(column, user) {
    let num = 0;
    fields.forEach((e) => {
      //if not user
      if ((e[column] === user)) num++;
    })
    if (num !== 3) return false;
    return true;
  }

  function checkDiagonal(row, column, user) {
    //[0][0] or [2][2]
    let num = 0;
    if ((row === 0 && column === 0) ||
        (row === 2 && column === 2) ||
        (row === 1 && column === 1)) {
      let i = 0;
      fields.forEach((e) => {
        if ((e[i] === user)) num++;
        i++;
      })
    }
    //[0][2] or [2][0]
    else if ((row === 0 && column === 2) ||
        (row === 2 && column === 0) ||
        (row === 1 && column === 1)) {
      let i = 2;
      fields.forEach((e) => {
        if ((e[i] === user)) num++;
        i--; 
      })
    }
    if (num !== 3) return false;
    return true;
  }
  
  function setField(row, column, user) {
    //if field not set yet
    if (!fields[row][column]) fields[row][column] = user;
    setFields([...fields]);

    let win = false;
    if (row === 1 && column === 1) { //If middle
      win = checkRow(row, user);
      if (!win) win = checkColumn(column, user);
      if (!win) win = checkDiagonal(row, column, user);
    } else if ((row === 0 || row === 2) && 
               (column === 0 || column === 2)) { //If edge
      win = checkRow(row, user);
      if (!win) win = checkColumn(column, user);
      if (!win) win = checkDiagonal(row, column, user);
    } else { //If middle of row or column
      win = checkRow(row, user);
      if (!win) win = checkColumn(column, user);
    }
    
    if (win) {
      if (user === 'X') setUser1(user1 + 1);
      else setUser2(user2 + 1);
      setComplete(true);
    }
    if (user === 'X') setCurUser('O');
    else setCurUser('X');
  }

  return (
    <div className='outer-container'>
      <div className='score'>
        {"X: " + user1 + ", O: " + user2}
      </div>
      <div className='tic-tac-container'>
        <TicTacToeRow row={0} fields={fields} setField={setField} user={curUser} complete={complete} />
        <TicTacToeRow row={1} fields={fields} setField={setField} user={curUser} complete={complete} />
        <TicTacToeRow row={2} fields={fields} setField={setField} user={curUser} complete={complete} />
      </div>
      <button onClick={()=>resetBoard()}>Reset board</button>
    </div>
  );
}

export default App;
