import React, { useEffect, useState } from 'react';

const EditUserModal = ({ isOpen, onClose, user, onUpdate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setErrors({ name: '', email: '', phone: '' });
      setLoading(false);
    }
  }, [isOpen, user]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ name: '', email: '', phone: '' });

    // Basic validation
    if (!name || name.length < 3) {
      setErrors(prev => ({ ...prev, name: 'Name is required and must be at least 3 characters.' }));
      return;
    }
    if (!validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: 'Email is required and must be valid.' }));
      return;
    }
    if (!validatePhone(phone)) {
      setErrors(prev => ({ ...prev, phone: 'Phone is required and must be a valid number.' }));
      return;
    }

    setLoading(true);

    const updatedUser = { ...user, name, email, phone };

    try {
      await onUpdate(updatedUser);
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Validation functions
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^\d+$/.test(phone);

  if (!isOpen) return null;

  return (
    <div className="edit-modal">
      <div className="edit-modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div>
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>
          <div>
            <label>Username</label>
            <input
              className='user-name'
              type="text"
              value={user.username}
              readOnly
            />
          </div>
          <button className='btn-update' type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
