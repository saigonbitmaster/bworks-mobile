import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import JobPostListScreen from '../screens/jobPosts/JobPostListScreen';
import JobBidListScreen from '../screens/jobBids/JobBidListScreen';
import LogoutScreen from '../screens/logout/LogoutScreen';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="jobPosts">
      <Drawer.Screen name="jobPosts" component={JobPostListScreen} options={{ title: 'Job Posts' }} />
      <Drawer.Screen name="jobBids" component={JobBidListScreen} options={{ title: 'Job Bids' }} />
      <Drawer.Screen name="logout" component={LogoutScreen} options={{ title: 'Logout' }} />
    </Drawer.Navigator>
  );
};

export default MainDrawer;
