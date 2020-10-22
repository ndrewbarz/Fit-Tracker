import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    display: 'flex',
    flexDirection: 'column',
  },
}));

const SignIn = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  // const { loading, error } = user;
  const redirect = location.search
    ? location.search.split('=')[1]
    : '/profile/dashboard';

  useEffect(() => {
    if (user) {
      history.push(redirect);
    }
  }, [history, user, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch login
    dispatch(login(email, password));
  };

  const classes = useStyles();

  return (
    <>
      {/* {error && } */}
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={submitHandler}
      >
        <Typography variant='h2' gutterBottom>
          Sign In
        </Typography>
        <TextField
          label='Email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant='contained' color='primary' type='submit'>
          Sign In
        </Button>
        {/* <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
          Don't have an account? Sign Up
        </Link> */}
      </form>
    </>
  );
};

export default SignIn;
