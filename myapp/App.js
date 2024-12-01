import Course from './components/Course/Course';
import Lesson from './components/Course/Lesson';
import LessonDetails from './components/Course/LessonDetails';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import 'moment/locale/vi';
import Register from './components/User/Register';


const Stack = createNativeStackNavigator();
//Screnn này là mà hình có cách ra -> nó sẽ hiển thị tên ở đầu trang và đúng tên component
const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='Course' component={Course} />
      <Stack.Screen name='Lesson' component={Lesson} />
      <Stack.Screen name='LessonDetails' component={LessonDetails} />

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


