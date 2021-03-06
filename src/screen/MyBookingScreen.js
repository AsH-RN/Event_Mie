/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
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
import CustomLoader from '../component/CustomLoader';
import HeaderComponent from '../component/HeaderComponent';
import FooterComponent from '../component/FooterComponent';

// Icon
import ic_header_home_icon from '../assets/icon/ic_header_home_icon.png';
import ic_cancellation from '../assets/icon/ic_cancellation.png';
import ic_download from '../assets/icon/ic_download.png';
import ic_check_in from '../assets/icon/ic_check_in.png';

// Image
import header_image from '../assets/image/header_image.png';

export default class MyBookingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEvent: '',
      events: [
        {
          itemName: 'All Events',
        },
      ],
      bookingDate: '',
      searchText: '',
      selectedShow: '',
      show: [
        {
          itemName: 'All',
        },
      ],
      eventDate: '',
      ticketList: [
        {
          id: 1,
          tickerNumber: '#1234567890000',
          eventName: 'Winter Wine Night Fundraiser (Food & Drink)',
          date: '06 Nov 2023',
          time: '08:00 PM - 10:30 PM',
          timeZone: '(IST)',
          ticketCost: 'Free x1',
          totalOrder: '0.00 USD',
          promocode: '0 USD',
          bookedOn: '26 May 2022 (IST)',
          paymentMethod: 'Offline',
          paymentStatus: 'Paid',
          checkedIn: 'No',
          status: 'Enabled',
          expired: 'No',
          checkout: 'N/A',
        },
        {
          id: 2,
          tickerNumber: '#1234567890000',
          eventName: 'Winter Wine Night Fundraiser (Food & Drink)',
          date: '06 Nov 2023',
          time: '08:00 PM - 10:30 PM',
          timeZone: '(IST)',
          ticketCost: 'Free x1',
          totalOrder: '0.00 USD',
          promocode: '0 USD',
          bookedOn: '26 May 2022 (IST)',
          paymentMethod: 'Offline',
          paymentStatus: 'Paid',
          checkedIn: 'No',
          status: 'Enabled',
          expired: 'No',
          checkout: 'N/A',
        },
        {
          id: 3,
          tickerNumber: '#1234567890000',
          eventName: 'Winter Wine Night Fundraiser (Food & Drink)',
          date: '06 Nov 2023',
          time: '08:00 PM - 10:30 PM',
          timeZone: '(IST)',
          ticketCost: 'Free x1',
          totalOrder: '0.00 USD',
          promocode: '0 USD',
          bookedOn: '26 May 2022 (IST)',
          paymentMethod: 'Offline',
          paymentStatus: 'Paid',
          checkedIn: 'No',
          status: 'Enabled',
          expired: 'No',
          checkout: 'N/A',
        },
      ],
      checkBookingStatus: 1,
    };
  }

  handleSelectedEvent = async value => {
    await this.setState({
      selectedEvent: value,
      isEnabled: true,
    });
  };

  handleBookingDateChange = bookingDate => {
    this.setState({bookingDate});
  };

  handleEventDateChange = eventDate => {
    this.setState({eventDate});
  };

  handleSearchChange = searchText => {
    this.setState({searchText});
  };

  handleBookingDate = async () => {
    const {bookingDate} = this.state;

    await this.setState(
      {
        setDatePickerVisibility: true,
        isDatePickerVisible: true,
        bookingDate: bookingDate,
      },
      () => {
        console.log(bookingDate);
      },
    );
  };

  handleEventDate = async () => {
    const {eventDate} = this.state;

    await this.setState(
      {
        setDatePickerVisibility1: true,
        isDatePickerVisible1: true,
        eventDate: eventDate,
      },
      () => {
        console.log(this.state.eventDate);
      },
    );
  };

  handleHideBookingDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  handleBookingDateConfirm = date => {
    this.setState({
      bookingDate: moment(date).format('YYYY-MM-DD'),
    });
    this.handleHideBookingDatePicker();
  };

  handleSelectedShow = async value => {
    await this.setState({
      selectedShow: value,
      isEnabled: true,
    });
  };

  handleEventDateConfirm = date => {
    this.setState({
      eventDate: moment(date).format('YYYY-MM-DD'),
    });
    this.handleHideEventDatePicker();
  };

  handleHideEventDatePicker = () => {
    this.setState({isDatePickerVisible1: false});
  };

  render() {
    if (this.state.checkBookingStatus === null) {
      return (
        <SafeAreaView style={styles.container}>
          <HeaderComponent
            title="My Booking"
            navAction="back"
            nav={this.props.navigation}
          />
          <ScrollView>
            <View style={styles.homeContainer}>
              <ImageBackground
                source={header_image}
                resizeMode="cover"
                style={styles.headerImageStyle}>
                <Text style={styles.titleText}>MY BOOKINGS</Text>
                <View style={styles.eventHeadlineContainer}>
                  <Image
                    source={ic_header_home_icon}
                    resizeMode="cover"
                    style={styles.IconStyle}
                  />

                  <Text style={styles.slashText}>/</Text>
                  <Text style={styles.eventText}>My Bookings</Text>
                </View>
              </ImageBackground>

              <Text style={styles.textInputText}>Events</Text>
              <View style={styles.inputContainer}>
                <RNPickerSelect
                  onValueChange={this.handleSelectedEvent}
                  items={[{label: 'All Events', value: 'All Events'}]}
                  style={pickerStyle}
                />
              </View>

              <Text style={styles.textInputText}>Booking Date</Text>
              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={this.handleBookingDate}>
                  {this.state.bookingDate === '' ? (
                    <Text style={styles.descriptionText}>Booking Date</Text>
                  ) : (
                    <Text style={styles.descriptionText}>
                      {this.state.bookingDate}
                    </Text>
                  )}

                  <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    onConfirm={this.handleBookingDateConfirm}
                    onCancel={this.handleHideBookingDatePicker}
                    data={this.state.dateFilter}
                    onDateChange={this.handleBookingDateChange}
                    place
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.textInputText}>Search Any</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Search"
                  placeholderTextColor="#000"
                  style={styles.loginFormTextInput}
                  keyboardType="default"
                  underlineColorAndroid="transparent"
                  value={this.state.searchText}
                  onChangeText={this.handleSearchChange}
                />
              </View>

              <Text style={styles.textInputText}>Events</Text>
              <View style={styles.inputContainer}>
                <RNPickerSelect
                  onValueChange={this.handleSelectedShow}
                  items={[{label: 'All Events', value: 'All Events'}]}
                  style={pickerStyle}
                />
              </View>

              <Text style={styles.textInputText}>Event Date</Text>
              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={this.handleEventDate}>
                  {this.state.eventDate === '' ? (
                    <Text style={styles.descriptionText}>Event Date</Text>
                  ) : (
                    <Text style={styles.descriptionText}>
                      {this.state.eventDate}
                    </Text>
                  )}

                  <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible1}
                    mode="date"
                    onConfirm={this.handleEventDateConfirm}
                    onCancel={this.handleHideEventDatePicker}
                    data={this.state.eventDate}
                    onDateChange={this.handleEventDateChange}
                    place
                  />
                </TouchableOpacity>
              </View>

              {this.state.ticketList.map(item => {
                return (
                  <View style={styles.bookedTicketContainer}>
                    <Text style={styles.orderIdText}>Order Id</Text>
                    <Text style={styles.orderIdText}>{item.tickerNumber}</Text>

                    <View style={styles.lineContainer}></View>

                    <Text style={styles.eventTitleText}>Event</Text>
                    <Text style={styles.eventPlaceText}>
                      Winter Wine Night Fundraiser (Food & Drink)
                    </Text>

                    <Text style={styles.eventTitleText}>Timings</Text>
                    <Text style={styles.eventTimeText}>
                      06 Nov 2023{'\n'}08:00 PM - 10:30 PM{'\n'}(IST)
                    </Text>

                    <View style={styles.lineContainer}></View>

                    <Text style={styles.eventTitleText}>Ticket</Text>
                    <Text style={styles.eventTimeText}>Free x 1</Text>

                    <View style={styles.lineContainer}></View>

                    <Text style={styles.eventTitleText}>Order Total</Text>
                    <Text style={styles.eventTimeText}>0.00 USD</Text>

                    <View style={styles.lineContainer}></View>

                    <Text style={styles.eventTitleText}>
                      Promocode Reward(-)
                    </Text>
                    <Text style={styles.eventTimeText}>0 USD</Text>

                    <View style={styles.lineContainer}></View>

                    <Text style={styles.eventTitleText}>Booked On</Text>
                    <Text style={styles.eventTimeText}>26 May 2022 (IST)</Text>

                    <View style={styles.lineContainer}></View>

                    <Text style={styles.eventTitleText}>Payment</Text>

                    <View style={styles.paymentContainer}>
                      <Text style={styles.paymentMethodText}>Offline</Text>

                      <View style={styles.paymentMethodLine}></View>
                      <Text style={styles.paymentProcessText}>Paid</Text>
                    </View>

                    <View style={styles.lineContainer}></View>

                    <Text style={styles.eventTitleText}>Checked in</Text>
                    <View style={styles.checkedInContainer}>
                      <Text style={styles.checkedInText}>No</Text>
                    </View>

                    <View style={styles.lineContainer}></View>

                    <Text style={styles.eventTitleText}>Status</Text>
                    <View style={styles.statusContainer}>
                      <Text style={styles.statusText}>Enabled</Text>
                    </View>

                    <View style={styles.lineContainer}></View>

                    <Text style={styles.eventTitleText}>Cancellation</Text>
                    <TouchableOpacity style={styles.cancellationContainer}>
                      <Image
                        source={ic_cancellation}
                        resizeMode="cover"
                        style={styles.cancelIconStyle}
                      />
                      <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>

                    <View style={styles.lineContainer}></View>

                    <Text style={styles.eventTitleText}>Expired</Text>
                    <View style={styles.expiredContainer}>
                      <Text style={styles.expiredText}>No</Text>
                    </View>

                    <View style={styles.lineContainer}></View>

                    <Text style={styles.eventTitleText}>Actions</Text>
                    <View style={styles.ticketActionContainer}>
                      <TouchableOpacity style={styles.ticketContainer}>
                        <Image
                          source={ic_download}
                          resizeMode="cover"
                          style={styles.downloadIconStyle}
                        />
                        <Text style={styles.ticketText}>Ticket</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.ticketContainer}>
                        <Image
                          source={ic_download}
                          resizeMode="cover"
                          style={styles.downloadIconStyle}
                        />
                        <Text style={styles.ticketText}>Invoice</Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      style={styles.downloadBookingQRcodeContainer}>
                      <Image
                        source={ic_download}
                        resizeMode="cover"
                        style={styles.downloadIconStyle}
                      />
                      <Text style={styles.ticketText}>
                        Download Booking QRcode
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.checkInButtonContainer}>
                      <Image
                        source={ic_check_in}
                        resizeMode="cover"
                        style={styles.downloadIconStyle}
                      />
                      <Text style={styles.ticketText}>Check in</Text>
                    </TouchableOpacity>

                    <View style={styles.lineContainer}></View>

                    <Text style={styles.eventTitleText}>
                      Checkout Countdown
                    </Text>
                    <View style={styles.checkoutContainer}>
                      <Text style={styles.expiredText}>N/A</Text>
                    </View>
                  </View>
                );
              })}
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: hp(2),
                }}>
                <Text>No Booking</Text>
              </View>
            </View>
          </ScrollView>
          <FooterComponent nav={this.props.navigation} />
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <HeaderComponent
            title="My Booking"
            navAction="back"
            nav={this.props.navigation}
          />
          <ScrollView>
            <View style={styles.homeContainer}>
              <ImageBackground
                source={header_image}
                resizeMode="cover"
                style={styles.headerImageStyle}>
                <Text style={styles.titleText}>MY BOOKINGS</Text>
                <View style={styles.eventHeadlineContainer}>
                  <Image
                    source={ic_header_home_icon}
                    resizeMode="cover"
                    style={styles.IconStyle}
                  />

                  <Text style={styles.slashText}>/</Text>
                  <Text style={styles.eventText}>My Bookings</Text>
                </View>
              </ImageBackground>

              <Text style={styles.textInputText}>Events</Text>
              <View style={styles.inputContainer}>
                <RNPickerSelect
                  onValueChange={this.handleSelectedEvent}
                  items={[{label: 'All Events', value: 'All Events'}]}
                  style={pickerStyle}
                />
              </View>

              <Text style={styles.textInputText}>Booking Date</Text>
              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={this.handleBookingDate}>
                  {this.state.bookingDate === '' ? (
                    <Text style={styles.descriptionText}>Booking Date</Text>
                  ) : (
                    <Text style={styles.descriptionText}>
                      {this.state.bookingDate}
                    </Text>
                  )}

                  <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    onConfirm={this.handleBookingDateConfirm}
                    onCancel={this.handleHideBookingDatePicker}
                    data={this.state.dateFilter}
                    onDateChange={this.handleBookingDateChange}
                    place
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.textInputText}>Search Any</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Search"
                  placeholderTextColor="#000"
                  style={styles.loginFormTextInput}
                  keyboardType="default"
                  underlineColorAndroid="transparent"
                  value={this.state.searchText}
                  onChangeText={this.handleSearchChange}
                />
              </View>

              <Text style={styles.textInputText}>Events</Text>
              <View style={styles.inputContainer}>
                <RNPickerSelect
                  onValueChange={this.handleSelectedShow}
                  items={[{label: 'All Events', value: 'All Events'}]}
                  style={pickerStyle}
                />
              </View>

              <Text style={styles.textInputText}>Event Date</Text>
              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={this.handleEventDate}>
                  {this.state.eventDate === '' ? (
                    <Text style={styles.descriptionText}>Event Date</Text>
                  ) : (
                    <Text style={styles.descriptionText}>
                      {this.state.eventDate}
                    </Text>
                  )}

                  <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible1}
                    mode="date"
                    onConfirm={this.handleEventDateConfirm}
                    onCancel={this.handleHideEventDatePicker}
                    data={this.state.eventDate}
                    onDateChange={this.handleEventDateChange}
                    place
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.noBookingStatus}>
                <Text>No Bookings</Text>
              </View>
            </View>
          </ScrollView>
          <FooterComponent nav={this.props.navigation} />
        </SafeAreaView>
      );
    }
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
    height: hp(4),
    width: wp(90),
    color: '#000',
    // paddingHorizontal: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: wp(4),
    borderWidth: 1,
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
  textInputText: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#5e5f5f',
    marginVertical: hp(1),
    marginTop: hp(2),
    marginHorizontal: wp(4),
  },
  inputContainer: {
    flexDirection: 'row',
    height: hp(7),
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: wp(2),
    // marginVertical: hp(1),
    marginHorizontal: wp(4),
  },
  descriptionText: {
    fontSize: wp(3.5),
    // alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: wp(2),
    marginVertical: hp(2),
  },
  bookedTicketContainer: {
    marginHorizontal: wp(2),
    marginVertical: hp(2),
    borderWidth: 1,
    borderColor: '#838383',
    borderRadius: wp(1),
    backgroundColor: '#fff',
  },
  orderIdText: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#838383',
    marginHorizontal: wp(2),
    marginVertical: hp(0.5),
  },
  lineContainer: {
    height: hp(0.2),
    width: 'auto',
    backgroundColor: '#838383',
    marginVertical: hp(0.5),
  },
  eventTitleText: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#838383',
    marginHorizontal: wp(2),
    marginVertical: hp(0.5),
  },
  eventPlaceText: {
    fontSize: wp(3.5),
    color: '#1b89ef',
    marginHorizontal: wp(2),
    marginVertical: hp(0.5),
  },
  eventTimeText: {
    fontSize: wp(3.5),
    color: '#838383',
    marginHorizontal: wp(2),
    marginVertical: hp(0.5),
  },
  paymentContainer: {
    height: hp(8),
    width: wp(16),
    backgroundColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(2),
    marginVertical: hp(0.5),
    borderRadius: wp(4),
  },
  paymentMethodText: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#fff',
    marginHorizontal: wp(2),
    marginVertical: hp(0.5),
  },
  paymentMethodLine: {
    height: hp(0.3),
    width: wp(10),
    backgroundColor: '#fff',
    marginVertical: hp(0.5),
  },
  paymentProcessText: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: 'green',
    marginHorizontal: wp(2),
    marginVertical: hp(0.5),
  },
  checkedInContainer: {
    height: hp(4),
    width: wp(10),
    backgroundColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(2),
    marginVertical: hp(0.5),
    borderRadius: wp(4),
  },
  checkedInText: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#fff',
    marginHorizontal: wp(2),
    marginVertical: hp(0.5),
  },
  statusContainer: {
    height: hp(4),
    width: wp(20),
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(2),
    marginVertical: hp(0.5),
    borderRadius: wp(4),
  },
  statusText: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#fff',
    marginHorizontal: wp(2),
    marginVertical: hp(0.5),
  },
  cancellationContainer: {
    flexDirection: 'row',
    height: hp(6),
    width: wp(25),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(2),
    marginVertical: hp(0.5),
    borderRadius: wp(4),
    backgroundColor: '#ff7273',
  },
  cancelIconStyle: {
    width: hp(2),
    aspectRatio: 1 / 1,
    marginHorizontal: wp(2),
  },
  cancelText: {
    fontSize: wp(3.5),
    color: '#fff',
  },
  expiredContainer: {
    height: hp(4),
    width: wp(10),
    backgroundColor: '#1b89ef',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(2),
    marginVertical: hp(0.5),
    borderRadius: wp(4),
  },
  expiredText: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#fff',
    marginHorizontal: wp(2),
    marginVertical: hp(0.5),
  },
  ticketActionContainer: {
    flexDirection: 'row',
    // marginHorizontal: wp(2),
    marginVertical: hp(0.5),
  },
  ticketContainer: {
    flexDirection: 'row',
    height: hp(6),
    width: wp(30),
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00b289',
    marginHorizontal: wp(2),
  },
  downloadIconStyle: {
    width: hp(2),
    aspectRatio: 1 / 1,
  },
  ticketText: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#fff',
  },
  downloadBookingQRcodeContainer: {
    flexDirection: 'row',
    height: hp(6),
    width: 'auto',
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00b289',
    marginHorizontal: wp(2),
    marginVertical: hp(0.5),
  },
  checkInButtonContainer: {
    flexDirection: 'row',
    height: hp(6),
    width: wp(30),
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b89ef',
    marginHorizontal: wp(2),
    marginVertical: hp(0.5),
  },
  checkoutContainer: {
    height: hp(4),
    width: wp(15),
    backgroundColor: '#1b89ef',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(2),
    marginVertical: hp(0.5),
    borderRadius: wp(4),
  },
  noBookingStatus: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(2),
  },
  noBookingText: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#000',
  },
});
