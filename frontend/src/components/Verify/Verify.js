import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { verify } from '../../actions/userActions';

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

const Verify = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [verifyCode, setVerifyCode] = useState('');

  const emailUrl = location.search.split('=')[1];

  const dispatch = useDispatch();

  const userVerify = useSelector((state) => state.token);
  // const { loading, error, userInfo } = userVerify;

  // const redirect = location.search
  //   ? location.pathname.split('/')[2]
  //   : '/dashboard';

  // useEffect(() => {
  //   if (userInfo) {
  //     history.push(redirect);
  //   }
  // }, [history, userInfo, redirect]);

  useEffect(() => {
    setEmail(emailUrl);
  }, [email]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const success = await dispatch(verify(email, verifyCode));
    if (success) {
      history.push('/dashboard');
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
          Verify your email
        </Typography>
        <TextField
          label='Email'
          type='email'
          value={email}
          disabled
          // onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label='Verify code'
          type='password'
          value={verifyCode}
          onChange={(e) => setVerifyCode(e.target.value)}
        />

        <Button variant='contained' color='primary' type='submit'>
          Verify Email
        </Button>
        {/* <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
          Don't have an account? Sign Up
        </Link> */}
      </form>
    </>
  );
};

export default Verify;
