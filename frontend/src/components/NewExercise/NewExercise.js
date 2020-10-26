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
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  textField: {
    marginBottom: '20px',
  },
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

  const { exercises, _id } = useSelector((state) => state.user);
  // console.log(exercises);
  const classes = useStyles();

  const handleType = (e) => {
    setMeasurementType(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await exercises.push(dispatch(newExercise(_id, name, measurementType)));
    dispatch(newExercise(_id, name, measurementType));
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
          className={classes.textField}
          onChange={handleName}
        />
        <InputLabel id='select-exercise'>Measurement Type</InputLabel>
        <Select
          labelId='select-exercise'
          id='demo-simple-select'
          value={measurementType}
          onChange={handleType}
        >
          <MenuItem value='kilograms'>kilograms</MenuItem>
          <MenuItem value='meters'>meters</MenuItem>
          <MenuItem value='seconds'>seconds</MenuItem>
        </Select>

        <Button variant='contained' color='primary' type='submit'>
          Create Exercise
        </Button>
      </form>
    </>
  );
};

export default NewExercise;
