import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { getExercises } from '../../actions/exerciseAction';

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

const Exercise = () => {
  const dispatch = useDispatch();

  const { exercises, id } = useSelector((state) => state.userData);
  console.log(id);
  const classes = useStyles();
  useEffect(() => {
    if (id) {
      dispatch(getExercises(id));
    }
  }, []);
  return (
    <>
      {/* {error && } */}
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        // onSubmit={submitHandler}
      >
        {exercises &&
          exercises.map((exercise) => (
            <Typography variant='h6' gutterBottom>
              {exercise.name}
            </Typography>
          ))}

        {/* <TextField
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
        </Button> */}
        {/* <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
          Don't have an account? Sign Up
        </Link> */}
      </form>
    </>
  );
};

export default Exercise;
