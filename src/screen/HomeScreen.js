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
import HeaderComponent from '../component/HeaderComponent';
import FooterComponent from '../component/FooterComponent';

// Icon
import ic_event from '../assets/icon/ic_event.png';
import ic_search from '../assets/icon/ic_search.png';

// Image
import featured_event_image from '../assets/image/featured_event_image.jpg';
import splash_image from '../assets/image/spalsh_image.png';
import event_category_image from '../assets/image/event_category_image.jpg';
import banner from '../assets/image/banner.jpg';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      featureEventList: [
        {
          id: 1,
          image: featured_event_image,
          date: '01 Oct 2023',
          date1: '30 Nov 2023',
          place: 'Lanzhou',
          eventTitle: 'VR assistant Workshop',
          eventDescription:
            'Prevailed mr tolerably discourage assurance estimable applauded to so. Him everything melancholy',
          postedBy: '@Roller Rink',
          cost: 'Free',
          earlyBid: '10.00 USD',
          eventType: 'Business & Seminar',
          daysLeft: '492 Days Left',
          eventTime: 'Upcoming',
          eventWorth: 'Free',
          eventRoutine: 'Repetitive Weekly',
        },
        {
          id: 2,
          image: featured_event_image,
          date: '01 Oct 2023',
          date1: '30 Nov 2023',
          place: 'Lanzhou',
          eventTitle: 'VR assistant Workshop',
          eventDescription:
            'Prevailed mr tolerably discourage assurance estimable applauded to so. Him everything melancholy',
          postedBy: '@Roller Rink',
          cost: 'Free',
          earlyBid: '10.00 USD',
          eventType: 'Business & Seminar',
          daysLeft: '492 Days Left',
          eventTime: 'Upcoming',
          eventWorth: 'Free',
          eventRoutine: 'Repetitive Weekly',
        },

        {
          id: 3,
          image: featured_event_image,
          date: '01 Oct 2023',
          date1: '30 Nov 2023',
          place: 'Lanzhou',
          eventTitle: 'VR assistant Workshop',
          eventDescription:
            'Prevailed mr tolerably discourage assurance estimable applauded to so. Him everything melancholy',
          postedBy: '@Roller Rink',
          cost: 'Free',
          earlyBid: '10.00 USD',
          eventType: 'Business & Seminar',
          daysLeft: '492 Days Left',
          eventTime: 'Upcoming',
          eventWorth: 'Free',
          eventRoutine: 'Repetitive Weekly',
        },

        {
          id: 4,
          image: featured_event_image,
          date: '01 Oct 2023',
          date1: '30 Nov 2023',
          place: 'Lanzhou',
          eventTitle: 'VR assistant Workshop',
          eventDescription:
            'Prevailed mr tolerably discourage assurance estimable applauded to so. Him everything melancholy',
          postedBy: '@Roller Rink',
          cost: 'Free',
          earlyBid: '10.00 USD',
          eventType: 'Business & Seminar',
          daysLeft: '492 Days Left',
          eventTime: 'Upcoming',
          eventWorth: 'Free',
          eventRoutine: 'Repetitive Weekly',
        },
      ],
      eventCategoryList: [
        {
          id: 1,
          image: event_category_image,
          title: 'Business & Seminars',
        },
        {
          id: 2,
          image: event_category_image,
          title: 'Business & Seminars',
        },
        {
          id: 3,
          image: event_category_image,
          title: 'Business & Seminars',
        },
        {
          id: 4,
          image: event_category_image,
          title: 'Business & Seminars',
        },
      ],
    };
  }

  handleSearchChanged = search => {
    this.setState({search});
  };

  handleEvent = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
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

              <TouchableOpacity style={styles.searchButtonContainer}>
                <Image
                  source={ic_search}
                  resizeMode="cover"
                  style={styles.searchIconStyle}
                />
                <Text style={styles.searchEventText}>Search Event</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.featuredEventContainer}>
              <Text style={styles.featuredEventText}>Featured Event</Text>
              {this.state.featureEventList.map(item => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.featuredEventBox}
                    onPress={this.handleEvent}>
                    <Image
                      source={item.image}
                      resizeMode="cover"
                      style={styles.featuredImageStyle}
                    />

                    <View style={styles.eventDateAndPlaceContainer}>
                      <Text style={styles.featuredEventDateText}>
                        {item.date}
                      </Text>

                      <Text style={styles.featuredEventDateText}>
                        {item.date1}
                      </Text>

                      <Text style={styles.featuredEventDateText}>
                        {item.place}
                      </Text>
                    </View>

                    <Text style={styles.eventTitleTextStyle}>
                      {item.eventTitle}
                    </Text>

                    <Text
                      style={styles.eventDescriptionTextStyle}
                      numberOfLines={2}>
                      {item.eventDescription}
                    </Text>

                    <Text style={styles.postedByTextStyle}>
                      {item.postedBy}
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
                      <Text style={styles.eventTypeText}>{item.eventType}</Text>
                    </View>

                    <View style={styles.daysLeftContainer}>
                      <Text style={styles.eventDaysLeftText}>
                        {item.daysLeft}
                      </Text>
                    </View>

                    <View style={styles.eventTimeContainer}>
                      <Text style={styles.eventTimeText}>{item.eventTime}</Text>
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

              <TouchableOpacity style={styles.button}>
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
                  <TouchableOpacity style={styles.categoryContainer}>
                    <ImageBackground
                      source={item.image}
                      resizeMode="cover"
                      style={styles.categoryImageStyle}>
                      <Text style={styles.categoryTitleText}>{item.title}</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                )}
              />
            </ImageBackground>

            <View style={styles.featuredEventContainer}>
              <Text style={styles.featuredEventText}>Upcoming Event</Text>
              {this.state.featureEventList.map(item => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.featuredEventBox}>
                    <Image
                      source={item.image}
                      resizeMode="cover"
                      style={styles.featuredImageStyle}
                    />

                    <View style={styles.eventDateAndPlaceContainer}>
                      <Text style={styles.featuredEventDateText}>
                        {item.date}
                      </Text>

                      <Text style={styles.featuredEventDateText}>
                        {item.date1}
                      </Text>

                      <Text style={styles.featuredEventDateText}>
                        {item.place}
                      </Text>
                    </View>

                    <Text style={styles.eventTitleTextStyle}>
                      {item.eventTitle}
                    </Text>

                    <Text
                      style={styles.eventDescriptionTextStyle}
                      numberOfLines={2}>
                      {item.eventDescription}
                    </Text>

                    <Text style={styles.postedByTextStyle}>
                      {item.postedBy}
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
                      <Text style={styles.eventTypeText}>{item.eventType}</Text>
                    </View>

                    <View style={styles.daysLeftContainer}>
                      <Text style={styles.eventDaysLeftText}>
                        {item.daysLeft}
                      </Text>
                    </View>

                    <View style={styles.eventTimeContainer}>
                      <Text style={styles.eventTimeText}>{item.eventTime}</Text>
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

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>View All Event</Text>
              </TouchableOpacity>
            </View>

            <ImageBackground
              source={splash_image}
              style={styles.eventCategoryContainer1}>
              <Text style={styles.featuredEventText1}>Top Selling Events</Text>
              {this.state.featureEventList.map(item => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.featuredEventBox}>
                    <Image
                      source={item.image}
                      resizeMode="cover"
                      style={styles.featuredImageStyle}
                    />

                    <View style={styles.eventDateAndPlaceContainer}>
                      <Text style={styles.featuredEventDateText}>
                        {item.date}
                      </Text>

                      <Text style={styles.featuredEventDateText}>
                        {item.date1}
                      </Text>

                      <Text style={styles.featuredEventDateText}>
                        {item.place}
                      </Text>
                    </View>

                    <Text style={styles.eventTitleTextStyle1}>
                      {item.eventTitle}
                    </Text>

                    <Text
                      style={styles.eventDescriptionTextStyle}
                      numberOfLines={2}>
                      {item.eventDescription}
                    </Text>

                    <Text style={styles.postedByTextStyle}>
                      {item.postedBy}
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
                      <Text style={styles.eventTypeText}>{item.eventType}</Text>
                    </View>

                    <View style={styles.daysLeftContainer}>
                      <Text style={styles.eventDaysLeftText}>
                        {item.daysLeft}
                      </Text>
                    </View>

                    <View style={styles.eventTimeContainer}>
                      <Text style={styles.eventTimeText}>{item.eventTime}</Text>
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

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>View All Event</Text>
              </TouchableOpacity>
            </ImageBackground>

            <Text style={styles.featuredEventText}>Explore Best Cities</Text>
            <ImageBackground
              source={splash_image}
              style={styles.eventCategoryContainer}>
              <FlatGrid
                itemDimension={134}
                data={this.state.eventCategoryList}
                // style={styles.gridView}
                spacing={2}
                renderItem={({item}) => (
                  <TouchableOpacity style={styles.categoryContainer}>
                    <ImageBackground
                      source={item.image}
                      resizeMode="cover"
                      style={styles.categoryImageStyle}>
                      <Text style={styles.categoryTitleText}>{item.title}</Text>
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
    height: hp(10),
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
  searchButtonContainer: {
    flexDirection: 'row',
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(3),
    backgroundColor: '#00192f',
    elevation: 30,
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
    marginVertical: hp(1),
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
  eventDescriptionTextStyle: {
    fontSize: wp(3.2),
    color: '#ccc',
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
