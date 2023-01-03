import { View } from 'react-native';
import React, { useEffect } from 'react';
import { auth } from '../../dataProvider/authProvider';
import { useQueryClient } from '@tanstack/react-query';

const LogoutScreen = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    auth.logout().then(() => queryClient.invalidateQueries({ queryKey: ['login'] }));
  }, []);
  return <View />;
};

export default LogoutScreen;
