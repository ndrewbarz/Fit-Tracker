import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { verify } from '../../actions/userAction';

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

const Verify = ({ location }) => {
  const [email, setEmail] = useState('');
  const [verifyCode, setVerifyCode] = useState('');

  const emailUrl = location.search.split('=')[1];
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(emailUrl);
  }, [email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(verify(email, verifyCode));
    const token = localStorage.getItem('token');
    if (token) {
      history.push('/profile/dashboard');
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
          Verify your email
        </Typography>
        <TextField label='Email' type='email' value={email} disabled />
        <TextField
          label='Verify code'
          type='password'
          value={verifyCode}
          onChange={(e) => setVerifyCode(e.target.value)}
        />

        <Button variant='contained' color='primary' type='submit'>
          Verify Email
        </Button>
      </form>
    </>
  );
};

export default Verify;
