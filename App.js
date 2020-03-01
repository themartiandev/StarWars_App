/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import Login from './src/views/Login';
import Dashboard from './src/views/Dashboard';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


// const App =()=>  {
//   return (
//     <Login/>
//   );
// };
 



const styles = StyleSheet.create({
  
});

const AppNavigator = createStackNavigator(   
    {
      Login: Login,
      Dashboard: Dashboard,
    },
    {
      initialRouteName: 'Login',
    }
);

export default createAppContainer(AppNavigator);
//export default App;
