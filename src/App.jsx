// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Home from './components/Home';
import ExpenseTracker from './components/ExpenseTracker';
import './App.css'

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element= {<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
