import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  Linking,
} from 'react-native';
import {createOpenLink} from 'react-native-open-maps';
import {OpenMapDirections} from 'react-native-navigation-directions';
import Star from 'react-native-star-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Actions} from 'react-native-router-flux';
import Geocode from 'react-geocode';
import SearchInput, { createFilter } from 'react-native-search-filter';

class AmyIsAPig extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      newLatitude: this.props.latitude,
      newLongitude: this.props.longitude,
      newTransport: this.props.transport,
      review: [],
      searchTerm: '',
      text:''

    };
    this.arrayholder = [];

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

  transport() {
    let transportPlan = '';
    if (this.props.transport == 'driving') {
      transportPlan = 'd';
    } else if (this.props.transport == 'walking') {
      transportPlan = 'w';
    } else if (this.props.transport == 'publicTransit') {
      transportPlan = 'r';
    }
    return transportPlan;
  }

  componentDidMount() {

    return fetch(
        'http://eat-what-api-prod.herokuapp.com/api/v0.1/nearby-restaurants?long=' +
        `${this.props.longitude}` + '&lat=' + `${this.props.latitude}` +
        '&commute=' + `${this.props.transport}`).
        then((response) => response.json()).
        then((responseJson) => {
          this.setState({
            isLoading: false,
            dataSource: responseJson.result.restaurants,
          },function() {
            this.arrayholder = responseJson.result.restaurants;
          });


        }).
        catch((error) => {
          console.error(error);
        });
  }
  sortByRate=()=>{

  }

  checkReviews = (review) => {
    console.log(review);
    this.setState({
      review: review,
    }, () => {
      Actions.home(
          {transport: this.props.transport, reviews: this.state.review});
    });
  };
  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item){
      return item.name.includes(text);
    }).map(function({name, location, rating, reviews, photos}){
      return {name, location, rating,reviews, photos};
    });
    this.setState({
      dataSource: newData,
      text: text
    });
  }

  ListViewItemSeparator = () => {
    //Item sparator view
    return (
        <View
            style={{
              height: 0.3,
              width: '90%',
              backgroundColor: '#080808',
            }}
        />
    );
  };

  
  render() {



    if (this.state.isLoading) {
      return (<View style={{flex: 1, padding: 20}}>
        <ActivityIndicator/>

      </View>);
    } else

      return (
          <View>

            <TextInput
                style={styles.textInputStyle}
                onChangeText={text => this.SearchFilterFunction(text)}
                value={this.state.text}
                underlineColorAndroid="transparent"
                placeholder="Search Here"
            />

            <ScrollView>





              <FlatList


                  data={this.state.dataSource}




                  renderItem={({item}) => {
                    return (<View key={item.name}><Text
                        style={styles.titleText}>RESTAURANT
                      NAME🍱:{item.name},{'\n'}</Text>
                      <Text>Rating:</Text>{this.rating(item.rating)}


                      <Text style={styles.titleText}>LOCATION:🏠</Text>
                      <Text>{item.location},{'\n'}</Text>
                      {item.photos.map(url => {
                        const source = {uri: url};
                        return (<Image source={source} key={url}
                                       style={{width: 128, height: 128}}/>);

                      })}

                      <Button onPress={() => {
                        this.checkReviews(item.reviews);
                      }}
                              title='check reviews'/>


                      <Text>----------------------------------------------------------</Text>

                      <Button onPress={() => {
                        Linking.openURL(
                            'http://maps.apple.com/?daddr=' +
                            `${item.location}` +
                            '&dirflg=' + `${this.transport()}` + '&t=r');
                      }} title="Let's Go!!"/>

                      <Text>----------------------------------------------------------</Text>
                    </View>);
                  }}
                  keyExtractor={({id}, index) => id}
              />

            </ScrollView>

            </View>

            );
            }
            }

            export default AmyIsAPig;
            const styles=StyleSheet.create({
            container: {
            padding: 50,
            marginTop: 3,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
          },
            titleText: {
            fontSize: 12,
            fontWeight: 'bold',
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
            backgroundColor: 'red',
          },
            starStyle: {
            width: 100,
            height: 20,
            marginBottom: 20,
          },
              searchInput:{
                padding: 10,
                borderColor: '#CCC',
                borderWidth: 1
              },
              textInputStyle: {
                height: 40,
                borderWidth: 1,
                paddingLeft: 10,
                borderColor: '#009688',
                backgroundColor: '#FFFFFF',
              }

          });