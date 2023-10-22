import React from 'react';
import {  Route, Routes  } from 'react-router-dom';

import Home from './Home.js';
import Login from './Login.js';
import Dashboard from './Dashnoard.js';
import AllPosts from './AllPosts.js';
import Registration from './Registration.js';

function App() {
  return (
      <Routes>
        <Route path="/" exact element={ <Home/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/register" element={ <Registration/> } />
        <Route path="/dashboard" element={ <Dashboard/> } />
        <Route path="/allposts" element={ <AllPosts/> } />
      </Routes>
  );
}

export default App;
