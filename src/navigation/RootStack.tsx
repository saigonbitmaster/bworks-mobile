import { createStackNavigator } from '@react-navigation/stack';
import { useQuery } from '@tanstack/react-query';
import { getToken } from '../dataProvider/authProvider';
import LoginScreen from '../screens/login/LoginScreen';
import MainDrawer from './MainDrawer';

const Stack = createStackNavigator();

const RootStack = () => {
  const { data, isLoading } = useQuery({ queryKey: ['login'], initialData: null, queryFn: () => getToken() });
  if (isLoading) return null;
  return (
    <Stack.Navigator>
      {data ? (
        <>
          <Stack.Screen name="main" component={MainDrawer} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
