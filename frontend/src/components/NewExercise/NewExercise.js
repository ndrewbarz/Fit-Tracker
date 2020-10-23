import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { newExercise } from '../../actions/exerciseAction';

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
  const [name, setName] = useState('');
  const [measurementType, setMeasurementType] = useState('');

  const { exercises, id } = useSelector((state) => state.userData);
  // console.log(exercises);
  const classes = useStyles();

  const handleType = (e) => {
    setMeasurementType(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // await exercises.push(dispatch(newExercise(id, name, measurementType)));
    dispatch(newExercise(id, name, measurementType));
    console.log(exercises);
  };

  return (
    <>
      {/* {error && } */}
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <TextField
          label='Exercise'
          type='text'
          value={name}
          onChange={handleName}
        />
        <InputLabel id='select-exercise'>Measurement Type</InputLabel>
        <Select
          labelId='select-exercise'
          id='demo-simple-select'
          value={measurementType}
          onChange={handleType}
        >
          <MenuItem value='kgs'>kgs</MenuItem>
          <MenuItem value='metrs'>metrs</MenuItem>
          <MenuItem value='some'>some</MenuItem>
        </Select>

        <Button variant='contained' color='primary' type='submit'>
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
