import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const NewExercise = () => {
  const dispatch = useDispatch();
  const [exerciseName, setExerciseName] = useState('');
  // const { exercises } = useSelector((state) => state.userData);

  const classes = useStyles();
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleSubmit = () => {};

  return (
    <>
      {/* {error && } */}
      <form className={classes.root} noValidate autoComplete='off'>
        <TextField
          label='Exercise'
          type='text'
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        />
        <InputLabel id='select-exercise'>Measurement Type</InputLabel>
        <Select
          labelId='select-exercise'
          id='demo-simple-select'
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={10}>kgs</MenuItem>
          <MenuItem value={20}>metrs</MenuItem>
          <MenuItem value={30}>some</MenuItem>
        </Select>

        <Button
          variant='contained'
          color='primary'
          type='submit'
          onSubmit={handleSubmit}
        >
          Create Exercise
        </Button>
        {/* <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
          Don't have an account? Sign Up
        </Link> */}
      </form>
    </>
  );
};

export default NewExercise;
