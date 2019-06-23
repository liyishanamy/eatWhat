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
    Alert, Picker, Linking
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import openMap from 'react-native-open-maps';
import GeolocationExample from './learnGeo.js'
import Transportation from './transportation.js';
import {OpenMapDirections} from 'react-native-navigation-directions';
import AmyIsAPig from "./amyIsAPig";
import Icon from 'react-native-vector-icons/FontAwesome';



class Scene extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: '',
            latitude: null,
            longitude: null,
            error: null,
            transport: 'driving',
            isLoading: true
           };
    }

    getLatitudeValue(){
        return this.state.latitude
    }

    getLongitudeValue(){
        return this.state.longitude
    }



    _goToYosemite() {
        openMap({latitude: 37.865101, longitude: -119.538330});
    }

    callShowDirections = () => {
        const startPoint = {
            longitude: this.state.longitude,
            latitude: this.state.latitude
        }

        const endPoint = {
            longitude: -8.9454275,
            latitude: 38.5722429
        }

        let transportPlan = '';

        if(this.state.transport =='driving'){
            transportPlan = 'd';
        } else if(this.state.transport =='walking'){
            transportPlan = 'w';
        } else if(this.state.transport == 'publicTransit'){
            transportPlan = 'r';
        }


        OpenMapDirections(startPoint, endPoint, transportPlan).then(res => {
            console.log(res)
        });
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

    async componentDidMount() {



        this.getLongLat = navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 2000, maximumAge: 100, distanceFilter: 10 },
        );

    }

    componentWillUnmount() {

        navigator.geolocation.clearWatch(this.getLongLat);

    }







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
                transport:`${this.state.transport}`,
            };
            let obj1 = {
                isLoading: false
            };
            AsyncStorage.setItem('transport', JSON.stringify(obj));
            AsyncStorage.setItem('isLoading',JSON.stringify(obj1));
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
            //Actions.about();
        }

        const goToAvailablePlaces = () => {

            Actions.about({transport:this.state.transport, latitude:this.state.latitude,longitude:this.state.longitude});

        }

        const goToTransport = () => {
            Actions.transport()
        };


        return (
            <View>
                <Icon name="rocket" size={80} color="#bf1313" />







                {this.state.isLoading ? <Transportation callBack={this.updateTransport}/> : <TouchableOpacity onPress={goToTransport}>
                        <Text>Change Transport</Text>
                    </TouchableOpacity>
                }


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
                    onPress={()=>{ Linking.openURL('http://maps.apple.com/?daddr='+ `${this.state.data.location}` +'&dirflg=' + `${this.state.transport}` + '&t=h')}} title="Let's Go!! 🗺"/>

                <Button
                    color={'#bdc3c7'}
                    onPress={displaySavedData}
                    title="display data"/>
                <Button
                    color={'#bdc3c7'}
                    onPress={goToAvailablePlaces}
                    title="VIEW WHAT'S AVAILABLE NEARBY"/>




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
