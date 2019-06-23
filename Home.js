import React, {Component} from 'react'
import {
    TouchableOpacity,
    ListView,
    Text,
    View,
    StyleSheet,
    ScrollView,
    FlatList,
    Image,
    Button,
    Linking
} from 'react-native'
import { Avatar } from "react-native-elements";
import Star from 'react-native-star-view';

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
            transport:this.props.transport,
            reviews: this.props.reviews

        }
    }

  rating(rate) {
    switch (rate) {
      case 5:
        return <Star score={5} style={styles.starStyle}/>;
      case 4.5:
        return <Star score={4.5} style={styles.starStyle}/>;
      case 4:
        return <Star score={4} style={styles.starStyle}/>;
      case 3.5:
        return <Star score={3.5} style={styles.starStyle}/>;
      case 3:
        return <Star score={3} style={styles.starStyle}/>;
      case 2.5:
        return <Star score={2.5} style={styles.starStyle}/>;
      case 2:
        return <Star score={2} style={styles.starStyle}/>;
      case 1.5:
        return <Star score={1.5} style={styles.starStyle}/>;
      case 1:
        return <Star score={1} style={styles.starStyle}/>;
      case 0.5:
        return <Star score={0.5} style={styles.starStyle}/>;
      case 0:
        return <Star score={0} style={styles.starStyle}/>;
      default:
        return null;
    }
  }

    render() {
        console.log(this.state)
        return(

            <View>

                <ScrollView>


                  <FlatList
                      data={this.state.reviews}
                      renderItem={({item}) =>
                          <View>
                            <Avatar
                                size="medium"
                                rounded
                                source={{
                                  uri:
                                      'data:image/png;base64,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',
                                }}
                            />
                        {this.rating(item.rating)}
                            <Text style={{color: 'blue'}}
                                  onPress={() => Linking.openURL(item.link)}>
                              more info
                            </Text>


                        <Text>{item.text}{'\n'}{item.timeCreated}</Text>
                            <Text>----------------------------------------------------------</Text>
                      </View>

                      }
                  />
                </ScrollView>



            </View>



        )




    }
}

export default Home

