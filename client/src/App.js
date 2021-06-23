import React, { useEffect } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

//Redux
import { Provider } from 'react-redux';
import store from './store';

// Component imports
import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className='App'>
          {/* <Alert /> */}
          <Switch>
            <PrivateRoute exact path='/' component={Dashboard} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
