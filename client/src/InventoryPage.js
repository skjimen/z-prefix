import React, { useState, useEffect } from 'react';

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    // Fetch inventory data from the server when the component mounts
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      // Send a request to fetch all items from the server
      const response = await fetch('http://localhost:5000/items');

      if (!response.ok) {
        throw new Error('Failed to fetch inventory');
      }

      const inventoryData = await response.json();
      setInventory(inventoryData);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  return (
    <div>
      <h2>Inventory Page</h2>
      {inventory.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description.length > 100 ? item.description.slice(0, 100) + '...' : item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default InventoryPage;
