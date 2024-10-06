import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserDetails from './components/UserDetails';
import Home from './page/Home';

const App = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users.');
      }
    };
    fetchUsers();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home users={users} error={error} />} />
      <Route path="/user/:id" element={<UserDetails users={users} />} />
    </Routes>
  );
};

export default App;
