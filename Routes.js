import React from 'react'
import {Router, Scene} from 'react-native-router-flux'
import Home from './Home.js'
import Type from './Type.js'
import Win from './Scene.js'

const Routes = () => (
    <Router>
        <Scene key="root">
            <Scene key="win" component={Win} title="win" initial={true}/>
            <Scene key="home" component={Home} title="Home"/>
            <Scene key="about" component={Type} title="type"/>

        </Scene>
    </Router>
);
export default Routes