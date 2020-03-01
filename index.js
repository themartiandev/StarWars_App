/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppNavigator from './App';
import {name as appName} from './app.json';
import React from 'react';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import AllReducers from './src/reducers';
import createSagaMiddeleware from 'redux-saga';
import rootSaga from './src/sagas';

const sagaMiddleware= createSagaMiddeleware();
let store=createStore(AllReducers,applyMiddleware(sagaMiddleware));


const App=()=>{
    return(
    <Provider store={store}>
        <AppNavigator/>
    </Provider>
    )
}
sagaMiddleware.run(rootSaga);
AppRegistry.registerComponent(appName, () => App);
