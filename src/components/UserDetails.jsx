import React from 'react';

const UserDetails = ({ user }) => {
  if (!user) return <div>User not found!</div>;

  return (
    <div className='user-details'>
      <h2>{user.name}</h2>
      <p><strong>Username:</strong> {user.username || 'N/A'}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>
      <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
      <p><strong>Company:</strong> {user.company.name}</p>
    </div>
  );
};

export default UserDetails;
