
import './App.css';
import HouseLayout from './HouseLayout';
import { useEffect, useState } from 'react';

// Inputx



// var s, row, col;
function App() {
  const [row, setRow] = useState();
  const [col, setCol] = useState();

  const handleChangeRow = (e) => {
    // 👇 Store the input value to local state
    setRow(e.target.value);
  };

  const handleChangeCol = (e) => {
    setCol(e.target.value)
  }

  return (
    <div>
      <input type="text" onChange={handleChangeRow} value={row} placeholder='enter no. of rows' />
      <br />
      <input type="text" onChange={handleChangeCol} value={col} placeholder='enter no. of columns' />
      <HouseLayout rows={row} cols={col} />
    </div>
  );



}


export default App;
