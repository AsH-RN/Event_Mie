/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DocumentPicker from 'react-native-document-picker';
class CustomField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      custom_fields: [],
      isVisible: false,
    };
  }
  componentDidMount() {
    this.setState({
      custom_fields: this.props.customFieldsData,
    });
    console.log(
      'this.props.customFieldsData',
      JSON.stringify(this.props.customFieldsData, null, 4),
    );
  }

  checkIfDataFilled = () => {
    let not_filled = this.state.custom_fields.filter(
      item => item.is_required && !item?.value,
    );
    console.log('not_filled', JSON.stringify(not_filled.length, null, 4));
    return not_filled.length;
  };
  onConfirm = () => {
    // console.log('dmkd',JSON.stringify(this.state.custom_fields,null,4));
    let obj = {};
    this.state.custom_fields.forEach(item => {
      obj[item.field_name] = item.value ?? '';
    });
    this.props?.onChange?.(obj);
    this.setState({isVisible: false});
  };

  pickFile = async item => {
    try {
      let response = await DocumentPicker.pick({
        type: DocumentPicker.types.images,
      });
      console.log('response', JSON.stringify(response, null, 4));
      let newDt = this.state.custom_fields.map(ite => {
        if (ite.id === item.id) {
          return {
            ...ite,
            value: response[0],
          };
        }
        return ite;
      });
      this.setState({custom_fields: newDt});
      console.log('new_dt', JSON.stringify(newDt, null, 4));
    } catch (e) {
      console.log('err', e);
    }
  };
  renderTextInput = item => {
    return (
      <View>
        <Text style={{padding: 5, paddingLeft: 0}}>
          {item.label + (item.is_required ? ' *' : '')}
        </Text>
        <TextInput
          style={{
            borderWidth: 2,
            borderColor: 'rgb(220,220,220)',
            borderRadius: 5,
            marginBottom: 20,
            color: '#000',
          }}
          placeholder={item.label + (item.is_required ? ' *' : '')}
          placeholderTextColor="#000"
          value={item?.value || ''}
          onChangeText={value => {
            // console.log('item',JSON.stringify(item,null,4));
            let newDt = this.state.custom_fields.map(ite => {
              if (ite.id === item.id) {
                return {
                  ...ite,
                  value,
                };
              }
              return ite;
            });
            this.setState({custom_fields: newDt});
            console.log('new_dt', JSON.stringify(newDt, null, 4));
          }}
        />
      </View>
    );
  };
  renderTextArea = item => {
    return (
      <View>
        <Text style={{padding: 5, paddingLeft: 0}}>
          {item.label + (item.is_required ? ' *' : '')}
        </Text>
        <TextInput
          multiline={true}
          style={{
            borderWidth: 2,
            borderColor: 'rgb(220,220,220)',
            borderRadius: 5,
            height: 150,
            textAlignVertical: 'top',
            marginBottom: 20,
          }}
          placeholder={item.label + (item.is_required ? ' *' : '')}
          onChangeText={value => {
            let newDt = this.state.custom_fields.map(ite => {
              if (ite.id === item.id) {
                return {
                  ...ite,
                  value,
                };
              }
              return ite;
            });
            this.setState({custom_fields: newDt});
          }}
        />
      </View>
    );
  };
  renderDropdown = item => {
    return (
      <View style={{marginBottom: 20}}>
        <Text style={{padding: 5, paddingLeft: 0}}>
          {item.label + (item.is_required ? ' *' : '')}
        </Text>
        <RNPickerSelect
          style={{
            inputAndroid: {
              borderColor: 'rgb(220,220,220)',
              borderWidth: 2,
              borderRadius: 5,
            },
          }}
          // placeholder={item.label + 'fdkjnf n jk '}
          items={JSON.parse(item.field_options).map((ite, ind) => {
            return {
              label: ite,
              key: ind,
              value: ite,
            };
          })}
          onValueChange={value => {
            console.log('value', value);
            let newDt = this.state.custom_fields.map(ite => {
              if (ite.id === item.id) {
                return {
                  ...ite,
                  value,
                };
              }
              return ite;
            });
            this.setState({custom_fields: newDt});
          }}
          // items={[
          //     {label : 'Some Label',key : 1, value : 'value'},
          //     {label : 'More Label',key : 2, value : 'value_'}
          // ]}
          // onValueChange={value =>
          // this.handleSelectValue(value, item)
          // }
          // items={getListTicketQuantity(item).map((list, i) => ({
          // label: list.label,
          // value: list.value,
          // key: i,
          // }))}
          // style={pickerStyle}
          useNativeAndroidPickerStyle={false}
        />
      </View>
    );
  };
  renderRadioInput = item => {
    let dt = {
      id: 5,
      label: 'Cost',
      field_type: 'radio',
      field_options: [
        '$695 *Weekdays',
        '$895 *Weekends',
        '$100 per hours (additional hours)',
      ],
      field_opt:
        '["$695 *Weekdays","$895 *Weekends","$100 per hours (additional hours)"]',
      is_required: 1,
      event_id: 3,
      status: 1,
      show_on_ticket: 1,
      created_at: '2022-05-25T11:27:49.000000Z',
      updated_at: '2022-05-25T11:27:49.000000Z',
      field_name: 'nWG6GbAgtaK4PQeceD1B',
      file_size: '0',
      file_type: null,
    };
    return (
      <View style={{marginBottom: 20}}>
        <Text style={{padding: 5, paddingLeft: 0}}>
          {item.label + (item.is_required ? ' *' : '')}
        </Text>
        {JSON.parse(item.field_options).map(ite => {
          return (
            <TouchableOpacity
              onPress={() => {
                let newDt = this.state.custom_fields.map(it => {
                  if (it.id === item.id) {
                    return {
                      ...it,
                      value: ite,
                    };
                  }
                  return it;
                });
                this.setState({custom_fields: newDt});
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <View
                style={[
                  {
                    width: 20,
                    height: 20,
                    borderRadius: 20,
                    borderWidth: 1.5,
                    borderColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <View
                  style={[
                    {width: 12, height: 12, borderRadius: 15},
                    item.value === ite
                      ? Styles.activeRadio
                      : Styles.inactiveRadio,
                  ]}
                />
              </View>
              <Text> {ite}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  renderFileInput = item => {
    return (
      <View style={{marginBottom: 10}}>
        <Text style={{padding: 5, paddingLeft: 0}}>
          {item.label + (item.is_required ? ' *' : '')}
        </Text>
        {!item.value ? (
          <TouchableOpacity
            onPress={() => this.pickFile(item)}
            style={{
              backgroundColor: 'rgb(220,220,220)',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              padding: 40,
            }}>
            <Text style={{fontWeight: 'bold', color: 'black'}}>Pick File</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <Image
              source={{uri: item.value.uri}}
              style={{width: 100 + '%', height: 150}}
            />
          </View>
        )}
      </View>
    );
  };
  renderInputBoxes = () => {
    return (
      <View>
        {this.state.custom_fields.map(item => {
          if (item.field_type === 'text') {
            return this.renderTextInput(item);
          }
          if (item.field_type === 'radio') {
            return this.renderRadioInput(item);
          }
          if (item.field_type === 'textarea') {
            return this.renderTextArea(item);
          }
          if (item.field_type === 'dropdown') {
            return this.renderDropdown(item);
          }
          if (item.field_type === 'file') {
            return this.renderFileInput(item);
          }
        })}
      </View>
    );
  };
  render() {
    return (
      <View>
        <View
          style={{
            backgroundColor: 'black',
            padding: 10,
            borderRadius: 5,
            marginBottom: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              backgroundColor: 'black',
              color: 'white',
            }}
            onPress={() => {
              this.setState({isVisible: true});
            }}>
            {this?.props?.title}
          </Text>
          {this.checkIfDataFilled() ? (
            <View></View>
          ) : (
            <Image
              source={require('../assets/icon/check.png')}
              style={{width: 30, height: 30}}
            />
          )}
        </View>
        <Modal visible={this.state.isVisible} transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(20,20,20,0.7)',
            }}>
            <View
              style={{
                width: 90 + '%',
                height: 80 + '%',
                backgroundColor: 'white',
              }}>
              <Text
                style={{textAlign: 'right'}}
                onPress={() => {
                  this.setState({isVisible: false});
                }}>
                Close
              </Text>
              <ScrollView contentContainerStyle={{padding: 10}}>
                {this.renderInputBoxes()}
                <TouchableOpacity
                  // disabled={()=>this.checkIfDataFilled() ? true : false}
                  onPress={() => {
                    if (this.checkIfDataFilled()) {
                      return;
                    }
                    this.onConfirm();
                    // console.log('dt',JSON.stringify(this.state.custom_fields,null,4));
                  }}
                  style={[
                    {
                      width: 100 + '%',
                      alignSelf: 'center',
                      alignItems: 'center',
                      backgroundColor: 'gray',
                      borderRadius: 10,
                    },
                    this.checkIfDataFilled()
                      ? Styles.inactiveButton
                      : Styles.activeButton,
                  ]}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      padding: 10,
                      color: this.checkIfDataFilled()
                        ? 'rgb(70,70,70)'
                        : 'white',
                    }}>
                    Confirm
                  </Text>
                </TouchableOpacity>
                {/* {
                                this.renderTextInput()
                            }
                            {
                                this.renderRadioInput()
                            }
                            {
                                this.renderDropdown()
                            }
                            {
                                this.renderTextArea()
                            } */}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default CustomField;

const Styles = StyleSheet.create({
  activeRadio: {
    backgroundColor: 'black',
    borderWidth: 1.5,
    borderColor: 'black',
  },
  inactiveRadio: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: 'rgb(20,20,20)',
  },
  activeButton: {
    width: 100 + '%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 10,
  },
  inactiveButton: {
    width: 100 + '%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 10,
  },
});
