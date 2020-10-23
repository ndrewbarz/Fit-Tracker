import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Sidebar from './components/Sidebar/Sidebar';
import Container from '@material-ui/core/Container';

import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';
import Verify from './components/Verify/Verify';

import { useDispatch, useSelector } from 'react-redux';
import { userVerifySuccess } from './reducers/userReducers';
import { getStartupData } from './actions/userActions';

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    display: 'flex',
    marginTop: '100px',
  },
}));
const App = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const switchRoutes = (
    <Switch>
      {!isAuth
        ? authRoutes.map((prop, key) => {
            if (prop.layout === '/account') {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            }
          })
        : profileRoutes.map((prop, key) => {
            if (prop.layout === '/profile') {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            }
          })}
    </Switch>
  );

  const classes = useStyles();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      dispatch(userVerifySuccess());
      dispatch(getStartupData());
    }
  }, [token]);

  // useEffect(() => {
  //   if (token && isAuth) {
  //     dispatch(userVerifySuccess());
  //     dispatch(getStartupData());
  //   }
  // }, [isAuth, token]);

  return (
    <Router>
      <div className={classes.toolbar} />
      <Sidebar authRoutes={authRoutes} profileRoutes={profileRoutes} />
      <Container maxWidth='sm'>
        <main className={classes.content}>
          {switchRoutes}
          <Route path='/account/verify' component={Verify} />
        </main>
      </Container>
    </Router>
  );
};

export default App;
