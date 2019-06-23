import React from 'react'
import {Router, Scene} from 'react-native-router-flux'
import Home from './Home.js'
import AmyIsAPig from './amyIsAPig.js'
import Win from './Scene.js'
import Transportation from './transportation'

const Routes = () => (
    <Router>
        <Scene key="root">
            <Scene key="win" component={Win} title="win" initial={true}/>
            <Scene key="home" component={Home} title="Home"/>
            <Scene key="about" component={AmyIsAPig} title="type"/>

        </Scene>
    </Router>
);
export default Routes