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

const Workouts = () => {
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

  // Исправить
  // const handleUpdate = () => {
  //   dispatch(updateExercises(exercises));
  // };

  useEffect(() => {
    if (exercises !== undefined) {
      dispatch(getExercises(_id));
    }
  }, []);

  return (
    <>
      {/* {error && } */}
      <form className={classes.root} noValidate autoComplete='off'>
        {exercises === undefined && (
          <Typography variant='h3'>No workouts yet</Typography>
        )}
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
                id={exercise._id}
                defaultValue={exercise.measurementType}
                onChange={handleType}
              >
                <MenuItem value='kilograms'>kilograms</MenuItem>
                <MenuItem value='meters'>meters</MenuItem>
                <MenuItem value='seconds'>seconds</MenuItem>
              </Select>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => handleDelete(exercise._id)}
              >
                Delete
              </Button>
            </div>
          ))}
        <Button
          variant='contained'
          color='secondary'
          // onClick={() => handleUpdate()}
        >
          Edit workouts
        </Button>
      </form>
    </>
  );
};

export default Workouts;
