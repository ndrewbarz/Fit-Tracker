import AccountBoxIcon from '@material-ui/icons/AccountBox';

import Dashboard from '../components/Dashboard/Dashboard';
import Exercise from '../components/Exercise/Exercise';
import Workout from '../components/Workout/Workout';

const profileRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: AccountBoxIcon,
    component: Dashboard,
    layout: '/account',
  },
  {
    path: '/exercise',
    name: 'New Exercise',
    icon: AccountBoxIcon,
    component: Exercise,
    layout: '/account',
  },
  {
    path: '/workout',
    name: 'New Workout',
    icon: AccountBoxIcon,
    component: Workout,
    layout: '/account',
  },
];
export default profileRoutes;
