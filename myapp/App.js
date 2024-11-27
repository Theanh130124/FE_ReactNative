import Course from './components/Course/Course';
import Lesson from './components/Course/Lesson';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import 'moment/locale/vi';


const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      
      <Stack.Screen name='Course' component={Course} />
      <Stack.Screen name='Lesson' component={Lesson} />

    </Stack.Navigator>
  );
}
const App = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>

  );
}
export default App;


