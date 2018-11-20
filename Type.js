import React, {Component} from 'react'
import {View, Text, Picker, StyleSheet} from 'react-native'
import { Actions } from 'react-native-router-flux';

class Type extends Component {
    state = {user1: '',user2:''}
    updateUser1 = (user) => {
        this.setState({ user1: user })
    };
    updateUser2=(user)=>{
        this.setState({ user2: user })
    }

    render() {
        return (
            <View>
                <Picker selectedValue = {this.state.user1} onValueChange = {this.updateUser1}>
                    <Picker.Item label = "Steve" value = "steve" />
                    <Picker.Item label = "Ellen" value = "ellen" />
                    <Picker.Item label = "Maria" value = "maria" />
                </Picker>
                <Text style = {styles.text}>{this.state.user1}</Text>
                <Picker selectedValue = {this.state.user2} onValueChange = {this.updateUser2}>
                    <Picker.Item label = "amy" value = "amy" />
                    <Picker.Item label = "bill" value = "bill" />
                    <Picker.Item label = "ammmm" value = "ammmm" />
                </Picker>
                <Text style = {styles.text}>{this.state.user2}</Text>
            </View>
        )
    }
}
export default Type

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        alignSelf: 'center',
        color: 'red'
    }
})