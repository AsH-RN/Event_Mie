/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {FlatGrid} from 'react-native-super-grid';
import RenderHtml from 'react-native-render-html';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

// Component
import CustomLoader from '../component/CustomLoader';
import HeaderComponent from '../component/HeaderComponent';
import FooterComponent from '../component/FooterComponent';

// Icon
import ic_facebook from '../assets/icon/ic_facebook.png';
import ic_twitter from '../assets/icon/ic_twitter.png';
import ic_linkedin from '../assets/icon/ic_linkedin.png';
import ic_whatsapp from '../assets/icon/ic_whatsapp.png';
import ic_reddit from '../assets/icon/ic_reddit.png';
import ic_chain from '../assets/icon/ic_chain.png';
import ic_ticket from '../assets/icon/ic_ticket.png';
// import ic_4star from '../assets/icon/ic_4star.png';
// import ic_3star from '../assets/icon/ic_3star.png';
// import ic_2star from '../assets/icon/ic_2star.png';
// import ic_star from '../assets/icon/ic_star.png';
import ic_5star from '../assets/icon/ic_5star.png';

// Image
// import event_information_image from '../assets/image/event_information_image.jpg';
import splash_image from '../assets/image/spalsh_image.png';

// API Info
import {BASE_URL} from '../api/ApiInfo';

// User Preference
import {async_keys, getData} from '../api/UserPreference';
import {showToast} from '../component/CustomToast';

const width = Dimensions.get('window').width;

