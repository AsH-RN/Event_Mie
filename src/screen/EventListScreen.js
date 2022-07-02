/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  // FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

// Component
import HeaderComponent from '../component/HeaderComponent';
import FooterComponent from '../component/FooterComponent';

// Icon
import ic_header_home_icon from '../assets/icon/ic_header_home_icon.png';
import ic_reset from '../assets/icon/ic_reset.png';

// Image
import header_image from '../assets/image/header_image.png';
// import featured_event_image from '../assets/image/featured_event_image.jpg';

// APi Info
import {BASE_URL} from '../api/ApiInfo';

// User Preference
import {async_keys, getData} from '../api/UserPreference';

export default class EventListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      selectedCategory: '',
      category: [
        {
          itemName: 'All',
        },
        {
          itemName: 'Business & Seminars',
        },
        {
          itemName: 'Yoga & Health',
        },
        {
          itemName: 'Education & Classes',
        },
        {
          itemName: 'Sports & Fitness',
        },
        {
          itemName: 'Music & Concerts',
        },
        {
          itemName: 'Charity & Non-profit',
        },
        {
          itemName: 'Food & Drink',
        },
        {
          itemName: 'Travel & Trekking',
        },
        {
          itemName: 'Science & Tech',
        },
      ],
      dateFilter: '',
      selectedPrice: '',
      price: [
        {
          itemName: 'Any Price',
        },
        {
          itemName: 'Free',
        },
        {
          itemName: 'Paid',
        },
      ],
      selectedCountry: '',
      country: [
        {
          itemName: 'All',
        },
        {
          itemName: 'Japan',
        },
        {
          itemName: 'China',
        },
        {
          itemName: 'Australia',
        },
        {
          itemName: 'United Kingdom',
        },
        {
          itemName: 'Canada',
        },
      ],
      eventData: [],
      featureEventList: [],
    };

    // fetching navigation props
    this.searchData = this.props.navigation.getParam('searchData', null);
    this.searchInfo = this.props.navigation.getParam('searchInfo', null);
    // console.log(this.searchData.slug + ' ' + 'here search data');
    console.log(this.searchInfo + ' ' + 'here search info');
  }

  componentDidMount() {
    if (this.searchInfo !== null) {
      this.checkSearchData();
    } else if (this.searchData !== null) {
      this.checkSearchData1();
    } else {
      this.fetchSearchData();
    }
  }

  fetchSearchData = async () => {
    const axios = require('axios');

    try {
      await axios
        .post(BASE_URL + 'events')

        // processing response
        .then(response => {
          let newResponse = response;

          console.log(newResponse.data);

          if (newResponse) {
            const {success} = newResponse.data;

            if (success === true) {
              // console.log(newResponse.data.events.data);
              this.setState({featureEventList: newResponse.data.events.data});
            }
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  checkSearchData = async () => {
    this.setState({searchText: this.searchInfo.search});

    const axios = require('axios');

    const {
      // searchText,
      // selectedCategory,
      // dateFilter,
      // selectedPrice,
      // selectedCountry,
    } = this.state;

    // preparing params
    const params = {
      // category: this.searchData.slug || selectedCategory || '',
      search: this.searchInfo.search,
      // start_date: dateFilter,
      // end_date: dateFilter,
      // price: selectedPrice,
      // country: selectedCountry,
      // city: '',
    };

    // console.log(params.start_date);

    // console.log(params.search);

    await axios
      .post(BASE_URL + 'events', params)

      // processing response
      .then(response => {
        let newResponse = response;

        console.log(newResponse);

        if (newResponse) {
          const {success} = newResponse.data;

          if (success === true) {
            // console.log(newResponse.data.events.data);
            this.setState({featureEventList: newResponse.data.events.data});
          }
        }
      });
  };

  checkSearchData1 = async () => {
    this.setState({selectedCategory: this.searchData.slug});

    const axios = require('axios');

    const {
      // searchText,
      // selectedCategory,
      // dateFilter,
      // selectedPrice,
      // selectedCountry,
    } = this.state;

    // preparing params
    const params = {
      category: this.searchData.slug,
      // search: this.searchInfo.search || searchText,
      // start_date: dateFilter,
      // end_date: dateFilter,
      // price: selectedPrice,
      // country: selectedCountry,
      // city: '',
    };

    // console.log(params.start_date);

    // console.log(params.search);

    await axios
      .post(BASE_URL + 'events', params)

      // processing response
      .then(response => {
        let newResponse = response;

        console.log(newResponse);

        if (newResponse) {
          const {success} = newResponse.data;

          if (success === true) {
            // console.log(newResponse.data.events.data);
            this.setState({featureEventList: newResponse.data.events.data});
          }
        }
      });
  };

  filterData = async () => {
    const axios = require('axios');

    // getting token from AsyncStorage
    const token = await getData(async_keys.userId);

    const {
      searchText,
      selectedCategory,
      dateFilter,
      selectedPrice,
      selectedCountry,
    } = this.state;

    try {
      let axiosConfig = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };

      // preparing params
      const params = {
        category: selectedCategory,
        search: searchText,
        start_date: dateFilter,
        end_date: dateFilter,
        price: selectedPrice,
        country: selectedCountry,
        city: '',
      };

      // console.log(params.start_date);

      console.log(params);

      await axios
        .post(BASE_URL + 'events', params, axiosConfig)

        // processing response
        .then(response => {
          let newResponse = response;

          console.log(newResponse.data);

          if (newResponse) {
            const {success} = newResponse.data;

            if (success === true) {
              // console.log(newResponse.data.events.data);
              this.setState({featureEventList: newResponse.data.events.data});
            }
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  handleSearchChange = searchText => {
    this.setState({searchText});

    this.filterData();
  };

  handleSelectedCity = async value => {
    this.setState({
      selectedCategory: value,
    });

    this.filterData();
  };

  handleSelectedPrice = async value => {
    await this.setState({
      selectedPrice: value,
      isEnabled: true,
    });

    this.filterData();
  };

  handleSelectedCountry = async value => {
    await this.setState({
      selectedCountry: value,
      isEnabled: true,
    });

    this.filterData();
  };

  handleDateChange = dateFilter => {
    this.setState({dateFilter});
  };

  handleShowDatePicker = () => {
    this.setState({setDatePickerVisibility: true, isDatePickerVisible: true});
  };

  handleHideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
    this.filterData();
  };

  handleConfirm = date => {
    this.setState({
      dateFilter: moment(date).format('YYYY-MM-DD'),
    });
    this.handleHideDatePicker();
  };

  handleViewEvent = async () => {
    this.props.navigation.navigate('ViewEvent');
  };

  handleEvent = item => {
    const slug = item.slug;
    // console.log(slug);
    this.props.navigation.navigate('ViewEvent', {slugTitle: {slug}});
  };

  handleReset = () => {
    this.forceUpdate();
  };

  handleChangeToCategory = () => {
    this.searchData = null;
    this.forceUpdate();
  };

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    const imageUrl = 'https://devdemo.shrigenesis.com/events_app/storage/';

    return (
      <SafeAreaView style={styles.container}>
        <HeaderComponent
          title="Event"
          navAction="back"
          nav={this.props.navigation}
        />
        <ScrollView>
          <View style={styles.homeContainer}>
            <ImageBackground
              source={header_image}
              resizeMode="cover"
              style={styles.headerImageStyle}>
              <Text style={styles.titleText}>EVENTS</Text>
              <View style={styles.eventHeadlineContainer}>
                <Image
                  source={ic_header_home_icon}
                  resizeMode="cover"
                  style={styles.IconStyle}
                />

                <Text style={styles.slashText}>/</Text>
                <Text style={styles.eventText}>Events</Text>
              </View>
            </ImageBackground>

            <Text style={styles.textInputText}>Search Event</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Type Event Name/Venue/City/State"
                placeholderTextColor="#c4c3cb"
                style={styles.loginFormTextInput}
                keyboardType="default"
                underlineColorAndroid="transparent"
                value={this.state.searchText}
                onChangeText={this.handleSearchChange}
              />
            </View>

            <Text style={styles.textInputText}>Category</Text>
            <View style={styles.inputContainer}>
              {this.searchData === null ? (
                <RNPickerSelect
                  onValueChange={this.handleSelectedCity}
                  items={[
                    {label: 'All', value: 'All'},
                    {
                      label: 'Business & Seminars',
                      value: 'Business & Seminars',
                    },
                    {label: 'Yoga & Health', value: 'Yoga & Health'},
                    {
                      label: 'Education & Classes',
                      value: 'Education & Classes',
                    },
                    {label: 'Sports & Fitness', value: 'Sports & Fitness'},
                    {label: 'Music & Concerts', value: 'Music & Concerts'},
                    {
                      label: 'Charity & Non-profit',
                      value: 'Charity & Non-profit',
                    },
                    {label: 'Food & Drink', value: 'Food & Drink'},
                    {label: 'Travel & Trekking', value: 'Travel & Trekking'},
                    {label: 'Science & Tech', value: 'Science & Tech'},
                  ]}
                  style={pickerStyle}
                  useNativeAndroidPickerStyle={false}
                />
              ) : (
                <Text onPress={this.handleChangeToCategory}>
                  {this.state.selectedCategory}
                </Text>
              )}
            </View>

            <Text style={styles.textInputText}>Date</Text>
            <View style={styles.inputContainer}>
              <TouchableOpacity onPress={this.handleShowDatePicker}>
                {this.state.dateFilter === '' ? (
                  <Text style={styles.descriptionText}>Date Filter</Text>
                ) : (
                  <Text style={styles.descriptionText}>
                    {this.state.dateFilter}
                  </Text>
                )}

                <DateTimePickerModal
                  isVisible={this.state.isDatePickerVisible}
                  mode="date"
                  onConfirm={this.handleConfirm}
                  onCancel={this.handleHideDatePicker}
                  data={this.state.dateFilter}
                  onDateChange={this.handleDateChange}
                  place
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.textInputText}>Price</Text>
            <View style={styles.inputContainer}>
              <RNPickerSelect
                onValueChange={this.handleSelectedPrice}
                items={[
                  {label: 'All', value: 'All'},
                  {label: 'Paid', value: 'Paid'},
                  {label: 'Free', value: 'Free'},
                ]}
                style={pickerStyle}
                useNativeAndroidPickerStyle={false}
              />
            </View>

            <Text style={styles.textInputText}>Country</Text>
            <View style={styles.inputContainer}>
              <RNPickerSelect
                onValueChange={this.handleSelectedCountry}
                items={[
                  {
                    label: 'All',
                    value: 'All',
                  },
                  {
                    label: 'Japan',
                    value: 'Japan',
                  },
                  {
                    label: 'China',
                    value: 'China',
                  },
                  {
                    label: 'Australia',
                    value: 'Australia',
                  },
                  {
                    label: 'United Kingdom',
                    value: 'United Kingdom',
                  },
                  {
                    label: 'Canada',
                    value: 'Canada',
                  },
                ]}
                style={pickerStyle}
                useNativeAndroidPickerStyle={false}
              />
            </View>

            <TouchableOpacity
              style={styles.resetFilterContainer}
              onPress={this.handleReset}>
              <Image
                source={ic_reset}
                resizeMode="cover"
                style={styles.resetIconStyle}
              />
              <Text style={styles.resetText}>Reset Filter</Text>
            </TouchableOpacity>

            <View style={styles.featuredEventContainer}>
              {/* <Text style={styles.featuredEventText}>Featured Event</Text> */}
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

                    <Text style={styles.eventTitleTextStyle}>{item.title}</Text>

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

              {/* <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>View All Event</Text>
              </TouchableOpacity> */}
            </View>

            {/* <FlatList
              data={this.state.eventData}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.featuredEventBox}
                    // onPress={this.handleViewEvent}
                  >
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
              }}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={this.itemSeparator}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.memberListContent}
            /> */}
          </View>
        </ScrollView>

        <FooterComponent nav={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

const pickerStyle = {
  // inputIOS: {
  //   color: 'white',
  //   paddingHorizontal: 10,
  //   backgroundColor: 'red',
  //   borderRadius: 5,
  // },
  // placeholder: {
  //   color: 'white',
  // },
  inputAndroid: {
    height: hp(6),
    width: wp(90),
    color: '#000',
    // paddingHorizontal: 10,
    backgroundColor: '#f1f1f1',
    // borderRadius: wp(4),
    // borderWidth: 1,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  homeContainer: {
    flex: 1,
  },
  headerImageStyle: {
    height: hp(20),
    width: 'auto',
    backgroundColor: '#00192f',
  },
  titleText: {
    position: 'absolute',
    top: hp(10),
    left: 0,
    right: 0,
    bottom: 0,
    fontSize: wp(4.5),
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  eventHeadlineContainer: {
    position: 'absolute',
    top: hp(14),
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: wp(6),
    backgroundColor: '#1b89ef',
    marginHorizontal: wp(4),
  },
  IconStyle: {
    width: hp(2),
    aspectRatio: 1 / 1,
    marginHorizontal: wp(0.8),
    marginLeft: wp(2),
  },
  slashText: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#fff',
    marginHorizontal: wp(0.8),
  },
  eventText: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#c9c9c9',
    marginHorizontal: wp(0.8),
  },
  inputContainer: {
    flexDirection: 'row',
    height: hp(7),
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: wp(2),
    // marginVertical: hp(1),
    marginHorizontal: wp(2),
  },
  loginFormTextInput: {
    fontSize: wp(3.5),
    flex: 1,
    // marginLeft: wp(4),
    backgroundColor: '#fff',
    borderRadius: wp(1),
    color: '#000',
  },
  textInputText: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#5e5f5f',
    marginVertical: hp(1),
    marginTop: hp(2),
    marginHorizontal: wp(2),
  },
  dropdownStyle: {
    fontSize: wp(3.5),
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
  descriptionText: {
    fontSize: wp(3.5),
    // alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: wp(2),
    marginVertical: hp(2),
  },
  resetFilterContainer: {
    flexDirection: 'row',
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b89ef',
    borderRadius: wp(3),
    marginHorizontal: wp(2),
    marginTop: hp(3),
  },
  resetIconStyle: {
    width: hp(2),
    aspectRatio: 1 / 1,
    marginRight: wp(2),
  },
  resetText: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#fff',
  },
  memberListContent: {
    padding: wp(2),
  },
  separator: {
    height: wp(2),
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
});
