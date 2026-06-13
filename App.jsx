
import { useState } from 'react';


import './App.css';


function Square({ value, onSquareClick }) {
  return (
    <button 

      className="square" 
      /* colleghiamo il click del mouse alla funzione passata dal padre */
      onClick={onSquareClick}
    >
      {}
      {value}
    </button>
  );
}


function App() {

  const [squares, setSquares] = useState(Array(9).fill(null));
  

  const [xIsNext, setXIsNext] = useState(true);


  function handleClick(index) {

    if (squares[index] || calculateWinner(squares)) {
      return;
    }


    const nextSquares = squares.slice();
    

    if (xIsNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";
    }


    setSquares(nextSquares);
    

    setXIsNext(!xIsNext);
  }


  function handleReset() {
    // svuotiamo l'array riportando tutte le caselle a null
    setSquares(Array(9).fill(null));
    // reimpostiamo il primo turno a X
    setXIsNext(true);
  }

  /*
    CONTROLLO STATO PARTITA:
    Ad ogni render della pagina, calcoliamo se c'è un vincitore 
    passando l'array squares attuale alla  funzione  */
  const winner = calculateWinner(squares);
  
  // creiamo una variabile per salvare il testo informativo da mostrare all'utente
  let status;
  if (winner) {

    status = "Vincitore: " + winner;
  } else if (!squares.includes(null)) {

    status = "Partita terminata in Pareggio!";
  } else {
  
    status = "Prossimo giocatore: " + (xIsNext ? "X" : "O");
  }


  return (
    <div className="game-container">
      
      {/* intestazione del gioco */}
      <h1>Il Gioco del Tris</h1>
      
      {/* Box di stato partita: cambierà colore o testo se c'è un vincitore o un pareggio */}
      <div className="status">{status}</div>
      
      {/* RIGA 1 DELLA GRIGLIA */}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      
      {/* RIGA 2 DELLA GRIGLIA */}
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      
      {/* RIGA 3 DELLA GRIGLIA */}
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>

      {/* PULSANTE DI RESET

      */}
      <button className="reset-btn" onClick={handleReset}>
        Ricomincia Partita
      </button>

    </div>
  );
}


function calculateWinner(squares) {
  /*
    Matrice delle linee vincenti:
     q uesto array di array contiene tutte le 8 possibili combinazioni di indici 
    che permettono di fare tris sulla scacchiera
  */
  const lines = [
    [0, 1, 2], // Prima riga orizzontale
    [3, 4, 5], // seconda riga orizzontale
    [6, 7, 8], // terza riga orizzontale
    [0, 3, 6], // Prima colonna verticale
    [1, 4, 7], // Seconda colonna verticale
    [2, 5, 8], // Terza colonna verticale
    [0, 4, 8], // Diagonale principale
    [2, 4, 6]  
  ];


  for (let i = 0; i < lines.length; i++) {

    const [a, b, c] = lines[i];
    
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // ritorniamo il simbolo vincente trovato ("X" oppure "O")
      return squares[a];
    }
  }

  // se il ciclo finisce e nessuna linea è vincente, ritorniamo null (nessun vincitore per ora)
  return null;
}

// esportiamo il componente per renderlo disponibile all'applicazione
export default App;