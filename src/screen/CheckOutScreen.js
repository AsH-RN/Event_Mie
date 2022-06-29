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
  Alert,
} from 'react-native';
import React, {Component} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import {Picker} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import QRCode from 'react-native-qrcode-svg';

// Component
import HeaderComponent from '../component/HeaderComponent';
import FooterComponent from '../component/FooterComponent';
import CustomLoader from '../component/CustomLoader';
import ProcessingLoader from '../component/ProcessingLoader';
import {showToast} from '../component/CustomToast';

// API Info
// import {BASE_URL, makeRequest} from '../api/ApiInfo';

// User Preference
import {async_keys, getData} from '../api/UserPreference';
import {BASE_URL} from '../api/ApiInfo';

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
      promocode: '',
      individualTickerPrice: [],
      showProcessingLoader: false,
      totalTax: 0,
      showSingleTicketPrice: 0,
      seatTicketValue: [],
      quantity: [],
    };

    // fetching navigation props
    this.eventInfo = this.props.navigation.getParam('eventInfo', null);

    console.log(this.eventInfo);
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
      // this.state.tickets.map(events => {
      //   events.seatchart.seats.map(seat => {
      //     Object.assign(seat, {is_seat_selected: 'No'});
      //     console.log(seat.is_seat_selected);
      //   });
      // });
      this.getCustomField();
    } catch (error) {
      console.log(error.message);
    }
  };

  getCustomField = async () => {
    const {eventId} = this.eventInfo;

    console.log(eventId);

    // getting token from AsyncStorage
    const token = await getData(async_keys.userId);

    const axios = require('axios');

    try {
      // preparing params
      const params = {event_id: eventId};

      // creating custom header
      let axiosConfig = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };

      // calling api
      await axios
        .post(BASE_URL + 'event/get-custom-fields', params, axiosConfig)

        // processing response
        .then(response => {
          let newResponse = response.data;

          console.log(newResponse);
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

    // setting a variable specific price
    try {
      let basePrice = item.price;
      let baseQuantity = value;
      let baseUnitPrice = parseInt(basePrice) * parseInt(baseQuantity);

      // let totalTax = 0;
      // const {totalTax}=this.state;
      this.state.totalTax = 0;
      item.taxes.map(tax => {
        if (tax.rate_type === 'percent') {
          let taxPrice = (parseFloat(tax.rate) / 100) * baseUnitPrice;
          // totalTax = taxPrice;
          const totalTax = this.state.totalTax;

          this.state.totalTax = totalTax + taxPrice;
        }
      });
      // console.log(item.taxes);
      // console.log(baseQuantity + ' ' + 'BASE QTN');
      // console.log(baseUnitPrice + 'This is base price');
      // console.log(parseFloat(this.state.totalTax).toFixed(2));
      // console.log(baseUnitPrice + 'This is base price again');
      // console.log(totalTax);

      let totalTicketPrice =
        parseFloat(baseUnitPrice) + parseFloat(this.state.totalTax);
      // console.log(totalTicketPrice);

      const id = item.id;
      const {individualTickerPrice} = this.state;
      // console.log(individualTickerPrice);
      var elementPos = individualTickerPrice
        .map(function (x) {
          return x.id;
        })
        .indexOf(id);
      // console.log(elementPos + ':  element position');
      if (elementPos !== -1) {
        individualTickerPrice.splice(elementPos, 1);
        individualTickerPrice.push({id, totalTicketPrice});
      } else {
        individualTickerPrice.push({id, totalTicketPrice});
      }

      this.state.showSingleTicketPrice = 0;
      individualTickerPrice.map(p => {
        // console.log(individualTickerPrice);
        const showSingleTicketPrice = this.state.showSingleTicketPrice;

        let y = showSingleTicketPrice + p.totalTicketPrice;

        this.setState({showSingleTicketPrice: y});
      });
    } catch (error) {
      console.log(error.message);
    }

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
    try {
      const {finalPrice} = this.state;

      let basePrice = item.price;
      let baseQuantity = value;
      let baseUnitPrice = parseInt(basePrice) * parseInt(baseQuantity);

      // let totalTax = 0;
      // const {totalTax}=this.state;
      this.state.totalTax = 0;
      item.taxes.map(tax => {
        if (tax.rate_type === 'percent') {
          let taxPrice = (parseFloat(tax.rate) / 100) * baseUnitPrice;
          // totalTax = taxPrice;
          const totalTax = this.state.totalTax;

          this.state.totalTax = totalTax + taxPrice;
        }
      });
      // console.log(item.taxes);
      // console.log(baseQuantity + ' ' + 'BASE QTN');
      // console.log(baseUnitPrice + 'This is base price');
      // console.log(parseFloat(this.state.totalTax).toFixed(2));
      // console.log(baseUnitPrice + 'This is base price again');
      // console.log(totalTax);

      let totalTicketPrice =
        parseFloat(baseUnitPrice) + parseFloat(this.state.totalTax);

      // console.log(totalTicketPrice);

      var elementPos = finalPrice
        .map(function (x) {
          return x.id;
        })
        .indexOf(id);
      // console.log(elementPos + ':  element position');
      if (elementPos !== -1) {
        finalPrice.splice(elementPos, 1);
        finalPrice.push({id, totalTicketPrice});
      } else {
        finalPrice.push({id, totalTicketPrice});
      }

      let priceTotal = 0;
      finalPrice.map(arrValue => {
        priceTotal =
          parseFloat(priceTotal) + parseFloat(arrValue.totalTicketPrice);
        // console.log(priceTotal);

        this.setState({grandPrice: priceTotal});
      });

      // console.log(finalPrice);
    } catch (error) {
      console.log(error.message);
    }
  };

  handleCheckout = async () => {
    const token = await getData(async_keys.userId);

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

    console.log(endTime, startTime, eventId, finalDate);

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
        ticket_id: ticketID,
        ticket_title: ticketTitle,
        quantity: ticketList,
        is_donation: [],
        promocode: [],
        payment_method: 'offline',
        is_subscribe: 1,
        c_fields: [],
      };

      const axios = require('axios');

      // creating custom header
      let axiosConfig = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };

      // calling api
      axios
        .post(
          'https://devdemo.shrigenesis.com/events_app/api/v1/' + 'book-tickets',
          params,
          axiosConfig,
        )
        .then(response => {
          let newResponse = response;

          if (newResponse) {
            const {status, message} = newResponse.data;
            if (status === true) {
              // stopping loader
              this.setState({showProcessingLoader: false});

              // showing toast
              showToast(message);

              // navigating to my booking screen
              this.props.navigation.navigate('MyBooking');
            }
          }
        })
        .catch(ERR => {
          // stopping loader
          this.setState({showProcessingLoader: false});

          console.log(ERR);

          Alert.alert('Alert', JSON.stringify(ERR.response.data.errors.error), [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        });
    } catch (error) {
      console.log(error.message);
    }

    // this.getDataURL();
  };

  handleSeatBookingCheckout = async () => {
    const token = await getData(async_keys.userId);

    const {tickets, userId, ticketList, seatTicketValue} = this.state;
    // "seat_id_72 : [
    //   "36",
    //   "37"
    // ]
    // seat_id_73:  [
    //   "124"
    // ]
    let selectedTicketList = [];
    let selectedSeats = [];
    let existTickets = [];
    for (let index = 0; index < tickets.length; index++) {
      const ticketID = tickets[index].id;
      // ticketId
      const selectedSeatCount = seatTicketValue.filter(
        st => st.ticketId == ticketID,
      ).length;
      if (selectedSeatCount > 0) {
        selectedTicketList.push({
          ticketID: ticketID,
          value: selectedSeatCount,
        });
      }
    }
    const seatArrangement = [];
    for (let index = 0; index < selectedTicketList.length; index++) {
      const ticketId = selectedTicketList[index].ticketID;
      const selectedSeatNumbers = seatTicketValue.filter(
        st => st.ticketId == ticketId,
      );
      var seats = selectedSeatNumbers.map(s => s.seatId);
      // for (let j = 0; j < selectedSeatNumbers.length; j++) {
      //   const element = selectedSeatNumbers[j];
      //   seats.push(element.seatId);
      // }
      const cname = 'seat_id_' + ticketId;
      seatArrangement.push({
        [cname]: seats,
      });
    }
    console.log(seatArrangement);
    // let baseQuantity = seatTicketValue.filter(
    //   obj => obj.ticketId === seatTicketValue.ticketId,
    // ).length;
    console.log(seatTicketValue);

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

    // console.log(endTime, startTime, eventId, finalDate);

    try {
      // starting processing loader
      // this.setState({showProcessingLoader: true});

      // preparing params
      const allData = {
        event_id: eventId,
        booking_date: endTime,
        booking_end_date: '',
        start_time: startTime,
        end_time: endTime,
        merge_schedule: 0,
        customer_id: userId,
        phone_t: '',
        ticket_id: ticketID,
        ticket_title: ticketTitle,
        quantity: ticketList,
        is_donation: [],
        promocode: [],
        payment_method: 'offline',
        is_subscribe: 1,
        c_fields: [],
      };

      const params = {...allData, seatArrangement};
      console.log(params);

      const axios = require('axios');

      // creating custom header
      let axiosConfig = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };

      // calling api
      axios
        .post(
          'https://devdemo.shrigenesis.com/events_app/api/v1/' + 'book-tickets',
          params,
          axiosConfig,
        )
        .then(response => {
          let newResponse = response;

          if (newResponse) {
            const {status, message} = newResponse.data;
            if (status === true) {
              // stopping loader
              this.setState({showProcessingLoader: false});

              // showing toast
              showToast(message);

              // navigating to my booking screen
              this.props.navigation.navigate('MyBooking');
            }
          }
        })
        .catch(ERR => {
          // stopping loader
          this.setState({showProcessingLoader: false});

          console.log(ERR);

          Alert.alert('Alert', JSON.stringify(ERR.response.data.errors.error), [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  handleSearchChanged = promocode => {
    this.setState({promocode});
  };

  // getDataURL() {
  //   this.svg.toDataURL(this.callback);
  // }

  // callback(dataURL) {
  //   console.log(dataURL);
  // }

  handleSeatBooking = async (seat, i, item) => {
    // console.log(seat);
    // console.log(this.state.ticketList);
    try {
      const {ticketList} = this.state;
      const checkId = item.id;

      if (ticketList.length < 5) {
        // setting tickets value
        const ticketId = seat.id;
        var elementPos = ticketList
          .map(function (x) {
            return x.ticketId;
          })
          .indexOf(ticketId);
        console.log(elementPos);
        if (elementPos !== -1) {
          // if (seat.is_seat_selected === 'Yes') {
          Object.assign(seat, {is_seat_selected: 'No'});
          // } else {
          //   Object.assign(seat, {is_seat_selected: 'Yes'});
          // }
          ticketList.splice(elementPos, 1);
          // ticketList.push({ticketId, i});
          console.log(ticketList);
        } else {
          console.log('Else');
          // if (seat.is_seat_selected === 'Yes') {
          //   Object.assign(seat, {is_seat_selected: 'No'});
          // } else {
          Object.assign(seat, {is_seat_selected: 'Yes'});
          // }
          console.log(seat.is_seat_selected);
          ticketList.push({ticketId, i});
          console.log(ticketList);
        }

        this.setState({ticketList});
        // console.log(ticketList);
      } else {
        Alert.alert('Alert', 'Max Seats Limit Reached.')[
          {text: 'OK', onPress: () => console.log('OK Pressed')}
        ];
      }
    } catch (error) {
      console.log(error.message);
    }

    // setting each ticket
    try {
      const {seatTicketValue} = this.state;
      // console.log(seatTicketValue + ' ' + 'Before anything happens');
      const seatId = seat.id;
      const name = seat.name;
      const eventId = seat.event_id;
      const status = seat.status;
      const ticketId = seat.ticket_id;
      const isBooked = seat.is_booked;
      const coordinates = seat.coordinates;
      var element = seatTicketValue
        .map(function (g) {
          return g.seatId;
        })
        .indexOf(seatId);
      if (element !== -1) {
        // console.log(seatTicketValue + ' ' + 'after adding items');
        seatTicketValue.splice(element, 1);
        // console.log(seatTicketValue + ' ' + 'after removing items');
        // seatTicketValue.push({seatId, name});
        // console.log(seatTicketValue + ' ' + 'last execution');
      } else {
        // console.log(seatTicketValue + ' ' + 'before item exists');
        seatTicketValue.push({
          seatId,
          name,
          eventId,
          status,
          ticketId,
          isBooked,
          coordinates,
        });
      }
    } catch (error) {
      console.log(error.message);
    }

    // calculating price
    try {
      const ticketId = seat.ticket_id;
      let basePrice = item.price;
      let baseQuantity = this.state.seatTicketValue.filter(
        obj => obj.ticketId === ticketId,
      ).length;
      // setting quantity variable for each
      const qId = item.id;
      const {quantity} = this.state;
      // console.log(individualTickerPrice);
      var elementPos = quantity
        .map(function (x) {
          return x.qId;
        })
        .indexOf(qId);
      if (elementPos !== -1) {
        quantity.splice(elementPos, 1);
        quantity.push({qId, baseQuantity});
      } else {
        quantity.push({qId, baseQuantity});
      }
      let baseUnitPrice = parseInt(basePrice) * parseInt(baseQuantity);
      this.state.totalTax = 0;
      item.taxes.map(tax => {
        if (tax.rate_type === 'percent') {
          let taxPrice = (parseFloat(tax.rate) / 100) * baseUnitPrice;
          // totalTax = taxPrice;
          const totalTax = this.state.totalTax;

          this.state.totalTax = totalTax + taxPrice;
        }
      });

      let totalTicketPrice =
        parseFloat(baseUnitPrice) + parseFloat(this.state.totalTax);
      // console.log(totalTicketPrice);

      const id = item.id;
      const {individualTickerPrice} = this.state;
      // console.log(individualTickerPrice);
      var elementPos = individualTickerPrice
        .map(function (x) {
          return x.id;
        })
        .indexOf(id);
      // console.log(elementPos + ':  element position');
      if (elementPos !== -1) {
        individualTickerPrice.splice(elementPos, 1);
        individualTickerPrice.push({id, totalTicketPrice});
      } else {
        individualTickerPrice.push({id, totalTicketPrice});
      }
      this.state.showSingleTicketPrice = 0;
      individualTickerPrice.map(p => {
        let y = p.totalTicketPrice;
        this.setState({showSingleTicketPrice: y});
      });
    } catch (error) {
      console.log(error.message);
    }

    // getting grand total tickets
    const id = item.id;
    const ticketId = seat.ticket_id;
    const {list} = this.state;
    var elementPos = list
      .map(function (x) {
        return x.id;
      })
      .indexOf(id);
    let baseQuantity = this.state.seatTicketValue.filter(
      obj => obj.ticketId === ticketId,
    ).length;
    // console.log(elementPos + ':  element position');
    if (elementPos !== -1) {
      list.splice(elementPos, 1);
      list.push({id, baseQuantity});
    } else {
      list.push({id, baseQuantity});
    }

    let total = 0;
    list.map(arrValue => {
      total = parseInt(total) + parseInt(arrValue.baseQuantity);
      this.setState({grandTotal: total});
    });

    // getting grand total price
    try {
      const {finalPrice} = this.state;

      let basePrice = item.price;
      let baseQuantity = this.state.seatTicketValue.filter(
        obj => obj.ticketId === ticketId,
      ).length;
      let baseUnitPrice = parseInt(basePrice) * parseInt(baseQuantity);

      // let totalTax = 0;
      // const {totalTax}=this.state;
      this.state.totalTax = 0;
      item.taxes.map(tax => {
        if (tax.rate_type === 'percent') {
          let taxPrice = (parseFloat(tax.rate) / 100) * baseUnitPrice;
          // totalTax = taxPrice;
          const totalTax = this.state.totalTax;

          this.state.totalTax = totalTax + taxPrice;
        }
      });
      // console.log(item.taxes);
      // console.log(baseQuantity + ' ' + 'BASE QTN');
      // console.log(baseUnitPrice + 'This is base price');
      // console.log(parseFloat(this.state.totalTax).toFixed(2));
      // console.log(baseUnitPrice + 'This is base price again');
      // console.log(totalTax);

      let totalTicketPrice =
        parseFloat(baseUnitPrice) + parseFloat(this.state.totalTax);

      // console.log(totalTicketPrice);

      var elementPos = finalPrice
        .map(function (x) {
          return x.id;
        })
        .indexOf(id);
      // console.log(elementPos + ':  element position');
      if (elementPos !== -1) {
        finalPrice.splice(elementPos, 1);
        finalPrice.push({id, totalTicketPrice});
      } else {
        finalPrice.push({id, totalTicketPrice});
      }

      let priceTotal = 0;
      finalPrice.map(arrValue => {
        priceTotal =
          parseFloat(priceTotal) + parseFloat(arrValue.totalTicketPrice);
        // console.log(priceTotal);

        this.setState({grandPrice: priceTotal});
      });

      // console.log(finalPrice);
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const {isLoading} = this.state;
    const getSeatBacgroundColor = seat => {
      // console.log('-----------------------------------');
      // console.log(seat.is_seat_selected);
      if (
        seat.is_seat_selected !== 'undefined' &&
        seat.is_seat_selected === 'Yes'
      ) {
        return 'green';
      } else {
        return seat?.status
          ? seat?.is_booked
            ? 'red'
            : 'transparent'
          : 'grey';
      }
    };

    const getListTicketQuantity = item => {
      let list = [];
      let OTNPrice = 0;
      let maxLength = this.eventInfo.maxQuantity;
      if (maxLength > item?.quantity) {
        maxLength = item?.quantity;
      }
      for (let i = 0; i <= maxLength; i++) {
        list.push({label: JSON.stringify(i), value: i, id: item.id, OTNPrice});
      }

      return list;
    };

    if (isLoading) {
      return <CustomLoader />;
    }

    if (this.state.tickets[0].show_sheat_chart === true) {
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

                  <Text style={styles.freeText}>{item?.title}</Text>
                  <View style={styles.seatingCalculationContainer}>
                    <Text style={styles.priceText}>
                      {item?.price} {this.eventInfo.currency}
                    </Text>

                    {this.state.quantity.map(q => {
                      if (q.qId === item.id) {
                        return (
                          <Text style={styles.totalPriceText1}>
                            {'QTN: ' + q?.baseQuantity}
                          </Text>
                        );
                      }
                    })}

                    {this.state.individualTickerPrice.map(i => {
                      if (i.id === item.id) {
                        return (
                          <Text style={styles.totalPriceText1}>
                            {i.totalTicketPrice} {this.eventInfo.currency}
                          </Text>
                        );
                      }
                    })}
                  </View>

                  <View style={styles.seatingAvailabilityContainer}>
                    <View style={styles.bookedContainer}></View>
                    <Text style={styles.seatingText}>Disabled</Text>
                    <View style={styles.bookedContainer1}></View>
                    <Text style={styles.seatingText}>Reserved</Text>
                    <View style={styles.bookedContainer2}></View>
                    <Text style={styles.seatingText}>Available</Text>
                    <View style={styles.bookedContainer3}></View>
                    <Text style={styles.seatingText}>Selected</Text>
                  </View>
                  {this.state.tickets[0]?.show_sheat_chart && (
                    <ScrollView
                      // contentContainerStyle={{flex: 1}}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      style={styles.seatWrapper}>
                      <View
                        style={{
                          height: item?.seatchart?.canvas_size?.height,
                          width: item?.seatchart?.canvas_size?.width,
                          backgroundColor: '#f1f1f1',
                          borderColor: 'white',
                          position: 'relative',
                        }}>
                        {item?.seatchart?.seats.map((seat, i, index) => {
                          //let background_color = getSeatBacgroundColor(seat);
                          {
                            /* Object.assign(seat, {is_seat_selected: 'No'}); */
                          }

                          return (
                            <TouchableOpacity
                              key={seat?.id}
                              index={index}
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
                              }}
                              onPress={() =>
                                this.handleSeatBooking(seat, i, item)
                              }>
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
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </ScrollView>
                  )}

                  {item.title === 'Free' ? null : (
                    <View style={styles.promocodeContainer}>
                      <TextInput
                        style={styles.loginFormTextInput}
                        placeholder="Enter Promocode"
                        placeholderTextColor="#000"
                        keyboardType="default"
                        underlineColorAndroid="transparent"
                        value={this.state.promocode}
                        onChangeText={this.handleSearchChanged}
                      />

                      <TouchableOpacity style={styles.applyContainer}>
                        <Text style={styles.applyText}>Apply</Text>
                      </TouchableOpacity>
                    </View>
                  )}

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
                    onPress={this.handleSeatBookingCheckout}>
                    <Text style={styles.registerText}>Checkout</Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.QRCodeContainer}>
                <QRCode
                  value="BookingQUBE"
                  size={200}
                  color="#000"
                  backgroundColor="#fff"
                  getRef={c => (this.svg = c)}
                />
              </View>
            </View>
          </ScrollView>

          <FooterComponent nav={this.props.navigation} />

          {this.state.showProcessingLoader && <ProcessingLoader />}
        </SafeAreaView>
      );
    } else {
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
              {this.state.tickets.map(item => {
                console.log(item.id);
                const {individualTickerPrice} = this.state;
                var elementPos = individualTickerPrice
                  .map(function (x) {
                    return x.id;
                  })
                  .indexOf(item.id);
                console.log(elementPos + ':  element position');
                console.log(
                  individualTickerPrice.map(i => {
                    if (i.id === item.id) {
                      console.log(i.totalTicketPrice);
                    }
                  }),
                );
                return (
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
                          useNativeAndroidPickerStyle={false}
                        />
                      </View>

                      <Text style={styles.freeTicketText}>
                        {this.state.freeText}
                      </Text>
                      <View style={styles.lineContainer}></View>
                    </View>

                    <Text style={styles.priceText}>
                      {item?.price} {this.eventInfo.currency}
                    </Text>

                    {this.state.individualTickerPrice.map(i => {
                      if (i.id === item.id) {
                        return (
                          <Text style={styles.totalPriceText}>
                            {i.totalTicketPrice}
                          </Text>
                        );
                      }
                    })}

                    {item.title === 'Free' ? null : (
                      <View style={styles.promocodeContainer}>
                        <TextInput
                          style={styles.loginFormTextInput}
                          placeholder="Enter Promocode"
                          placeholderTextColor="#000"
                          keyboardType="default"
                          underlineColorAndroid="transparent"
                          value={this.state.promocode}
                          onChangeText={this.handleSearchChanged}
                        />

                        <TouchableOpacity style={styles.applyContainer}>
                          <Text style={styles.applyText}>Apply</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                );
              })}

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
                    {this.state.grandPrice} {this.eventInfo.currency}
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

              {/* <View style={styles.QRCodeContainer}>
                <QRCode
                  value="BookingQUBE"
                  size={200}
                  color="#000"
                  backgroundColor="#fff"
                  getRef={c => (this.svg = c)}
                />
              </View> */}
            </View>
          </ScrollView>

          <FooterComponent nav={this.props.navigation} />

          {this.state.showProcessingLoader && <ProcessingLoader />}
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
    height: hp(6),
    width: wp(50),
    color: '#000',
    // paddingHorizontal: 10,
    backgroundColor: '#f1f1f1',
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
  seatingCalculationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp(2),
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
    marginRight: 'auto',
  },
  inputContainer: {
    flexDirection: 'row',
    height: hp(7),
    width: wp(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: wp(2),
    // marginVertical: hp(1),
    marginHorizontal: wp(4),
    marginTop: hp(2),
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
  totalPriceText1: {
    fontSize: wp(4),
    color: '#838383',
    // marginLeft: 'auto',
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
  seatingAvailabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: wp(2),
  },
  bookedContainer: {
    height: 25,
    width: 25,
    backgroundColor: 'grey',
  },
  seatingText: {
    fontSize: wp(3.5),
    fontWeight: '700',
  },
  bookedContainer1: {
    height: 25,
    width: 25,
    backgroundColor: 'red',
  },
  bookedContainer2: {
    height: 25,
    width: 25,
    backgroundColor: 'white',
  },
  bookedContainer3: {
    height: 25,
    width: 25,
    backgroundColor: 'green',
  },
  seatWrapper: {
    // flex: 1,
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
  QRCodeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: wp(2),
    marginBottom: hp(2),
  },
});
