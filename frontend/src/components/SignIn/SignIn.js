import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { getUserData, login } from '../../actions/userAction';

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

const SignIn = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
    const success = await dispatch(login(email, password));
    if (success) {
      await dispatch(getUserData());
      history.push('/profile/dashboard');
    } else {
      {
        alert('Please check your email and password');
      }
    }
  };

  const classes = useStyles();
  return (
    <>
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
        <Link to='/account/register'>Don't have an account? Sign Up</Link>
      </form>
    </>
  );
};

export default SignIn;
