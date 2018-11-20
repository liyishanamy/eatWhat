import React, {Component} from 'react'
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native'
import { Actions } from 'react-native-router-flux';
import DropdownMenu from 'react-native-dropdown-menu';

const styles = StyleSheet.create(
    {
        container: {
            padding: 10,
            marginTop: 3,
            backgroundColor: '#d9f9b1',
            alignItems: 'center',
        },
        button: {
            borderWidth: 1,
            width: 100,
            alignItems: 'center',
            padding: 25,
            borderColor: 'black',
            backgroundColor: 'red'
        },
        text: {
            color: '#4f603c'
        }
    });

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    /*
    state = {
        food: [
            {
                id: 0,
                name: '西餐',
            },
            {
                id: 1,
                name: '中餐',
            },
            {
                id: 2,
                name: '快餐',
            },
            {
                id: 3,
                name: '奶茶',
            }
        ]
    }
    alertItemName = (item) => {
        alert(item.name)
    }*/

    render() {

        const goToAbout = () => {
            Actions.about()
        };
        var data = [["西餐", "中餐", "快餐", "奶茶", "小吃"], ["清淡", "麻辣"], ["偏贵", "便便宜"]];
        return (
            <View>
                <TouchableOpacity onPress={goToAbout}>
                    <Text style={styles.button}>GO to see amy's pic</Text>
                </TouchableOpacity>



            <DropdownMenu
                style={{flex: 1}}
                bgColor={'white'}
                tintColor={'#666666'}
                activityTintColor={'green'}
                handler={(selection, row) => this.setState({text: data[selection][row]})}
                data={data}>
                <View style={{flex: 1}}>
                    <Text>
                        {this.state.text} 是您想吃的食物
                    </Text>
                </View>
            </DropdownMenu>

        </View>

            /*
            <View>
                {
                    this.state.food.map((item,index) => (
                        <TouchableOpacity
                            key = {item.id}
                            style = {styles.container}
                            onPress = {() => this.alertItemName(item)}>
                            <Text style = {styles.text}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>*/
        )
    }
}

export default Home

