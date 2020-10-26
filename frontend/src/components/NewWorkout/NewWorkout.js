import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { newExercise } from '../../actions/exerciseAction';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
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
  workouts: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const NewWorkout = () => {
  // const { exercises, _id } = useSelector((state) => state.user);

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
      <div className={classes.workouts}>
        <Button variant='contained' color='primary' type='submit'>
          Add exercise
        </Button>
        {exercises &&
          exercises.map((exercise) => {
            return (
              <div className={classes.root} onSubmit={handleSubmit}>
                <>
                  <InputLabel id='select-exercise'>Exercise name</InputLabel>
                  <Select
                    labelId='select-exercise'
                    id='demo-simple-select'
                    defaultValue={exercise.name}
                    onChange={handleType}
                  >
                    {exercises &&
                      exercises.map((exercise) => {
                        return (
                          <MenuItem value={exercise.name}>
                            {exercise.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  <TextField
                    label='Repeats'
                    type='text'
                    value={name}
                    className={classes.textField}
                    onChange={handleName}
                  />
                  <TextField
                    label='Measurement'
                    type='text'
                    value={name}
                    className={classes.textField}
                    onChange={handleName}
                  />
                  <Typography variant='h6'>
                    {exercise.measurementType}
                  </Typography>
                  <Button variant='contained' color='secondary' type='submit'>
                    Delete
                  </Button>
                </>
              </div>
            );
          })}
        <Button variant='contained' color='primary' type='submit'>
          Create Workout
        </Button>
      </div>
    </>
  );
};

export default NewWorkout;
