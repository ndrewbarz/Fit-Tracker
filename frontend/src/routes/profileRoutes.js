import AccountBoxIcon from '@material-ui/icons/AccountBox';

import Dashboard from '../components/Dashboard/Dashboard';
import Exercise from '../components/Exercise/Exercise';
import NewExercise from '../components/NewExercise/NewExercise';
import Workout from '../components/Workout/Workout';

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
    name: 'Exercises',
    icon: AccountBoxIcon,
    component: Exercise,
    layout: '/profile',
  },
  {
    path: '/new-exercise',
    name: 'New Exercise',
    icon: AccountBoxIcon,
    component: NewExercise,
    layout: '/profile',
  },
  {
    path: '/workout',
    name: 'New Workout',
    icon: AccountBoxIcon,
    component: Workout,
    layout: '/profile',
  },
];
export default profileRoutes;
