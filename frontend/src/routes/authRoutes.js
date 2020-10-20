// import Dashboard from '@material-ui/icons/Dashboard';
// import Person from '@material-ui/icons/Person';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import SignUp from '../components/SignUp/SignUp';
import SignIn from '../components/SignIn/SignIn';

const authRoutes = [
  {
    path: '/register',
    name: 'Sign Up',
    icon: AccountBoxIcon,
    component: SignUp,
    layout: '/account',
  },
  {
    path: '/login',
    name: 'Sign In',
    icon: AccountBoxIcon,
    component: SignIn,
    layout: '/account',
  },
];
export default authRoutes;
