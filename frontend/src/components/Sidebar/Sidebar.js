import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';

// Sidebar styling
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  active: {
    background: 'red',
  },
  listItemText: {
    textDecoration: 'none',
    color: '#333',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
  },
  profileIcon: {
    marginLeft: '10px',
    cursor: 'pointer',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));
// const useStyles = makeStyles(styles);

export default function Sidebar({ authRoutes, profileRoutes }) {
  const [toggle, setToggle] = useState(null);

  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Toggle
  const handleClick = (event) => {
    setToggle(event.currentTarget);
  };
  const handleClose = () => {
    setToggle(null);
    dispatch(logout());
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <Typography variant='h6' noWrap className={classes.title}>
            Permanent drawer
          </Typography>
          {isAuth ? (
            <Typography variant='h6' noWrap>
              {/* {userInfo.email} */}
              USER
              <AccountCircleIcon
                className={classes.profileIcon}
                onClick={handleClick}
              />
              <Menu
                id='simple-menu'
                anchorEl={toggle}
                keepMounted
                open={Boolean(toggle)}
              >
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </Typography>
          ) : (
            <Typography variant='h6' noWrap></Typography>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor='left'
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {!isAuth
            ? authRoutes.map((prop, key) => (
                <NavLink
                  to={prop.layout + prop.path}
                  key={key}
                  activeClassName={classes.active}
                  className={classes.listItemText}
                >
                  <ListItem button key={key}>
                    <ListItemIcon>
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary={prop.name} />
                  </ListItem>
                </NavLink>
              ))
            : profileRoutes.map((prop, key) => (
                <NavLink
                  to={prop.layout + prop.path}
                  key={key}
                  activeClassName={classes.active}
                  className={classes.listItemText}
                >
                  <ListItem button key={key}>
                    <ListItemIcon>
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary={prop.name} />
                  </ListItem>
                </NavLink>
              ))}
        </List>
        <Divider />
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
    </div>
  );
}