export default class ViewEventScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posterImage: null,
      title: null,
      categoryName: null,
      descriptionText: null,
      venue: null,
      address: null,
      zipCode: null,
      city: null,
      startDate: null,
      endDate: null,
      faq: null,
      eventTicketData: [],
      DJList: [],
      speakerList: [],
      sponsorsList: [],
      eventGalleryList: [],
      ratingReviewsList: [],
      totalReviews: null,
      isLoading: true,
      startTime: null,
      endTime: null,
      datesArray: [],
      tickets: [],
      showSheatChart: null,
      eventId: null,
      repetitiveType: null,
      maxQuantity: null,
      currency: null,
    };

    // fetching navigation props
    this.slugTitle = this.props.navigation.getParam('slugTitle', null);
  }

  componentDidMount() {
    this.fetchEventDetail();
  }

  fetchEventDetail = async () => {
    const axios = require('axios');

    try {
      // calling api

      await axios
        .get(BASE_URL + 'events/show/' + this.slugTitle.slug)

        // processing response
        .then(response => {
          let newResponse = response;

          if (newResponse) {
            const {success} = newResponse.data;

            if (success === true) {
              console.log(newResponse.data.data);

              let datesArray = [];
              newResponse.data.data.repititive_schedule.map((item, id) =>
                item.schedule_dates.map(subItem =>
                  subItem.map(dates => datesArray.push({id, dates})),
                ),
              );

              let startTime = [];
              let endTime = [];
              newResponse.data.data.repititive_schedule.map(
                (item, id) => startTime.push(id, item.from_time),
                // console.log(startTime),
              );

              newResponse.data.data.repititive_schedule.map(
                (item, id) => endTime.push(id, item.endTime),
                // console.log(endTime),
              );

              this.setState({
                posterImage: newResponse.data.data.event.poster,
                title: newResponse.data.data.event.title,
                categoryName: newResponse.data.data.event.category_name,
                descriptionText: newResponse.data.data.event.description,
                venue: newResponse.data.data.event.venue,
                address: newResponse.data.data.event.address,
                zipCode: newResponse.data.data.event.zipcode,
                city: newResponse.data.data.event.city,
                startDate: newResponse.data.data.event.start_date,
                endDate: newResponse.data.data.event.end_date,
                repetitiveType: newResponse.data.data.event.repetitive_type,
                faq: newResponse.data.data.event.faq,
                DJList: newResponse.data.data.tag_groups.djs,
                speakerList: newResponse.data.data.tag_groups.speakers,
                sponsorsList: newResponse.data.data.tag_groups.sponsors,
                totalReviews: newResponse.data.data.event.reviews.length,
                ratingReviewsList: newResponse.data.data.event.reviews,
                startTime: newResponse.data.data.event.start_time,
                endTime: newResponse.data.data.event.end_time,
                eventTicketData: newResponse.data.data.repititive_schedule,
                datesArray: datesArray,
                tickets: newResponse.data.data.tickets,
                showSheatChart:
                  newResponse.data.data.tickets[0].show_sheat_chart,
                eventId: newResponse.data.data.event.id,
                maxQuantity: newResponse.data.data.max_ticket_qty,
                currency: newResponse.data.data.currency,
                isLoading: false,
              });
            }
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  handleGetTicket = async date => {
    // getting data from async storage
    const organizer = await getData(async_keys.userInfo);

    // console.log(organizer);

    if (organizer === 3) {
      showToast('Organizer cannot book ticket.');
    } else {
      const {
        title,
        startDate,
        endDate,
        venue,
        startTime,
        endTime,
        tickets,
        eventId,
        maxQuantity,
        currency,
      } = this.state;

      const finalDate = date.dates;
      // console.log(date.dates);
      this.props.navigation.navigate('Checkout', {
        eventInfo: {
          title,
          startDate,
          endDate,
          venue,
          startTime,
          endTime,
          tickets,
          eventId,
          finalDate,
          maxQuantity,
          currency,
        },
      });
    }
  };

  handleGetSeatingTicket = async date => {
    const {
      title,
      startDate,
      endDate,
      venue,
      startTime,
      endTime,
      tickets,
      eventId,
      currency,
    } = this.state;

    // const finalDate = date.dates;
    // console.log(date.dates);
    this.props.navigation.navigate('Checkout', {
      eventInfo: {
        title,
        startDate,
        endDate,
        venue,
        startTime,
        endTime,
        tickets,
        eventId,
        currency,
        // finalDate,
      },
    });
  };

  handleFacebook = async () => {
    try {
      // Linking.openURL('https://bookingqube.classiebit.com/');

      const {posterImage, title, descriptionText} = this.state;

      const htmlTagRegex = /<[^>]*>?/gm;
      const description = descriptionText
        .replace(htmlTagRegex, '')
        .replace(/&nbsp;/gm, '');

      const imageUrl = this.slugTitle.imageUrlPrefix + '/' + posterImage;

      // console.log(imageUrl, title, description);

      // Downloading Image for sharing
      let imagePath = null;
      RNFetchBlob.config({
        fileCache: true,
      })
        .fetch('GET', imageUrl)
        // the image is now downloaded to device's storage
        .then(resp => {
          // the image path you can use it directly with Image component
          imagePath = resp.path();
          return resp.readFile('base64');
        })
        .then(async base64Data => {
          var base64Data = `data:image/png;base64,` + base64Data;
          // here's base64 encoded image
          await Share.open({
            url: base64Data,
            message: title,
            // +
            //   ' ' +
            //   'https://www.sachbedhadak.in/front/Home/newsDetail/' +
            //   this.state.link,
          });
          // remove the file from storage
          // return fs.unlink(imagePath);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  handleTwitter = async () => {
    try {
      Linking.openURL('https://bookingqube.classiebit.com/');
    } catch (error) {
      console.log(error.message);
    }
  };

  handleLinkedin = async () => {
    try {
      Linking.openURL('https://bookingqube.classiebit.com/');
    } catch (error) {
      console.log(error.message);
    }
  };

  handleWhatsApp = async () => {
    try {
      Linking.openURL('https://bookingqube.classiebit.com/');
    } catch (error) {
      console.log(error.message);
    }
  };

  handleReddit = async () => {
    try {
      Linking.openURL('https://bookingqube.classiebit.com/');
    } catch (error) {
      console.log(error.message);
    }
  };

  handleChain = async () => {
    try {
      Linking.openURL('https://bookingqube.classiebit.com/');
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const {isLoading, descriptionText, faq} = this.state;

    if (isLoading) {
      return <CustomLoader />;
    }

    const source = {html: descriptionText};

    const source1 = {html: faq};

    const imageUrl = this.slugTitle.imageUrlPrefix + '/';

    // const htmlTagRegex = /<[^>]*>?/gm;
    // const description = descriptionText
    //   .replace(htmlTagRegex, '')
    //   .replace(/&nbsp;/gm, '');

    // const htmlTagRegex1 = /<[^>]*>?/gm;
    // const eventInfo = faq.replace(htmlTagRegex1, '').replace(/&nbsp;/gm, '');

    return (
      <SafeAreaView style={styles.container}>
        <HeaderComponent
          title="Event Information"
          navAction="back"
          nav={this.props.navigation}
        />
        <ScrollView>
          <View style={styles.homeContainer}>
            <Image
              source={{uri: imageUrl + this.state.posterImage}}
              resizeMode="cover"
              style={styles.eventImageStyle}
            />

            <Text style={styles.eventTitleTextStyle}>{this.state.title}</Text>

            <View style={styles.eventTypeContainer}>
              <View style={styles.eventCategory}>
                <Text style={styles.categoryText}>
                  {this.state.categoryName}
                </Text>
              </View>

              <View style={styles.eventCategory}>
                <Text style={styles.categoryText}>Free Tickets</Text>
              </View>

              <View style={styles.eventCategory}>
                <Text style={styles.categoryText}>
                  Repetitive Monthly event
                </Text>
              </View>
            </View>

            <View style={styles.shareEventContainer}>
              <Text style={styles.shareEventText}>Share Event</Text>

              <TouchableOpacity
                style={styles.iconOnPress}
                onPress={this.handleFacebook}>
                <Image
                  source={ic_facebook}
                  resizeMode="cover"
                  style={styles.shareIconStyle}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconOnPress}
                onPress={this.handleFacebook}>
                <Image
                  source={ic_twitter}
                  resizeMode="cover"
                  style={styles.shareIconStyle}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconOnPress}
                onPress={this.handleFacebook}>
                <Image
                  source={ic_linkedin}
                  resizeMode="cover"
                  style={styles.shareIconStyle}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconOnPress}
                onPress={this.handleFacebook}>
                <Image
                  source={ic_whatsapp}
                  resizeMode="cover"
                  style={styles.shareIconStyle}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconOnPress}
                onPress={this.handleFacebook}>
                <Image
                  source={ic_reddit}
                  resizeMode="cover"
                  style={styles.shareIconStyle}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconOnPress}
                onPress={this.handleFacebook}>
                <Image
                  source={ic_chain}
                  resizeMode="cover"
                  style={styles.shareIconStyle}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.getTicketButtonContainer}
              onPress={this.handleGetTicket}>
              <Image
                source={ic_ticket}
                resizeMode="cover"
                style={styles.ticketIconStyle}
              />
              <Text style={styles.getTicketText}>Get your tickets now</Text>
            </TouchableOpacity>

            {/* <Text style={styles.descriptionText}>{description}</Text> */}
            <View style={{marginHorizontal: wp(2)}}>
              <RenderHtml
                contentWidth={width}
                source={source}
                // renderersProps={renderersProps}
              />
            </View>

            <View style={styles.eventLocationContainer}>
              <LinearGradient
                colors={['#47a0f2', '#ed4592']}
                style={styles.whereBoxContainer}>
                <Text style={styles.whereTextStyle}>Where</Text>
                <Text style={styles.whereTextStyle}>{this.state.venue}</Text>
                <Text style={styles.addressTextStyle}>
                  {this.state.address} {this.state.zipCode}
                </Text>
                <Text style={styles.addressTextStyle}>{this.state.city}</Text>
              </LinearGradient>

              <LinearGradient
                colors={['#47a0f2', '#ed4592']}
                style={styles.whereBoxContainer}>
                <Text style={styles.whereTextStyle}>When</Text>
                <Text style={styles.addressTextStyle}>
                  {this.state.startDate} {'\n'} Till {'\n'} {this.state.endDate}
                </Text>
              </LinearGradient>
            </View>

            <View style={styles.bookTicketContainer}>
              <Text style={styles.getYourTicketText}>Get your tickets now</Text>
              <Text style={styles.bookTicketText}>
                Click on a date to book tickets
              </Text>

              <View style={styles.firstTicketContainer}>
                <View style={styles.secondTicketContainer}>
                  <Text style={styles.dateText}>All Tickets</Text>
                </View>

                {this.state.repetitiveType === null ? (
                  <View style={styles.thirdTicketContainer}>
                    <TouchableOpacity
                      style={styles.listCountingContainer}
                      onPress={() => this.handleGetSeatingTicket()}>
                      <Text style={styles.listDateText}>
                        {this.state.startDate}
                      </Text>

                      <View style={styles.listTimeContainer}>
                        <Text style={styles.listTimeText}>
                          {this.state.startTime}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.thirdTicketContainer}>
                    {this.state.datesArray.map(date => {
                      return (
                        <TouchableOpacity
                          style={styles.listCountingContainer}
                          onPress={() => this.handleGetTicket(date)}>
                          <Text style={styles.listDateText}>{date.dates}</Text>

                          <View style={styles.listTimeContainer}>
                            <Text style={styles.listTimeText}>
                              {date.dates}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </View>
            </View>

            <View style={styles.eventInfoContainer}>
              <Text style={styles.eventInfoText}>Event Info</Text>

              {/* <Text style={styles.eventDescriptionText}>{eventInfo}</Text> */}
              <View style={{marginHorizontal: wp(2)}}>
                <RenderHtml
                  contentWidth={width}
                  source={source1}
                  // renderersProps={renderersProps}
                />
              </View>
            </View>

            <ImageBackground
              source={splash_image}
              style={styles.eventCategoryContainer}>
              <Text style={styles.DjsText}>DJs</Text>
              <FlatGrid
                itemDimension={134}
                data={this.state.DJList}
                // style={styles.gridView}
                spacing={2}
                renderItem={({item}) => (
                  <TouchableOpacity style={styles.categoryContainer}>
                    <ImageBackground
                      source={{uri: imageUrl + item.image}}
                      resizeMode="cover"
                      style={styles.categoryImageStyle}>
                      <Text style={styles.djNameText}>{item.title}</Text>
                      <Text style={styles.djSubtitleText}>
                        {item.sub_title}
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                )}
              />
            </ImageBackground>

            <View style={styles.speakerListContainer}>
              <Text style={styles.speakerText}>Speakers</Text>
              <FlatGrid
                itemDimension={134}
                data={this.state.speakerList}
                // style={styles.gridView}
                spacing={2}
                renderItem={({item}) => (
                  <TouchableOpacity style={styles.speakerInfoContainer}>
                    <ImageBackground
                      source={{uri: imageUrl + item.image}}
                      resizeMode="cover"
                      style={styles.speakerImageStyle}>
                      <Text style={styles.djNameText}>{item.title}</Text>
                      <Text style={styles.djSubtitleText}>
                        {item.sub_title}
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                )}
              />
            </View>

            <View style={styles.eventCategoryContainer}>
              <Text style={styles.DjsText}>Sponsors</Text>
              <FlatGrid
                itemDimension={134}
                data={this.state.sponsorsList}
                // style={styles.gridView}
                spacing={2}
                renderItem={({item}) => (
                  <TouchableOpacity style={styles.categoryContainer}>
                    <ImageBackground
                      source={{uri: imageUrl + item.image}}
                      resizeMode="cover"
                      style={styles.sponsorsImageStyle}>
                      <Text style={styles.djNameText}>{item.title}</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                )}
              />
            </View>

            <ImageBackground
              source={splash_image}
              style={styles.eventCategoryContainer}>
              <Text style={styles.DjsText}>Event Gallery</Text>
              <FlatGrid
                itemDimension={134}
                data={this.state.eventGalleryList}
                // style={styles.gridView}
                spacing={2}
                renderItem={({item}) => (
                  <TouchableOpacity style={styles.categoryContainer}>
                    <ImageBackground
                      source={item.poster}
                      resizeMode="cover"
                      style={styles.categoryImageStyle}>
                      <Text style={styles.categoryTitleText}>{item.city}</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                )}
              />
            </ImageBackground>

            <View style={styles.ratingReviewsContainer}>
              <Text style={styles.ratingsAndReviewsTitleText}>
                Ratings & Reviews
              </Text>
              <Text style={styles.totalReviewsText}>
                {this.state.totalReviews} Reviews
              </Text>

              {this.state.ratingReviewsList.map(item => {
                return (
                  <View style={styles.reviewListContainer}>
                    <View style={styles.ratingIconAndTextContainer}>
                      {item.rating === '5.0' ? (
                        <Image
                          source={ic_5star}
                          resizeMode="cover"
                          style={styles.startIconStyle}
                        />
                      ) : null}
                      {/* item.rating === '4.0' ? (
                      <Image
                        source={ic_4star}
                        resizeMode="cover"
                        style={styles.startIconStyle}
                      />
                    ) : item.rating === '3.0' ? (
                      <Image
                        source={ic_3star}
                        resizeMode="cover"
                        style={styles.startIconStyle}
                      />
                    ) : item.rating === '2.0' ? (
                      <Image
                        source={ic_2star}
                        resizeMode="cover"
                        style={styles.startIconStyle}
                      />
                    ) : item.rating === '1.0' ? (
                      <Image
                        source={ic_star}
                        resizeMode="cover"
                        style={styles.startIconStyle}
                      />
                    ) : null */}

                      <Text style={styles.ratingText}>
                        {item.rating + ' ' + 'Out of 5'}
                      </Text>
                    </View>

                    <Text style={styles.reviewText}>{item.review}</Text>
                  </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  homeContainer: {
    flex: 1,
  },
  eventImageStyle: {
    height: hp(30),
    aspectRatio: 16 / 9,
  },
  eventTitleTextStyle: {
    fontSize: wp(3.8),
    fontWeight: '700',
    color: '#000',
    marginHorizontal: wp(2),
  },
  eventTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(2),
    marginVertical: hp(2),
  },
  eventCategory: {
    height: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b89ef',
    borderRadius: wp(6),
    marginHorizontal: wp(1),
  },
  categoryText: {
    fontSize: wp(3),
    color: '#fff',
    marginHorizontal: wp(2),
  },
  shareEventContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareEventText: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#ec398b',
    // marginLeft: wp(2),
    marginHorizontal: wp(2),
  },
  iconOnPress: {
    flexDirection: 'row',
  },
  shareIconStyle: {
    width: hp(2),
    aspectRatio: 1 / 1,
    marginHorizontal: wp(2),
  },
  getTicketButtonContainer: {
    flexDirection: 'row',
    height: hp(6),
    width: hp(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(3),
    backgroundColor: '#ec398b',
    marginVertical: hp(2),
    marginLeft: wp(2),
  },
  ticketIconStyle: {
    width: hp(3),
    aspectRatio: 1 / 1,
  },
  getTicketText: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#fff',
  },
  descriptionText: {
    fontSize: wp(3.5),
    color: '#1b9bf3',
  },
  eventLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(2),
  },
  whereBoxContainer: {
    height: hp(12),
    width: wp(45),
    marginHorizontal: wp(2),
    alignItems: 'center',
    borderRadius: wp(4),
  },
  whereTextStyle: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#fff',
  },
  addressTextStyle: {
    fontSize: wp(3.5),
    color: '#fff',
  },
  bookTicketContainer: {
    alignItems: 'center',
    backgroundColor: '#1b89ef',
  },
  getYourTicketText: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#fff',
    marginTop: hp(2),
  },
  bookTicketText: {
    fontSize: wp(3.5),
    color: '#fff',
    marginTop: hp(1),
  },
  firstTicketContainer: {
    width: wp(90),
    backgroundColor: '#00192f',
    marginHorizontal: wp(4),
    alignItems: 'center',
    borderRadius: wp(3),
  },
  secondTicketContainer: {
    width: wp(80),
    height: hp(8),
    borderRadius: wp(3),
    marginVertical: hp(2),
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: wp(3.5),
    color: '#1b97f3',
    textAlign: 'center',
    marginTop: hp(2),
  },
  thirdTicketContainer: {
    width: wp(80),
    borderRadius: wp(2),
    backgroundColor: '#fff',
    marginVertical: hp(2),
  },
  listCountingContainer: {
    flexDirection: 'row',
    borderRadius: wp(3),
    backgroundColor: '#1b97f3',
    marginVertical: hp(2),
    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(2),
  },
  listDateText: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: wp(2),
    marginTop: hp(0.4),
  },
  listTimeContainer: {
    // width: wp(10),
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: wp(6),
    backgroundColor: '#fff',
    marginLeft: 'auto',
  },
  listTimeText: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#ec398b',
    marginHorizontal: wp(2),
  },
  eventInfoContainer: {
    marginVertical: hp(2),
  },
  eventInfoText: {
    fontSize: wp(6),
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  eventDescriptionText: {
    fontSize: wp(3.5),
    color: '#838383',
    marginVertical: hp(2),
  },
  DjsText: {
    fontSize: wp(6),
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginTop: hp(2),
  },
  djNameText: {
    fontSize: wp(5),
    fontWeight: '700',
    color: '#efa506',
  },
  djSubtitleText: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#fff',
  },
  eventCategoryContainer: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#00192f',
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
  speakerListContainer: {
    backgroundColor: '#fff',
  },
  speakerText: {
    fontSize: wp(6),
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginTop: hp(2),
  },
  speakerInfoContainer: {
    height: hp(20),
    width: wp(40),
    borderWidth: 4,
    borderColor: '#ccc',
    borderRadius: wp(2),
    marginHorizontal: wp(4),
    marginVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 40,
  },
  speakerImageStyle: {
    height: hp(18),
    aspectRatio: 1 / 1,
    borderRadius: wp(10),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sponsorsImageStyle: {
    width: hp(18),
    aspectRatio: 16 / 9,
    // borderRadius: wp(10),
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  sponsorsText: {
    fontSize: wp(5),
    fontWeight: '700',
    color: '#efa506',
  },
  ratingReviewsContainer: {
    // backgroundColor: '#fff',
    marginHorizontal: wp(2),
    marginVertical: hp(2),
  },
  ratingsAndReviewsTitleText: {
    fontSize: wp(6),
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  totalReviewsText: {
    fontSize: wp(5),
    fontWeight: '700',
    color: '#000',
  },
  reviewListContainer: {
    // alignItems: 'center',
    marginHorizontal: wp(2),
    marginVertical: hp(2),
  },
  ratingIconAndTextContainer: {
    flexDirection: 'row',
  },
  startIconStyle: {
    width: hp(2),
    aspectRatio: 1 / 1,
  },
  ratingText: {
    fontSize: wp(3.5),
    color: '#000',
  },
  reviewText: {
    fontSize: wp(3.5),
    color: '#000',
    textAlign: 'left',
  },
});
