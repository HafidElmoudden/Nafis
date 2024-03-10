import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Authentification from './pages/authentification';
import Home from './pages/home';
import { withLayout } from './Layout';


function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Authentification />}
        />
        <Route
          path="/home"
          element={withLayout(Home)()}
        />
      </Routes>
    </Router>
  );
}

export default App;
