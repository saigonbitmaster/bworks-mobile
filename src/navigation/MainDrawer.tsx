import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import JobPostListScreen from '../screens/jobPosts/JobPostListScreen';
import JobBidListScreen from '../screens/jobBids/JobBidListScreen';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="jobPosts">
      <Drawer.Screen name="jobPosts" component={JobPostListScreen} options={{ title: 'Job Posts' }} />
      <Drawer.Screen name="jobBids" component={JobBidListScreen} options={{ title: 'Job Bids' }} />
    </Drawer.Navigator>
  );
};

export default MainDrawer;
