import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';
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
  },
  textField: {
    marginBottom: '20px',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    // marginTop: theme.spacing(2),
  },
  btnStyle: {
    width: '200px',
    backgroundColor: 'darkcyan',
  },
}));

const NewExercise = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [measurementType, setMeasurementType] = useState('');

  const { _id } = useSelector((state) => state.user);
  const classes = useStyles();

  const handleType = (e) => {
    setMeasurementType(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(newExercise(_id, name, measurementType));
  };

  return (
    <>
      <Grid container spacing={3}>
        <form
          className={classes.root}
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <Grid item xs={6}>
            <TextField
              label='Exercise'
              type='text'
              value={name}
              className={classes.formControl}
              onChange={handleName}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel id='select-exercise'>Measurement Type</InputLabel>
            <Select
              className={classes.formControl}
              labelId='select-exercise'
              id='demo-simple-select'
              value={measurementType}
              onChange={handleType}
            >
              <MenuItem value='kilograms'>kilograms</MenuItem>
              <MenuItem value='meters'>meters</MenuItem>
              <MenuItem value='seconds'>seconds</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant='contained'
              className={classes.btnStyle}
              type='submit'
            >
              Create Exercise
            </Button>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default NewExercise;
