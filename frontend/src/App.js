import './App.css';
import React from 'react';
import AddItem from './components/AddItem';
import LostItems from './components/LostItems';
import FoundItems from './components/FoundItems';

function App() {
  return (
    <div className="container">
      <header className="header" style={{marginBottom:16}}>
        <h1 className="title">Lost & Found Portal</h1>
        <div className="muted">Report or browse items</div>
      </header>

      <div style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap: 20}}>
        <div>
          <AddItem />
        </div>
        <div>
          <LostItems />
          <FoundItems />
        </div>
      </div>
    </div>
  );
}

export default App;

