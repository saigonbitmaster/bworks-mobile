import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FloatCreateButton from '../../components/buttons/FloatCreateButton';
import { navigate } from '../../navigation/navigationUtils';
import JobPostCreateScreen from './JobPostCreateScreen';
import JobPostListScreen from './JobPostListScreen';

const Stack = createNativeStackNavigator();

const JobPostStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="list" component={JobPostListScreen} options={{ title: 'Job Posts', headerShown: true }} />
        <Stack.Screen name="create" component={JobPostCreateScreen} />
      </Stack.Navigator>
      <FloatCreateButton onPress={() => {
        console.log('Create');
        navigate('jobPosts', { screen: 'create' })
      }
      } />
    </>
  )
}

export default JobPostStack;