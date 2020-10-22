import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getStartupData } from '../../actions/userActions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      dispatch(getStartupData());
    }
    return;
  }, []);
  return (
    <div>
      Dashboard Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum
      minima dicta odio aliquid perspiciatis recusandae incidunt laborum odit,
      voluptas ex! Omnis, est! Ducimus fugiat corrupti, neque illum possimus
      nesciunt iure in, itaque nulla eaque quo! Alias quis amet optio corporis,
      sunt fugiat fugit magnam unde, esse modi a doloribus nobis illum porro
      necessitatibus nulla. Quam minima corrupti illo, odit quae recusandae in
      impedit saepe quisquam facilis rerum. Vel reprehenderit molestiae corporis
      voluptatum itaque incidunt molestias dolores eveniet ex. Sed corporis eius
      animi sequi debitis? Quidem, nobis impedit! Itaque veniam, eius placeat
      quas iste quos eum! Sit, odio veniam. Dolorum, aliquid?
    </div>
  );
};

export default Dashboard;
