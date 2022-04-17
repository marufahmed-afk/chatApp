import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const { username, email, password, password2 } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      setAlert("passwords don't match", 'danger');
    } else {
      register({ username, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='auth-grid container'>
      <div className='intro'>
        <img
          src={require('../../assets/intro-logo.svg')}
          alt=''
          className='intro-logo'
        />
        <p className='intro-text'>
          Meet your next favorite messaging platform!
        </p>
      </div>

      <div className='form-box'>
        <h2 className='form-header'>Register</h2>
        <form className='auth-form' onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            value={username}
            onChange={(e) => handleChange(e)}
          />

          <label htmlFor='email'>Email</label>
          <input
            type='text'
            name='email'
            value={email}
            onChange={(e) => handleChange(e)}
          />

          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => handleChange(e)}
          />

          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={(e) => handleChange(e)}
          />

          <input className='auth-form-btn' type='submit' />
          <small>
            Already have an account?
            <Link to='/login'> Sign In</Link>
          </small>
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
