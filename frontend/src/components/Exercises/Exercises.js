import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Select, TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import {
  deleteExercises,
  getExercises,
  updateExercises,
} from '../../actions/exerciseAction';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      maxWidth: 'max-content',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    flexDirection: 'column',
  },
}));

const Exercises = () => {
  const dispatch = useDispatch();

  const { exercises, _id } = useSelector((state) => state.user);
  const [type, setType] = useState('');
  const [exerciseName, setExerciseName] = useState('');

  const classes = useStyles();

  const handleType = (e) => {
    setType(e.target.value);
  };
  const handleName = (e) => {
    setExerciseName(e.target.value);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteExercises(id));
  };

  const handleUpdate = () => {
    // dispatch(updateExercises(exercises));
    console.log('Updating doesnt work yet!');
  };

  useEffect(() => {
    if (exercises !== undefined) {
      dispatch(getExercises(_id));
    }
  }, []);

  return (
    <>
      <form className={classes.root} noValidate autoComplete='off'>
        {exercises &&
          exercises.map((exercise) => (
            <div key={exercise._id} className={classes.root}>
              <TextField
                id={exercise._id}
                key={exercise._id}
                label='Exercise'
                defaultValue={exercise.name}
                onChange={handleName}
              />
              <Select
                labelId='select-exercise'
                key={exercise._id + 'select'}
                id={exercise._id}
                defaultValue={exercise.measurementType}
                onChange={handleType}
              >
                <MenuItem value='kilograms'>kilograms</MenuItem>
                <MenuItem value='meters'>meters</MenuItem>
                <MenuItem value='seconds'>seconds</MenuItem>
              </Select>
              <Button
                key={exercise._id + 'btn'}
                variant='contained'
                color='secondary'
                onClick={() => handleDelete(exercise._id)}
              >
                Delete
              </Button>
            </div>
          ))}
        {exercises && exercises.length ? (
          <Button
            variant='contained'
            color='secondary'
            onClick={() => handleUpdate()}
          >
            Update exercises
          </Button>
        ) : (
          <>
            <Typography variant='h3'>No exercise to edit</Typography>
            <Link to='/profile/new-exercise'>Create new exercise</Link>
          </>
        )}
      </form>
    </>
  );
};

export default Exercises;
