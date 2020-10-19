import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Sidebar from './components/Sidebar/Sidebar';
import Container from '@material-ui/core/Container';

import authRoutes from './routes/authRoutes';
import Verify from './components/Verify/Verify';

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

const switchRoutes = (
  <Switch>
    {authRoutes.map((prop, key) => {
      if (prop.layout === '/account') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    {/* <Redirect from='/admin' to='/admin/dashboard' /> */}
  </Switch>
);

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.toolbar} />
      <Sidebar authRoutes={authRoutes} />
      <Container maxWidth='sm'>
        <main className={classes.content}>
          {switchRoutes}
          <Route path='/account/verify' component={Verify} />
          {/* <Switch>
          <Route path='/register' component={SignUp} />
          <Route path='/login' component={SignIn} />
        </Switch> */}
        </main>
      </Container>
    </Router>
  );
};

export default App;
