import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import JobBidListScreen from '../screens/jobBids/JobBidListScreen';
import LogoutScreen from '../screens/logout/LogoutScreen';
import JobPostStack from '../screens/jobPosts/JobPostStack';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="jobPosts">
      <Drawer.Screen name="jobPosts" component={JobPostStack} options={{ title: 'Job Posts', headerShown: false }} />
      <Drawer.Screen name="jobBids" component={JobBidListScreen} options={{ title: 'Job Bids' }} />
      <Drawer.Screen name="logout" component={LogoutScreen} options={{ title: 'Logout' }} />
    </Drawer.Navigator>
  );
};

export default MainDrawer;
