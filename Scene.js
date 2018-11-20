/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    FlatList,
    ActivityIndicator,
    Platform,
    Button,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    TouchableOpacity,
    Alert, Picker
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import openMap from 'react-native-open-maps';
import GeolocationExample from './learnGeo.js'
import Transportation from './transportation.js';

class Scene extends Component {

    constructor(props) {
        super(props);
        this.state = {data: '',
            latitude: null,
            longitude: null,
            error: null,
            transport: 'driving',
            isLoading: true};
    }



    _goToYosemite() {
        openMap({latitude: 37.865101, longitude: -119.538330});
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
    }

    handleToggleClick = () => {
        this.setState(state => ({
            isLoading: !state.isLoading
        }));
    }

    updateTransport = (way) => {
        alert(way);
        this.setState({transport: way})
    };



    render() {


        const refresh = () => {
            console.log(this.state.latitude);
            fetch('http://eat-what-api-prod.herokuapp.com/api/v0.1/decide-food?long=' + `${this.state.longitude}` + '&lat=' + `${this.state.latitude}` + '&commute=' + `${this.state.transport}`, {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.setState({
                        data: responseJson.result
                    })
                })
                .catch((error) => {
                    console.error(error);

                });
        };


        const store = () => {
            let obj = {
                transport:`${this.state.transport}`
            };
            AsyncStorage.setItem('transport', JSON.stringify(obj))
        };
        const displaySavedData = async () => {
            try {
                let transport = await AsyncStorage.getItem('transport');
                let parsed = JSON.parse(transport);
                console.log(parsed);
                alert(parsed.transport);
                AsyncStorage.clear();
            }
            catch (error) {
                alert(error);

            }

        };

        const helper = () => {
            refresh();
            store();
        };

        return (
            <View>
                <Transportation callBack={this.updateTransport}/>



                <Text style={styles.welcome}>
                    {this.state.data.name}
                </Text>
                <Text style={styles.welcome}>
                    {this.state.data.location}
                </Text>


                <Button
                    color={'#bdc3c7'}
                    onPress={helper}
                    title="WHAT TO EAT 🗺"/>

                <Button
                    color={'#bdc3c7'}
                    onPress={this._goToYosemite}
                    title="Click To Open Maps 🗺"/>

                <Button
                    color={'#bdc3c7'}
                    onPress={displaySavedData}
                    title="display data"/>


            </View>


        );
    }
}

export default Scene
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
        margin: 3,
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
