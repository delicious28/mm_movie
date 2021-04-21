import * as React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Movie from './pages/movie';
import MovieDetail from './pages/movieDetail';
import Orientation from 'react-native-orientation';

const Stack = createStackNavigator();

function App() {

  if(Platform.isTV || Platform.isPad){
    Orientation.lockToLandscape();
  }
  else
  {
    Orientation.lockToPortrait();
  }

  
  let getScreenOption = title=> {
    return {
      title,
      headerShown: false,
      headerStyle: {
        height:40,
        // backgroundColor: '#f1f1f1',
      },
      headerTintColor: '#000',
      headerTitleStyle:{
        fontSize: 16
      }
    }
  };
  return (

    //https://reactnavigation.org/

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="电影" 
          component={Movie} 
          options={{headerShown: false}}
        />
        <Stack.Screen name="Details" options={({route})=> getScreenOption(route.title || "电影")} component={MovieDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
