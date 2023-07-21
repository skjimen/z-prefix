import React, { useState, useEffect } from 'react';
import './App.css';
import UserRegistration from './UserRegistration';
import UserLogin from './UserLogin';
import InventoryPage from './InventoryPage';

const App = () => {

  return (
    <div className="App">
      <h1>Inventory Management System</h1>

      {/* Render UserRegistration component */}
      <UserRegistration />

      {/* Render UserLogin component */}
      <UserLogin />

      {/* Render InventoryPage component */}
      <InventoryPage />
    </div>
  );
};

export default App;
