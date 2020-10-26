import AccountBoxIcon from '@material-ui/icons/AccountBox';

import Dashboard from '../components/Dashboard/Dashboard';
import Exercises from '../components/Exercises/Exercises';
import NewExercise from '../components/NewExercise/NewExercise';
import NewWorkout from '../components/NewWorkout/NewWorkout';
import Workouts from '../components/Workouts/Workouts';
// import Workout from '../components/Workout/Workout';

const profileRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: AccountBoxIcon,
    component: Dashboard,
    layout: '/profile',
  },
  {
    path: '/exercises',
    name: 'Edit exercises',
    icon: AccountBoxIcon,
    component: Exercises,
    layout: '/profile',
  },
  {
    path: '/new-exercise',
    name: 'New exercise',
    icon: AccountBoxIcon,
    component: NewExercise,
    layout: '/profile',
  },
  {
    path: '/new-workout',
    name: 'New workout',
    icon: AccountBoxIcon,
    component: NewWorkout,
    layout: '/profile',
  },
  {
    path: '/edit-workout',
    name: 'Edit workouts',
    icon: AccountBoxIcon,
    component: Workouts,
    layout: '/profile',
  },
];
export default profileRoutes;
