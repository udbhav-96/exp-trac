// src/components/Logout.js
import React from 'react';
import { auth } from '../firebase';

const Logout = () => {
  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
