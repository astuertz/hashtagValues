/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store from './src/app/store';
import { Provider } from 'react-redux';

const reduxApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
  );

AppRegistry.registerComponent(appName, () => reduxApp);
