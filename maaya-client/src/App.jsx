import React from 'react';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header className = 'App-header'>
      <h1> welcome to my React App!</h1>
      <p>
        Name: Maaya <br />
        Email: maaya123@gmail.com<br />
        other personal Info: {""}
        <a 
         href= "https://github.com/MiniervaMaaya/maaya-webprog"
         target="_blank"
        >
          GitHub Repository
        </a>
      </p>
      </header>
    </div>

  );
}

export default App;