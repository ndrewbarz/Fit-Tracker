import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textField: {
    marginBottom: '20px',
  },
  btnStyle: {
    width: '200px',
    backgroundColor: 'darkcyan',
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
  const [name, setName] = useState('');
  const [measurementType, setMeasurementType] = useState('');
  const [repeats, setRepeats] = useState('0');
  const [measurementCount, setMeasurementCount] = useState('0');

  const { exercises } = useSelector((state) => state.user);
  const classes = useStyles();
  const history = useHistory();

  const handleType = (e) => {
    setMeasurementType(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleRepeats = (e) => {
    setRepeats(e.target.value);
  };

  const handleMeasurementCount = (e) => {
    setMeasurementCount(e.target.value);
  };

  const addExerciseHandler = () => {
    history.push('/profile/new-exercise/');
  };
  return (
    <>
      <div className={classes.workouts}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Button
              className={classes.btnStyle}
              variant='contained'
              color='primary'
              type='submit'
              onClick={addExerciseHandler}
            >
              Add exercise
            </Button>
          </Grid>
          {exercises &&
            exercises.map((exercise) => {
              return (
                <div className={classes.root}>
                  <>
                    <Grid item xs={6}>
                      <InputLabel id='select-exercise'>
                        Exercise name
                      </InputLabel>
                      <Select
                        key={exercise._id}
                        className={classes.formControl}
                        labelId='select-exercise'
                        id='demo-simple-select'
                        defaultValue={exercise.name}
                        onChange={handleType}
                      >
                        {exercises &&
                          exercises.map((exercise) => {
                            return (
                              <MenuItem
                                key={exercises._id + 'item'}
                                value={exercise.name}
                              >
                                {exercise.name}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label='Repeats'
                        type='text'
                        defaultValue={repeats}
                        className={classes.textField}
                        onChange={handleRepeats}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label='Measurement'
                        type='text'
                        defaultValue={measurementCount}
                        className={classes.textField}
                        onChange={handleMeasurementCount}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='h6'>
                        {exercise.measurementType}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        key={exercise._id + exercise.name}
                        variant='contained'
                        color='secondary'
                        type='submit'
                      >
                        Delete
                      </Button>
                    </Grid>
                  </>
                </div>
              );
            })}
          <Button
            className={classes.btnStyle}
            variant='contained'
            color='primary'
            type='submit'
          >
            Create Workout
          </Button>
        </Grid>
      </div>
    </>
  );
};

export default NewWorkout;
