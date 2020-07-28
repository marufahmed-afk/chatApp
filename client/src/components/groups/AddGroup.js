import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createGroup } from '../../actions/groups';

const AddGroup = ({ createGroup, openForm, setOpenForm }) => {
  const [formData, setFormData] = useState({
    name: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createGroup(formData);
    setOpenForm(!openForm);
    console.log('create group called...');
  };
  return (
    <div className=' form-box'>
      <form className='auth-form' onSubmit={handleSubmit}>
        <h2>Create/Join a Group</h2>
        <label htmlFor='name'>Group Name</label>
        <input type='text' name='name' onChange={handleChange} />
        <input className='auth-form-btn' type='submit' value='GO!' />
      </form>
    </div>
  );
};

export default connect(null, { createGroup })(AddGroup);
