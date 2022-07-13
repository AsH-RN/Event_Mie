/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FlatGrid} from 'react-native-super-grid';

// Component
import CustomLoader from '../component/CustomLoader';
import HeaderComponent from '../component/HeaderComponent';
import FooterComponent from '../component/FooterComponent';

// Icon

import ic_event from '../assets/icon/ic_event.png';
import ic_search from '../assets/icon/ic_search.png';

// Image
// import featured_event_image from '../assets/image/featured_event_image.jpg';
import splash_image from '../assets/image/spalsh_image.png';
// import event_category_image from '../assets/image/event_category_image.jpg';
import banner from '../assets/image/banner.jpg';

// API Info
import {BASE_URL} from '../api/ApiInfo';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      featureEventList: [],
      eventCategoryList: [],
      upcomingEventList: [],
      topSellingEvents: [],
      exploreCitiesList: [],
      imageURL: null,
      checkFilter: null,
      searchResponse: [],
      isLoading: true,
      imageUrlPrefix: null,
    };
  }

  componentDidMount() {
    this.fetchEventData();
  }

  fetchEventData = async () => {
    const axios = require('axios');

    try {
      // calling api
      await axios
        .get(BASE_URL + 'landingPage')

        // processing response
        .then(response => {
          let newResponse = response;
          this.setState({imageURL: newResponse.data.data.image_url_prefix});

          if (newResponse) {
            const {success} = newResponse.data;

            console.log(newResponse.data);

            if (success === true) {
              this.setState({
                featureEventList: newResponse.data.data.featured_events,
                eventCategoryList: newResponse.data.data.categories,
                upcomingEventList: newResponse.data.data.upcomming_events,
                topSellingEvents: newResponse.data.data.top_selling_events,
                exploreCitiesList: newResponse.data.data.cities_events,
                imageUrlPrefix: newResponse.data.data.image_url_prefix,
                isLoading: false,
              });
            }
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  fetchFilterData = async () => {
    const {search} = this.state;

    this.props.navigation.navigate('EventList', {searchInfo: {search}});
  };

  handleSearchChanged = search => {
    this.setState({search});
  };

  handleEvent = item => {
    const {imageUrlPrefix} = this.state;

    const slug = item.slug;
    // console.log(slug);
    this.props.navigation.navigate('ViewEvent', {
      slugTitle: {slug, imageUrlPrefix},
    });
  };

  handleAllEvent = () => {
    this.props.navigation.navigate('EventList');
  };

  handleAllEvent1 = item => {
    // console.log(item.slug);
    const name = item.name;
    this.props.navigation.navigate('EventList', {searchData: {name}});
  };

  handleCity = item => {
    const city = item.city;
    // console.log(city);
    this.props.navigation.navigate('EventList', {cityData: {city}});
  };

  render() {
    const {isLoading} = this.state;

    if (isLoading) {
      return <CustomLoader />;
    }

    const imageUrl = 'https://devdemo.shrigenesis.com/events_app/storage/';

    if (this.state.checkFilter === null) {
      return (
        <SafeAreaView style={styles.container}>
          <HeaderComponent title="Home" nav={this.props.navigation} />
          <ScrollView
          // contentContainerStyle={{flex: 1}}
          >
            <View style={styles.homeContainer}>
              <View style={styles.bannerContainer}>
                <Image
                  source={banner}
                  resizeMode="cover"
                  style={styles.bannerImageStyle}
                />
              </View>
              <View style={styles.searchContainer}>
                <View style={styles.inputContainer}>
                  <Image
                    source={ic_event}
                    resizeMode="cover"
                    style={styles.eventIconStyle}
                  />
                  <TextInput
                    style={styles.loginFormTextInput}
                    placeholder="Type Event Name/Venue/City/State"
                    placeholderTextColor="#838383"
                    keyboardType="default"
                    underlineColorAndroid="transparent"
                    value={this.state.search}
                    onChangeText={this.handleSearchChanged}
                    // InputProps={{disableUnderline: true}}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.searchButtonContainer}
                onPress={this.fetchFilterData}>
                <Image
                  source={ic_search}
                  resizeMode="cover"
                  style={styles.searchIconStyle}
                />
                <Text style={styles.searchEventText}>Search Event</Text>
              </TouchableOpacity>

              <View style={styles.featuredEventContainer}>
                <Text style={styles.featuredEventText}>Featured Event</Text>
                {this.state.featureEventList.map((item, index) => {
                  const htmlTagRegex = /<[^>]*>?/gm;
                  const description = item.description
                    .replace(htmlTagRegex, '')
                    .replace(/&nbsp;/gm, '');

                  // calculating remaining days between two dates
                  const endDate = new Date(item.end_date);
                  const startDate = new Date(item.start_date);

                  // One day in milliseconds
                  const oneDay = 1000 * 60 * 60 * 24;

                  // Calculating the time difference between two dates
                  const diffInTime = endDate.getTime() - startDate.getTime();

                  const remainingDays = Math.round(diffInTime / oneDay);

                  return (
                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.featuredEventBox}
                      onPress={() => {
                        this.handleEvent(item);
                      }}>
                      <Image
                        source={{uri: imageUrl + item.thumbnail}}
                        resizeMode="cover"
                        style={styles.featuredImageStyle}
                      />

                      <View style={styles.eventDateAndPlaceContainer}>
                        <Text style={styles.featuredEventDateText}>
                          {item.start_date}
                        </Text>

                        <Text style={styles.featuredEventDateText}>
                          {item.end_date}
                        </Text>

                        <Text style={styles.featuredEventDateText}>
                          {item.city}
                        </Text>
                      </View>

                      <Text style={styles.eventTitleTextStyle}>
                        {item.title}
                      </Text>

                      <Text
                        style={styles.eventDescriptionTextStyle}
                        numberOfLines={2}>
                        {description}
                      </Text>

                      <Text style={styles.postedByTextStyle}>
                        {'@' + item.venue}
                      </Text>

                      <View style={styles.eventBidContainer}>
                        <View style={styles.eventCostContainer}>
                          <Text style={styles.constTextStyle}>
                            Free: {item.cost}
                          </Text>
                        </View>

                        <View style={styles.eventBidAmountContainer}>
                          <Text style={styles.bidTextStyle}>
                            Early Bid: {item.earlyBid}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.eventTypeContainer}>
                        <Text style={styles.eventTypeText}>
                          {item.category_name}
                        </Text>
                      </View>

                      <View style={styles.daysLeftContainer}>
                        <Text style={styles.eventDaysLeftText}>
                          {remainingDays + 'Days Left'}
                        </Text>
                      </View>

                      <View style={styles.eventTimeContainer}>
                        <Text style={styles.eventTimeText}>Upcoming</Text>
                      </View>

                      {item.tickets.map(t => {
                        if (t.title === 'Free') {
                          return (
                            <View style={styles.eventWorthContainer}>
                              <Text style={styles.eventWorthText}>Free</Text>
                            </View>
                          );
                        }
                      })}

                      {item.repetitive_type === 1 ? (
                        <View style={styles.eventRoutineContainer}>
                          <Text style={styles.eventRoutineText}>Daily</Text>
                        </View>
                      ) : item.repetitive_type === 2 ? (
                        <View style={styles.eventRoutineContainer}>
                          <Text style={styles.eventRoutineText}>Weekly</Text>
                        </View>
                      ) : item.repetitive_type === 3 ? (
                        <View style={styles.eventRoutineContainer}>
                          <Text style={styles.eventRoutineText}>Monthly</Text>
                        </View>
                      ) : item.repetitive_type === null ? null : null}
                    </TouchableOpacity>
                  );
                })}

                <TouchableOpacity
                  style={styles.button}
                  onPress={this.handleAllEvent}>
                  <Text style={styles.buttonText}>View All Event</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.featuredEventText}>Event Category</Text>
              <ImageBackground
                source={splash_image}
                style={styles.eventCategoryContainer}>
                <FlatGrid
                  itemDimension={134}
                  data={this.state.eventCategoryList}
                  // style={styles.gridView}
                  spacing={2}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.categoryContainer}
                      onPress={() => this.handleAllEvent1(item)}>
                      <ImageBackground
                        source={{uri: imageUrl + item.thumb}}
                        resizeMode="cover"
                        style={styles.categoryImageStyle}>
                        <Text style={styles.categoryTitleText}>
                          {item.name}
                        </Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  )}
                />
              </ImageBackground>

              <View style={styles.featuredEventContainer}>
                <Text style={styles.featuredEventText}>Upcoming Event</Text>
                {this.state.upcomingEventList.map(item => {
                  const htmlTagRegex = /<[^>]*>?/gm;
                  const description = item.description
                    .replace(htmlTagRegex, '')
                    .replace(/&nbsp;/gm, '');

                  // calculating remaining days between two dates
                  const endDate = new Date(item.end_date);
                  const startDate = new Date(item.start_date);

                  // One day in milliseconds
                  const oneDay = 1000 * 60 * 60 * 24;

                  // Calculating the time difference between two dates
                  const diffInTime = endDate.getTime() - startDate.getTime();

                  const remainingDays = Math.round(diffInTime / oneDay);

                  return (
                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.featuredEventBox}
                      onPress={() => {
                        this.handleEvent(item);
                      }}>
                      <Image
                        source={{uri: imageUrl + item.thumbnail}}
                        resizeMode="cover"
                        style={styles.featuredImageStyle}
                      />

                      <View style={styles.eventDateAndPlaceContainer}>
                        <Text style={styles.featuredEventDateText}>
                          {item.start_date}
                        </Text>

                        <Text style={styles.featuredEventDateText}>
                          {item.end_date}
                        </Text>

                        <Text style={styles.featuredEventDateText}>
                          {item.city}
                        </Text>
                      </View>

                      <Text style={styles.eventTitleTextStyle}>
                        {item.title}
                      </Text>

                      <Text
                        style={styles.eventDescriptionTextStyle}
                        numberOfLines={2}>
                        {description}
                      </Text>

                      <Text style={styles.postedByTextStyle}>
                        {'@' + item.venue}
                      </Text>

                      <View style={styles.eventBidContainer}>
                        <View style={styles.eventCostContainer}>
                          <Text style={styles.constTextStyle}>
                            Free: {item.cost}
                          </Text>
                        </View>

                        <View style={styles.eventBidAmountContainer}>
                          <Text style={styles.bidTextStyle}>
                            Early Bid: {item.earlyBid}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.eventTypeContainer}>
                        <Text style={styles.eventTypeText}>
                          {item.category_name}
                        </Text>
                      </View>

                      <View style={styles.daysLeftContainer}>
                        <Text style={styles.eventDaysLeftText}>
                          {remainingDays + 'Days Left'}
                        </Text>
                      </View>

                      <View style={styles.eventTimeContainer}>
                        <Text style={styles.eventTimeText}>Upcoming</Text>
                      </View>

                      {item.tickets.map(t => {
                        if (t.title === 'Free') {
                          return (
                            <View style={styles.eventWorthContainer}>
                              <Text style={styles.eventWorthText}>Free</Text>
                            </View>
                          );
                        }
                      })}

                      {item.repetitive_type === 1 ? (
                        <View style={styles.eventRoutineContainer}>
                          <Text style={styles.eventRoutineText}>Daily</Text>
                        </View>
                      ) : item.repetitive_type === 2 ? (
                        <View style={styles.eventRoutineContainer}>
                          <Text style={styles.eventRoutineText}>Weekly</Text>
                        </View>
                      ) : item.repetitive_type === 3 ? (
                        <View style={styles.eventRoutineContainer}>
                          <Text style={styles.eventRoutineText}>Monthly</Text>
                        </View>
                      ) : item.repetitive_type === null ? null : null}
                    </TouchableOpacity>
                  );
                })}

                <TouchableOpacity
                  style={styles.button}
                  onPress={this.handleAllEvent}>
                  <Text style={styles.buttonText}>View All Event</Text>
                </TouchableOpacity>
              </View>

              <ImageBackground
                source={splash_image}
                style={styles.eventCategoryContainer1}>
                <Text style={styles.featuredEventText1}>
                  Top Selling Events
                </Text>
                {this.state.topSellingEvents.map(item => {
                  const htmlTagRegex = /<[^>]*>?/gm;
                  const description = item.description
                    .replace(htmlTagRegex, '')
                    .replace(/&nbsp;/gm, '');

                  // calculating remaining days between two dates
                  const endDate = new Date(item.end_date);
                  const startDate = new Date(item.start_date);

                  // One day in milliseconds
                  const oneDay = 1000 * 60 * 60 * 24;

                  // Calculating the time difference between two dates
                  const diffInTime = endDate.getTime() - startDate.getTime();

                  const remainingDays = Math.round(diffInTime / oneDay);

                  return (
                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.featuredEventBox}
                      onPress={() => {
                        this.handleEvent(item);
                      }}>
                      <Image
                        source={{uri: imageUrl + item.thumbnail}}
                        resizeMode="cover"
                        style={styles.featuredImageStyle}
                      />

                      <View style={styles.eventDateAndPlaceContainer}>
                        <Text style={styles.featuredEventDateText}>
                          {item.start_date}
                        </Text>

                        <Text style={styles.featuredEventDateText}>
                          {item.end_date}
                        </Text>

                        <Text style={styles.featuredEventDateText}>
                          {item.city}
                        </Text>
                      </View>

                      <Text style={styles.eventTitleTextStyle2}>
                        {item.title}
                      </Text>

                      <Text
                        style={styles.eventDescriptionTextStyle}
                        numberOfLines={2}>
                        {description}
                      </Text>

                      <Text style={styles.postedByTextStyle}>
                        {'@' + item.venue}
                      </Text>

                      <View style={styles.eventBidContainer}>
                        <View style={styles.eventCostContainer}>
                          <Text style={styles.constTextStyle}>
                            Free: {item.cost}
                          </Text>
                        </View>

                        <View style={styles.eventBidAmountContainer}>
                          <Text style={styles.bidTextStyle}>
                            Early Bid: {item.earlyBid}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.eventTypeContainer}>
                        <Text style={styles.eventTypeText}>
                          {item.category_name}
                        </Text>
                      </View>

                      <View style={styles.daysLeftContainer}>
                        <Text style={styles.eventDaysLeftText}>
                          {remainingDays + 'Days Left'}
                        </Text>
                      </View>

                      <View style={styles.eventTimeContainer}>
                        <Text style={styles.eventTimeText}>Upcoming</Text>
                      </View>

                      {item.tickets.map(t => {
                        if (t.title === 'Free') {
                          return (
                            <View style={styles.eventWorthContainer}>
                              <Text style={styles.eventWorthText}>Free</Text>
                            </View>
                          );
                        }
                      })}

                      {item.repetitive_type === 1 ? (
                        <View style={styles.eventRoutineContainer}>
                          <Text style={styles.eventRoutineText}>Daily</Text>
                        </View>
                      ) : item.repetitive_type === 2 ? (
                        <View style={styles.eventRoutineContainer}>
                          <Text style={styles.eventRoutineText}>Weekly</Text>
                        </View>
                      ) : item.repetitive_type === 3 ? (
                        <View style={styles.eventRoutineContainer}>
                          <Text style={styles.eventRoutineText}>Monthly</Text>
                        </View>
                      ) : item.repetitive_type === null ? null : null}
                    </TouchableOpacity>
                  );
                })}

                <TouchableOpacity
                  style={styles.button}
                  onPress={this.handleAllEvent}>
                  <Text style={styles.buttonText}>View All Event</Text>
                </TouchableOpacity>
              </ImageBackground>

              <Text style={styles.featuredEventText}>Explore Best Cities</Text>
              <ImageBackground
                source={splash_image}
                style={styles.eventCategoryContainer}>
                <FlatGrid
                  itemDimension={134}
                  data={this.state.exploreCitiesList}
                  // style={styles.gridView}
                  spacing={2}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.categoryContainer}
                      onPress={() => this.handleCity(item)}>
                      <ImageBackground
                        source={{uri: imageUrl + item.poster}}
                        resizeMode="cover"
                        style={styles.categoryImageStyle}>
                        <Text style={styles.categoryTitleText}>
                          {item.city}
                        </Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  )}
                />
              </ImageBackground>
            </View>
          </ScrollView>

          <FooterComponent nav={this.props.navigation} />
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <HeaderComponent title="Home" nav={this.props.navigation} />
          <ScrollView
          // contentContainerStyle={{flex: 1}}
          >
            <View style={styles.homeContainer}>
              <View style={styles.bannerContainer}>
                <Image
                  source={banner}
                  resizeMode="cover"
                  style={styles.bannerImageStyle}
                />
              </View>
              <View style={styles.searchContainer}>
                <View style={styles.inputContainer}>
                  <Image
                    source={ic_event}
                    resizeMode="cover"
                    style={styles.eventIconStyle}
                  />
                  <TextInput
                    style={styles.loginFormTextInput}
                    placeholder="Type Event Name/Venue/City/State"
                    placeholderTextColor="#c4c3cb"
                    keyboardType="default"
                    underlineColorAndroid="transparent"
                    value={this.state.search}
                    onChangeText={this.handleSearchChanged}
                    // InputProps={{disableUnderline: true}}
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.searchButtonContainer}>
                <Image
                  source={ic_search}
                  resizeMode="cover"
                  style={styles.searchIconStyle}
                />
                <Text style={styles.searchEventText}>Search Event</Text>
              </TouchableOpacity>

              <View style={styles.featuredEventContainer}>
                <Text style={styles.featuredEventText}>Searched</Text>
                {this.state.searchResponse.map((item, index) => {
                  const htmlTagRegex = /<[^>]*>?/gm;
                  const description = item.description
                    .replace(htmlTagRegex, '')
                    .replace(/&nbsp;/gm, '');
                  return (
                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.featuredEventBox}
                      onPress={this.handleEvent}>
                      <Image
                        source={{uri: imageUrl + item.thumbnail}}
                        resizeMode="cover"
                        style={styles.featuredImageStyle}
                      />

                      <View style={styles.eventDateAndPlaceContainer}>
                        <Text style={styles.featuredEventDateText}>
                          {item.start_date}
                        </Text>

                        <Text style={styles.featuredEventDateText}>
                          {item.end_date}
                        </Text>

                        <Text style={styles.featuredEventDateText}>
                          {item.city}
                        </Text>
                      </View>

                      <Text style={styles.eventTitleTextStyle}>
                        {item.title}
                      </Text>

                      <Text
                        style={styles.eventDescriptionTextStyle}
                        numberOfLines={2}>
                        {description}
                      </Text>

                      <Text style={styles.postedByTextStyle}>
                        {'@' + item.venue}
                      </Text>

                      <View style={styles.eventBidContainer}>
                        <View style={styles.eventCostContainer}>
                          <Text style={styles.constTextStyle}>
                            Free: {item.cost}
                          </Text>
                        </View>

                        <View style={styles.eventBidAmountContainer}>
                          <Text style={styles.bidTextStyle}>
                            Early Bid: {item.earlyBid}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.eventTypeContainer}>
                        <Text style={styles.eventTypeText}>
                          {item.category_name}
                        </Text>
                      </View>

                      <View style={styles.daysLeftContainer}>
                        <Text style={styles.eventDaysLeftText}>
                          {item.daysLeft}
                        </Text>
                      </View>

                      <View style={styles.eventTimeContainer}>
                        <Text style={styles.eventTimeText}>
                          {item.eventTime}
                        </Text>
                      </View>

                      <View style={styles.eventWorthContainer}>
                        <Text style={styles.eventWorthText}>
                          {item.eventWorth}
                        </Text>
                      </View>

                      <View style={styles.eventRoutineContainer}>
                        <Text style={styles.eventRoutineText}>
                          {item.eventRoutine}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          <FooterComponent nav={this.props.navigation} />
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  homeContainer: {
    flex: 1,
  },
  bannerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(2),
    marginHorizontal: wp(2),
  },
  bannerImageStyle: {
    height: hp(18),
    aspectRatio: 683 / 284,
  },
  searchContainer: {
    height: hp(8),
    borderWidth: 4,
    borderColor: '#00192f',
    borderRadius: wp(4),
    marginVertical: hp(2),
    marginHorizontal: wp(4),
  },
  inputContainer: {
    flexDirection: 'row',
    height: hp(7),
    alignItems: 'center',
    justifyContent: 'center',
    // borderBottomWidth: 1,
    // borderColor: '#ccc',
    marginHorizontal: wp(2),
  },
  eventIconStyle: {
    width: hp(3),
    aspectRatio: 1 / 1,
  },
  loginFormTextInput: {
    fontSize: wp(3.5),
    flex: 1,
    // marginLeft: wp(4),
    // backgroundColor: '#334759',
    borderRadius: wp(1),
    color: '#000',
  },
  searchButtonContainer: {
    flexDirection: 'row',
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(3),
    backgroundColor: '#00192f',
    elevation: 30,
    // marginVertical: hp(4),
    marginHorizontal: wp(4),
  },
  searchIconStyle: {
    width: hp(2),
    aspectRatio: 1 / 1,
    marginRight: wp(2),
  },
  searchEventText: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#fff',
  },
  featuredEventContainer: {
    marginVertical: hp(2),
  },
  featuredEventText: {
    fontSize: wp(6),
    fontWeight: '700',
    color: '#00192f',
    textAlign: 'center',
    marginVertical: hp(4),
  },
  gridView: {
    // marginTop: 10,
    // flex: 1,
  },
  featuredEventText1: {
    fontSize: wp(6),
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginVertical: hp(1),
  },
  featuredEventBox: {
    height: hp(62),
    width: 'auto',
    borderWidth: 1,
    borderColor: '#ccc',
    // alignItems: 'center',
    borderRadius: wp(4),
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 10,
    // elevation: 3,
    // shadowColor: '#000',
    // shadowOffset: {width: 1, height: 1},
    // shadowOpacity: 0.4,
    // shadowRadius: 3,
    // // elevation: 5,
    marginHorizontal: wp(4),
    marginVertical: hp(2),
  },
  featuredImageStyle: {
    height: hp(30),
    width: wp(90),
    // aspectRatio: 1 / 1,
    borderRadius: wp(4),
  },
  eventDateAndPlaceContainer: {
    flexDirection: 'row',
    width: 'auto',
    // alignItems: 'center',
    justifyContent: 'space-around',
    // marginHorizontal: hp(2),
    marginVertical: hp(4),
  },
  featuredEventDateText: {
    fontSize: wp(2.5),
    color: '#1b89ef',
  },
  eventTitleTextStyle: {
    fontSize: wp(3.8),
    fontWeight: '700',
    color: '#000',
    marginHorizontal: wp(2),
  },
  eventTitleTextStyle1: {
    fontSize: wp(3.8),
    fontWeight: '700',
    color: '#fff',
    marginHorizontal: wp(2),
  },
  eventTitleTextStyle2: {
    fontSize: wp(3.8),
    fontWeight: '700',
    color: '#fff',
    marginHorizontal: wp(2),
  },
  eventDescriptionTextStyle: {
    fontSize: wp(3.2),
    color: '#838383',
    marginHorizontal: wp(2),
  },
  postedByTextStyle: {
    fontSize: wp(3.5),
    color: '#1b89ef',
    marginVertical: hp(1),
    marginHorizontal: wp(2),
  },
  eventBidContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventCostContainer: {
    height: hp(4),
    width: wp(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    marginLeft: wp(1),
  },
  constTextStyle: {
    fontSize: wp(2.3),
    color: '#838383',
  },
  eventBidAmountContainer: {
    height: hp(4),
    width: wp(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginRight: wp(1),
  },
  bidTextStyle: {
    fontSize: wp(2.3),
    color: '#838383',
  },
  eventTypeContainer: {
    height: hp(6),
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#838383',
    backgroundColor: '#838383',
    marginTop: hp(2),
    borderBottomRightRadius: wp(4),
    borderBottomLeftRadius: wp(4),
  },
  eventTypeText: {
    fontSize: wp(3.5),
    color: '#000',
  },
  daysLeftContainer: {
    width: wp(20),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: wp(73),
    top: hp(2),
    height: hp(2),
    backgroundColor: '#1b89ef',
    borderTopLeftRadius: wp(3),
  },
  eventDaysLeftText: {
    fontSize: wp(2.5),
    fontWeight: '700',
    color: '#fff',
    marginHorizontal: wp(1),
  },
  eventTimeContainer: {
    width: wp(20),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: wp(73),
    top: hp(4),
    height: hp(2),
    backgroundColor: 'rgba(255, 255, 255, .4)',
    borderBottomLeftRadius: wp(3),
  },
  eventTimeText: {
    fontSize: wp(2.5),
    fontWeight: '700',
    color: '#1b89ef',
    marginHorizontal: wp(1),
  },
  eventWorthContainer: {
    position: 'absolute',
    right: wp(81.5),
    top: hp(26.5),
    height: hp(3.5),
    width: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b89ef',
    borderTopRightRadius: wp(3),
  },
  eventWorthText: {
    fontSize: wp(2.5),
    fontWeight: '700',
    color: '#fff',
    marginHorizontal: wp(1),
  },
  eventRoutineContainer: {
    position: 'absolute',
    left: wp(67),
    top: hp(30),
    height: hp(3.5),
    width: wp(25),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b89ef',
    borderBottomLeftRadius: wp(3),
  },
  eventRoutineText: {
    fontSize: wp(2.5),
    fontWeight: '700',
    color: '#fff',
    marginHorizontal: wp(1),
  },
  button: {
    height: hp(6),
    width: wp(40),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#ec398b',
    borderRadius: wp(4),
    marginBottom: hp(2),
  },
  buttonText: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#fff',
  },
  eventCategoryContainer: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#00192f',
  },
  eventCategoryContainer1: {
    // height: hp(60),
    // width: '50%',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
    backgroundColor: '#00192f',
    // marginHorizontal: wp(4),
    marginVertical: hp(2),
  },
  categoryContainer: {
    height: hp(13),
    width: wp(40),
    borderWidth: 4,
    borderColor: '#fff',
    borderRadius: wp(2),
    marginHorizontal: wp(4),
    marginVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryImageStyle: {
    width: hp(18),
    aspectRatio: 16 / 9,
    borderRadius: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTitleText: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#fff',
  },
});
