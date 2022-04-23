import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, 'Username has to be at least 6 characters long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Password has to be at least 6 characters long!')
    .required('Required'),
});

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
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
          }}
          validationSchema={RegisterSchema}
          onSubmit={async (values, actions) => {
            await register({
              username: values.username,
              email: values.email,
              password: values.password,
            });
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <form className='auth-form' onSubmit={props.handleSubmit}>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                name='username'
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.username}
              />
              <ErrorMessage name='username'>
                {(msg) => <div className='errorText'>{msg}</div>}
              </ErrorMessage>

              <label htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
              />
              <ErrorMessage name='email'>
                {(msg) => <div className='errorText'>{msg}</div>}
              </ErrorMessage>

              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
              />
              <ErrorMessage name='password'>
                {(msg) => <div className='errorText'>{msg}</div>}
              </ErrorMessage>

              <input className='auth-form-btn' type='submit' />
              <small>
                Already have an account?
                <Link to='/login'> Sign In</Link>
              </small>
            </form>
          )}
        </Formik>
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
