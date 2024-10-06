import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PacmanLoader } from 'react-spinners';
import CreateUserModal from '../components/CreateUserModal';
import EditUserModal from '../components/EditUserModal';
import UserDetails from '../components/UserDetails';
import UserList from '../components/UserList';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filtered users
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users.');
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  const handleCreateUser = (newUser) => {
    setUsers([...users, newUser]);
    setFilteredUsers([...users, newUser]); // Update filtered users
    setCreateModalOpen(false);
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setEditModalOpen(true);
  };

  const handleUpdateUser = (updatedUser) => {
    const updatedUsers = users.map(user => (user.id === updatedUser.id ? updatedUser : user));
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setEditModalOpen(false);
  };

  const handleViewDetails = (user) => {
    setCurrentUser(user);
    setDetailsModalOpen(true);
  };

  const handleSearch = () => {
    // Filter users based on the search term
    const results = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  };

  return (
    <div className="app">
      {loading ? (
        <div className="loader">
          <PacmanLoader color="blue" size={20} />
        </div>
      ) : (
        <>
          <h1>User Management</h1>
          <button
            onClick={() => setCreateModalOpen(true)}
            style={{
              padding: "10px 20px",
              backgroundColor: "blue",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "20px"
            }}
          >
            Create User
          </button>

          {/* Search Input */}
          <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "10px",
                width: "300px",
                marginRight: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc"
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                padding: "10px 15px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Search
            </button>
          </div>
          
          {error ? (
            <div>{error}</div>
          ) : (
            <>
              {filteredUsers.length === 0 ? (
                <div>user not found</div>
              ) : (
                <UserList
                  users={filteredUsers}
                  onDelete={handleDeleteUser}
                  onEdit={handleEditUser}
                  onViewDetails={handleViewDetails}
                />
              )}
            </>
          )}
        </>
      )}

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateUser}
      />
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        user={currentUser}
        onUpdate={handleUpdateUser}
      />
      {isDetailsModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setDetailsModalOpen(false)}>&times;</span>
            <UserDetails user={currentUser} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
