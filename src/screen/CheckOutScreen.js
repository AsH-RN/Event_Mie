/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable radix */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import React, {Component} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import {Picker} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';

// Component
import HeaderComponent from '../component/HeaderComponent';
import FooterComponent from '../component/FooterComponent';
import CustomLoader from '../component/CustomLoader';
import ProcessingLoader from '../component/ProcessingLoader';
import {showToast} from '../component/CustomToast';

// API Info
import {BASE_URL, makeRequest} from '../api/ApiInfo';

// User Preference
import {async_keys, getData} from '../api/UserPreference';

export default class CheckOutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      totalPrice: 0,
      grandTotal: 0,
      grandPrice: 0,
      list: [],
      finalPrice: [],
      userId: null,
      ticketList: [],
      isLoading: true,
      showProcessingLoader: false,
    };

    // fetching navigation props
    this.eventInfo = this.props.navigation.getParam('eventInfo', null);

    // console.log(this.eventInfo.tickets);
  }

  componentDidMount() {
    setTimeout(this.initialSetup, 2000);
  }

  initialSetup = async () => {
    // getting userId from asyncStorage
    const userId = await getData(async_keys.userInfo);

    try {
      this.setState({
        isLoading: false,
        tickets: this.eventInfo.tickets,
        userId: userId,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  handleHide = () => {
    this.setState({hide: false});
  };

  handleShow = () => {
    this.setState({hide: true});
  };

  handleSelectValue = async (value, item) => {
    try {
      // setting tickets value
      const {ticketList} = this.state;
      // let ticketList = [];
      const ticketId = item.id;
      var elementPos = ticketList
        .map(function (x) {
          return x.ticketId;
        })
        .indexOf(ticketId);
      if (elementPos !== -1) {
        ticketList.splice(elementPos, 1);
        ticketList.push({ticketId, value});
      } else {
        ticketList.push({ticketId, value});
      }

      this.setState({ticketList});
    } catch (error) {
      console.log(error.message);
    }

    let y = parseInt(value);

    let newPrice = item.price * y;

    let adminTax = parseInt(item.taxes[1].rate);
    let convenienceFee = parseInt(item.taxes[0].rate);

    let priceIncludingAdminTax = (adminTax / 100) * newPrice;

    let priceIncludingConvenienceFee = (convenienceFee / 100) * newPrice;

    let priceAfterTax =
      priceIncludingAdminTax + priceIncludingConvenienceFee + newPrice;

    this.setState({totalPrice: priceAfterTax});

    // getting grand total tickets
    const id = item.id;
    const {list} = this.state;
    var elementPos = list
      .map(function (x) {
        return x.id;
      })
      .indexOf(id);
    // console.log(elementPos + ':  element position');
    if (elementPos !== -1) {
      list.splice(elementPos, 1);
      list.push({id, value});
    } else {
      list.push({id, value});
    }

    let total = 0;
    list.map(arrValue => {
      total = parseInt(total) + parseInt(arrValue.value);
      // console.log(total);

      this.setState({grandTotal: total});
    });

    // getting grand total price
    const priceId = item.id;
    const price = item.price;
    // console.log(price);
    const {finalPrice} = this.state;
    var elementPos = finalPrice
      .map(function (x) {
        return x.priceId;
      })
      .indexOf(priceId);
    // console.log(elementPos + ':  element position');
    if (elementPos !== -1) {
      finalPrice.splice(elementPos, 1);
      finalPrice.push({priceId, price});
    } else {
      finalPrice.push({priceId, price});
    }

    let priceTotal = 0;
    finalPrice.map(arrValue => {
      priceTotal = parseInt(priceTotal) + parseInt(arrValue.price);
      // console.log(priceTotal);

      this.setState({grandPrice: priceTotal});
    });
  };

  handleCheckout = async () => {
    const {tickets, userId, ticketList} = this.state;

    console.log(tickets);
    let ticketID = [];
    tickets.map(item => {
      ticketID.push(item.id);
    });

    let ticketTitle = [];
    tickets.map(item => {
      ticketTitle.push(item.title);
    });

    const {endTime, startTime, eventId, finalDate} = this.eventInfo;

    try {
      // starting processing loader
      this.setState({showProcessingLoader: true});

      // preparing params
      const params = {
        event_id: eventId,
        booking_date: finalDate,
        booking_end_date: '',
        start_time: startTime,
        end_time: endTime,
        merge_schedule: 0,
        customer_id: userId,
        phone_t: '',
        ticket_id: JSON.stringify(ticketID),
        ticket_title: JSON.stringify(ticketTitle),
        quantity: JSON.stringify(ticketList),
        is_donation: '',
        promocode: '',
        payment_method: 'offline',
        is_subscribe: 1,
        c_fields: '',
      };

      // calling api
      const response = await makeRequest(
        BASE_URL + 'book-tickets',
        params,
        true,
      );

      // processing response
      if (response) {
        const {status} = response;

        if (status === true) {
          // stopping processing loader
          this.setState({showProcessingLoader: false});

          // showing toast
          showToast('Booking confirmed but unpaid yet.');

          // navigating to my booking screen
          this.props.navigation.navigate('MyBooking');
        }
      }
      // console.log(params);
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const {isLoading} = this.state;
    const getSeatBacgroundColor = seat => {
      return seat?.status ? (seat?.is_booked ? 'red' : 'transparent') : 'grey';
    };

    const getListTicketQuantity = item => {
      let list = [];
      for (let i = 0; i <= item.quantity; i++) {
        list.push({label: JSON.stringify(i), value: i, id: item.id});
      }

      return list;
    };

    if (isLoading) {
      return <CustomLoader />;
    }

    return (
      <SafeAreaView style={styles.container}>
        <HeaderComponent
          title="Checkout"
          navAction="back"
          nav={this.props.navigation}
        />
        <ScrollView>
          <View style={styles.homeContainer}>
            <Text style={styles.checkoutText}>Checkout</Text>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Booking Info</Text>
            </View>

            <View style={styles.eventInformationContainer}>
              <Text style={styles.eventCategoryText}>Event Category</Text>
              <Text style={styles.eventCategoryTitle}>
                {this.eventInfo.title}
              </Text>

              <Text style={styles.eventCategoryText}>Venue</Text>
              <Text style={styles.eventCategoryTitle}>
                {this.eventInfo.venue}
              </Text>

              <Text style={styles.eventCategoryText}>Start - End Date</Text>
              <Text style={styles.eventCategoryTitle}>
                {this.eventInfo.startDate} {'\n'}
                {this.eventInfo.endDate}
              </Text>

              <Text style={styles.eventCategoryText}>Timings</Text>
              <Text style={styles.eventCategoryTitle}>
                {this.eventInfo.startTime} - {this.eventInfo.endTime} (IST)
              </Text>
            </View>

            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Tickets</Text>
            </View>
            {this.state.tickets.map(item => (
              <View style={styles.ticketContainer}>
                <View style={styles.lineContainer}></View>

                <View style={styles.ticketPricingContainer}>
                  <Text style={styles.freeText}>{item?.title}</Text>
                  <View style={styles.inputContainer}>
                    <RNPickerSelect
                      onValueChange={value =>
                        this.handleSelectValue(value, item)
                      }
                      items={getListTicketQuantity(item).map((list, i) => ({
                        label: list.label,
                        value: list.value,
                        key: i,
                      }))}
                      style={pickerStyle}
                    />
                  </View>

                  <Text style={styles.freeTicketText}>
                    {this.state.freeText}
                  </Text>
                  <View style={styles.lineContainer}></View>
                </View>

                {this.state.tickets?.show_sheat_chart && (
                  <ScrollView horizontal={true} style={styles.seatWrapper}>
                    <View
                      style={{
                        height: item?.seatchart?.canvas_size?.height,
                        width: item?.seatchart?.canvas_size?.width,
                        backgroundColor: 'white',
                        borderColor: 'white',
                        position: 'relative',
                      }}>
                      {item?.seatchart?.seats.map((seat, i) => (
                        <TouchableHighlight key={seat?.id}>
                          <View
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              position: 'absolute',
                              height: 24,
                              width: 24,
                              backgroundColor: getSeatBacgroundColor(seat),
                              borderWidth: 1,
                              borderColor: seat?.status
                                ? seat?.is_booked
                                  ? 'red'
                                  : 'green'
                                : 'grey',
                              borderRadius: 5,
                              marginTop: seat?.coordinates?.top - 12,
                              marginLeft: seat?.coordinates?.left - 12,
                            }}>
                            <Text
                              style={{
                                color: seat?.status
                                  ? seat?.is_booked
                                    ? 'white'
                                    : 'green'
                                  : 'white',
                                fontSize: 9,
                                fontWeight: 'bold',
                              }}>
                              {seat?.name}
                            </Text>
                          </View>
                        </TouchableHighlight>
                      ))}
                    </View>
                  </ScrollView>
                )}

                <Text style={styles.priceText}>{item?.price} </Text>
                <Text style={styles.totalPriceText}>
                  {this.state.totalPrice}{' '}
                </Text>

                {/* {list.label === 'free' ? null : (
                  <View style={styles.promocodeContainer}>
                    <TextInput
                      style={styles.loginFormTextInput}
                      placeholder="Enter Promocode"
                      placeholderTextColor="#000"
                      keyboardType="default"
                      underlineColorAndroid="transparent"
                      value={this.state.search}
                      onChangeText={this.handleSearchChanged}
                    />

                    <TouchableOpacity style={styles.applyContainer}>
                      <Text style={styles.applyText}>Apply</Text>
                    </TouchableOpacity>
                  </View>
                )} */}
              </View>
            ))}

            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Shopping Cart</Text>
            </View>

            <View style={styles.totalTicketMainContainer}>
              <View style={styles.totalTicketContainer}>
                <Text style={styles.totalTicketText}>Total tickets</Text>

                <Text style={styles.totalTicketText}>
                  {this.state.grandTotal}
                </Text>
              </View>
              <View style={styles.lineContainer}></View>
            </View>

            <View style={styles.totalTicketMainContainer}>
              <View style={styles.totalTicketContainer}>
                <Text style={styles.totalTicketText}>Total order</Text>

                <Text style={styles.totalTicketText}>
                  {this.state.grandPrice}
                </Text>
              </View>

              <View style={styles.lineContainer}></View>
            </View>

            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Payment</Text>
            </View>

            <View style={styles.checkoutContainer}>
              {this.state.userId === null ? (
                <View style={styles.checkoutContainer1}>
                  <TouchableOpacity style={styles.registerButtonContainer}>
                    <Text style={styles.registerText}>Register</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.checkoutAsGuest}>
                    <Text style={styles.registerText}>Checkout as Guest</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.checkout}
                  onPress={this.handleCheckout}>
                  <Text style={styles.registerText}>Checkout</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>

        <FooterComponent nav={this.props.navigation} />

        {this.state.showProcessingLoader && <ProcessingLoader />}
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
    width: wp(40),
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
  checkoutText: {
    fontSize: wp(6),
    color: '#1b89ef',
    textAlign: 'center',
    marginBottom: hp(6),
    marginTop: hp(1),
  },
  headerContainer: {
    height: hp(8),
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(2),
    backgroundColor: '#f9f9f9',
  },
  headerText: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#027beb',
  },
  eventInformationContainer: {
    marginHorizontal: wp(2),
    marginVertical: hp(1),
  },
  eventCategoryText: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#000',
    marginVertical: hp(0.5),
  },
  eventCategoryTitle: {
    fontSize: wp(4),
    color: '#838383',
    marginVertical: hp(0.5),
  },
  ticketContainer: {
    marginHorizontal: wp(4),
  },
  lineContainer: {
    height: hp(0.2),
    width: 'auto',
    backgroundColor: '#838383',
    marginVertical: hp(0.5),
  },
  ticketPricingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  freeText: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#000',
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
  picker: {
    width: wp(40),
    padding: 10,
    borderWidth: 1,
    borderColor: '#666',
  },
  loginFormTextInput1: {
    fontSize: wp(3.5),
    // flex: 1,
    width: wp(40),
    color: '#fff',
  },
  priceText: {
    fontSize: wp(4),
    color: '#838383',
  },
  totalPriceText: {
    fontSize: wp(4),
    color: '#838383',
    marginLeft: 'auto',
  },
  hideShowInfoContainer: {
    flexDirection: 'row',
  },
  showInfoText: {
    fontSize: wp(3.5),
    color: '#838383',
  },
  loginFormTextInput: {
    fontSize: wp(3.5),
    flex: 1,
    borderWidth: 1,
    borderColor: '#838383',
    // marginLeft: wp(4),
    // backgroundColor: '#334759',
    borderRadius: wp(1),
    color: '#000',
  },
  promocodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(1),
  },
  applyContainer: {
    height: hp(6),
    width: wp(20),
    // borderRadius: wp(4),
    borderTopRightRadius: wp(4),
    borderBottomRightRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#59cdb2',
  },
  applyText: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#fff',
  },
  totalTicketMainContainer: {
    marginHorizontal: wp(2),
  },
  totalTicketContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(2),
  },
  totalTicketText: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#000',
  },
  checkoutContainer: {
    flexDirection: 'row',
    marginHorizontal: hp(2),
    marginBottom: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutContainer1: {
    flexDirection: 'row',
    // marginHorizontal: hp(2),
    // marginBottom: hp(2),
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  registerButtonContainer: {
    height: hp(6),
    width: wp(45),
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: wp(2),
    borderBottomLeftRadius: wp(2),
    backgroundColor: '#1b89ef',
  },
  registerText: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#fff',
  },
  checkoutAsGuest: {
    height: hp(6),
    width: wp(45),
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: wp(2),
    borderBottomRightRadius: wp(2),
    backgroundColor: '#00192f',
  },
  checkout: {
    height: hp(6),
    width: wp(90),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2),
    backgroundColor: '#00192f',
  },
  seatWrapper: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
