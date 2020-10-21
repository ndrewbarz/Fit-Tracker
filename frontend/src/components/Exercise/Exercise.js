import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { exercises } from '../../actions/exerciseAction';

const Exercise = () => {
  const [exs, setExs] = useState([]);

  const exer = useSelector((state) => state.exercises);
  console.log(exer);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchExercises = async () => {
      await dispatch(exercises('exercises'));
      setExs(exer);
    };
    fetchExercises();
  }, [dispatch]);
  return <div>NEW EXERCISE</div>;
};

export default Exercise;
