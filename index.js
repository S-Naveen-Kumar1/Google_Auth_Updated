/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App_';

import {name as appName} from './app.json';
import NavigationApp from './Components/Navigation';
import { firebase } from '@react-native-firebase/app';

// Add this line to initialize Firebase
firebase.initializeApp();



AppRegistry.registerComponent(appName, () => NavigationApp);
