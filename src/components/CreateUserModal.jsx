import axios from 'axios';
import React, { useState } from 'react';

const CreateUserModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: { street: '', city: '' },
    company: { name: '' },
    website: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    address: { street: '', city: '' },
    company: { name: '' },
    website: '',
    username: '',
  });

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^\d+$/.test(phone);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({
      name: '',
      email: '',
      phone: '',
      address: { street: '', city: '' },
      company: { name: '' },
      website: '',
      username: '',
    });

    // Validation checks
    if (!formData.name || formData.name.length < 3) {
      setErrors(prev => ({ ...prev, name: 'Name is required and must be at least 3 characters.' }));
      return;
    }
    if (!validateEmail(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Email is required and must be valid.' }));
      return;
    }
    if (!validatePhone(formData.phone)) {
      setErrors(prev => ({ ...prev, phone: 'Phone is required and must be a valid number.' }));
      return;
    }
    if (!formData.address.street || !formData.address.city) {
      setErrors(prev => ({
        ...prev,
        address: {
          street: !formData.address.street ? 'Street is required.' : '',
          city: !formData.address.city ? 'City is required.' : '',
        }
      }));
      return;
    }
    if (formData.company.name && formData.company.name.length < 3) {
      setErrors(prev => ({ ...prev, company: { name: 'Company Name must be at least 3 characters if provided.' } }));
      return;
    }
    if (formData.website && !/^https?:\/\//i.test(formData.website)) {
      setErrors(prev => ({ ...prev, website: 'Website must be a valid URL if provided.' }));
      return;
    }

    const username = formData.name.split(' ').join('-').toLowerCase(); // Automatically generate username
    if (username.length < 3) {
      setErrors(prev => ({ ...prev, username: 'Username must be in the format USER-xxx and at least 6 characters long.' }));
      return;
    }

    try {
      const newUser = { ...formData, username, id: Math.random() }; // Simulate ID assignment
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
      onCreate(response.data);
      onClose();
    } catch {
      setErrors(prev => ({ ...prev, server: 'Failed to create user. Please try again.' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="create-modal">
      <div className="create-modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Create New User</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input name="name" placeholder="Name" onChange={handleChange} required />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div>
            <input name="email" placeholder="Email" onChange={handleChange} required />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div>
            <input name="phone" placeholder="Phone" onChange={handleChange} required />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>
          <div>
            <input name="address.street" placeholder="Street" onChange={handleChange} required />
            {errors.address.street && <p className="error">{errors.address.street}</p>}
          </div>
          <div>
            <input name="address.city" placeholder="City" onChange={handleChange} required />
            {errors.address.city && <p className="error">{errors.address.city}</p>}
          </div>
          <div>
            <input name="company.name" placeholder="Company" onChange={handleChange} />
            {errors.company.name && <p className="error">{errors.company.name}</p>}
          </div>
          <div>
            <input name="website" placeholder="Website" type="url" onChange={handleChange} />
            {errors.website && <p className="error">{errors.website}</p>}
          </div>
          <div>
            <input name="username" value={formData.name.split(' ').join('-').toLowerCase()} readOnly />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <button type="submit" className='create-btn'>Create</button>
          {errors.server && <p className="error">{errors.server}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
