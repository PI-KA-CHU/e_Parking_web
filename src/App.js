import React from 'react';
import './App.css';
import Home from './pages/Home';
import Reserve from './pages/Reserve'
import {HashRouter, Route} from 'react-router-dom'

function App() {
  return (
    <div>
      <HashRouter>
        <Route exact path="/reserve" component={Reserve} />
        <Route exact path="/" component={Home} />
      </HashRouter>
    </div>
  );
}

export default App;
