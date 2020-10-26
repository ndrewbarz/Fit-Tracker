import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { register } from '../../actions/userAction';

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

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccessSignup, setIsSuccessSignup] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log('password do not much');
    } else {
      const success = await dispatch(register(email, password));
      if (success) {
        setIsSuccessSignup(true);
        setConfirmPassword('');
        setEmail('');
        setPassword('');
      }
    }
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
          Sign Up
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
        <TextField
          label='Confirm Password'
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button variant='contained' color='primary' type='submit'>
          Sign Up
        </Button>
        <Link to='/account/login'>Do you have an account? Sign In</Link>

        {isSuccessSignup && <h1>Please check your email</h1>}
      </form>
    </>
  );
};

export default SignUp;
