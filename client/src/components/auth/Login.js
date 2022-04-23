import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Password has to be at least 6 characters long!')
    .required('Required'),
});

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login({ email, password });
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
        <h2 className='form-header'>Login</h2>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={async (values, actions) => {
            await login({ email: values.email, password: values.password });
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <form className='auth-form' onSubmit={props.handleSubmit}>
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
                Don't have an account?
                <Link to='/register'> Sign Up</Link>
              </small>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
