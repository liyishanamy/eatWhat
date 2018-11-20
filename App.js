/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {FlatList, Platform, StyleSheet, Text, View, AsyncStorage,TouchableOpacity, Alert} from 'react-native';
import Routes from './Routes.js'
import GeolocationExample from './learnGeo.js'


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});
type Props = {};
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
//export default class App extends Component<Props> {
class App extends Component {
    state={
        transport:''
    }
    render() {



        return(
           <Routes/>


        );
    }
}

export default App
const styles = StyleSheet.create({
    container: {
        padding: 50,
        marginTop: 3,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    button: {
        borderWidth: 1,
        padding: 25,
        borderColor: 'black',
        backgroundColor: 'red'
    }
})
