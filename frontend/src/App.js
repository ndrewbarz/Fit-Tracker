import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Sidebar from './components/Sidebar/Sidebar';
import Verify from './components/Verify/Verify';

import { SwitchRoutes } from './utils/switchRoutes';
import { getUserData } from './actions/userAction';

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
  const classes = useStyles();

  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(getUserData());
    }
  }, []);

  return (
    <Router>
      <div className={classes.toolbar} />
      <Sidebar />
      <Container maxWidth='sm'>
        <main className={classes.content}>
          <SwitchRoutes />
          <Route path='/account/verify' component={Verify} />
        </main>
      </Container>
    </Router>
  );
};

export default App;
