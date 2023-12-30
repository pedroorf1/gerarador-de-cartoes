// router/index.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaSenha from '../componentes/Segredo';
import CollectionPanel from '../componentes/Dashboard'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PaginaSenha />} />
      <Route path='/Dashboard' element={<CollectionPanel />}/>
    </Routes>
  );
};

const RoutesComponent = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default RoutesComponent;


