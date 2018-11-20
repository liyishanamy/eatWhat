/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {FlatList, Platform, StyleSheet, Text, View, AsyncStorage, TouchableOpacity, Alert, Picker} from 'react-native';
import Routes from "./Routes";




class Transportation extends Component {

    constructor (props) {
        super (props);
        this.state = {
            transport: 'driving'
        }
    }

    updateTransport = (way) => {

        this.setState({transport: way});
        this.props.callBack(way);
    };
    render() {

        return(
            <View>
                <Picker selectedValue={this.state.transport} onValueChange={this.updateTransport}>
                    <Picker.Item label="driving 🚗" value="driving"/>
                    <Picker.Item label="cycling 🚴‍" value="cycling"/>
                    <Picker.Item label="walking 🚶‍" value="walking"/>
                </Picker>
            </View>


        );
    }
}

export default Transportation
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
