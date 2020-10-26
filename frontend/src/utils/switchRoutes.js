import React from 'react';
import { Switch, Route } from 'react-router-dom';
import authRoutes from '../routes/authRoutes';
import profileRoutes from '../routes/profileRoutes';
import { useSelector } from 'react-redux';

export const SwitchRoutes = () => {
  const isVerified = useSelector((state) => state.user.isVerified);
  return (
    <Switch>
      {isVerified
        ? profileRoutes.map((prop, key) => {
            if (prop.layout === '/profile') {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            }
          })
        : authRoutes.map((prop, key) => {
            if (prop.layout === '/account') {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            }
          })}
    </Switch>
  );
};
