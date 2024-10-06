import axios from 'axios';
import React, { useState } from 'react';
import ConfirmationModal from '../components/ConfirmationModal';
import EditUserModal from '../components/EditUserModal';

const UserList = ({ users, onDelete, onEdit, onViewDetails }) => {
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isEditOpen, setEditOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  // Handle delete click and open confirmation modal
  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setConfirmOpen(true);
  };

  // Handle confirming delete
  const handleConfirmDelete = async () => {
    try {
      // Perform the DELETE request to the API
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${userToDelete}`);
      // Call onDelete to remove the user from the state
      onDelete(userToDelete);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again later.');
    } finally {
      setConfirmOpen(false);
      setUserToDelete(null); // Clear selected user to delete
    }
  };

  // Handle edit click and open edit modal
  const handleEditClick = (user) => {
    setUserToEdit(user);
    setEditOpen(true);
  };

  // Handle updating user after editing
  const handleUpdateUser = async (updatedUser) => {
    try {

      await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser);
      onEdit(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again later.');
    } finally {
      // Close the edit modal after updating
      setEditOpen(false);
      setUserToEdit(null);
    }
  };

  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.username}</td>
              <td>
                <button className="btn-view" onClick={() => onViewDetails(user)}>View</button>
                <button className="btn-edit" onClick={() => handleEditClick(user)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDeleteClick(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Confirmation Modal for Deleting Users */}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      
      {/* Edit User Modal for Editing Users */}
      <EditUserModal
        isOpen={isEditOpen}
        onClose={() => {
          setEditOpen(false);
          setUserToEdit(null);
        }}
        user={userToEdit}
        onUpdate={handleUpdateUser}
      />
    </div>
  );
};

export default UserList;
