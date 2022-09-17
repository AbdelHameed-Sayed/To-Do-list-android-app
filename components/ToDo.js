/* eslint-disable prettier/prettier */
import React, {Fragment, useEffect, useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SectionList,
  TouchableOpacity,
} from 'react-native';

const ToDo = () => {
  const days = [
    'Friday',
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
  ];

  let toDoListDays = [
    {
      key: 1,
      title: 'Friday',
      data: [],
    },
    {
      key: 2,
      title: 'Saturday',
      data: [],
    },
    {
      key: 3,
      title: 'Sunday',
      data: [],
    },
    {
      key: 4,
      title: 'Monday',
      data: [],
    },
    {
      key: 5,
      title: 'Tuesday',
      data: [],
    },
    {
      key: 6,
      title: 'Wednesday',
      data: [],
    },
    {
      key: 7,
      title: 'Thursday',
      data: [],
    },
  ];

  const [toDo, setToDo] = useState('');
  const [toDoList, setToDoList] = useState([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@ToDo');
      return jsonValue != null
        ? setToDoList(JSON.parse(jsonValue))
        : setToDoList(toDoListDays);
    } catch (error) {
      console.log(error);
    }
  };

  const storeOrRemoveHandler = async (value, index, section) => {
    try {
      if (!section && value === '') {
        return;
      } else if (!section && value) {
        toDoList.map(data => {
          if (data.key === index) {
            data.data = [...data.data, value];
          }
        });

        const jsonValue = JSON.stringify([...toDoList]);
        console.log(jsonValue);

        await AsyncStorage.setItem('@ToDo', jsonValue);
      }

      // To remove ToDo:
      else {
        toDoList.map(data => {
          if (data.key === section.key) {
            data.data = [...data.data.filter(item => item !== value)];
          }
        });

        const jsonValue = JSON.stringify([...toDoList]);

        await AsyncStorage.setItem('@ToDo', jsonValue);
      }

      getData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Fragment>
      <TextInput
        // caretHidden={true}
        style={styles.input}
        placeholder="Enter your To Do"
        placeholderTextColor={'rgba(255, 255, 255, 0.67)'}
        onChangeText={text => {
          setToDo(text);
        }}
        value={toDo}
      />

      <SelectDropdown
        disabled={!toDo}
        data={days}
        onSelect={(selectedItem, index) => {
          storeOrRemoveHandler(toDo, index + 1);
          setToDo('');
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
        dropdownStyle={styles.dropdown}
        rowTextStyle={styles.rowTextStyle}
        buttonTextStyle={styles.buttonTextStyle}
        buttonStyle={styles.buttonStyle}
        defaultButtonText="Select desired ToDo day"
      />

      <SectionList
        sections={toDoList}
        renderItem={({item, index, section}) => (
          <View style={styles.view}>
            <Text style={styles.txt}>{item}</Text>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                storeOrRemoveHandler(item, index, section);
              }}>
              <Text style={[styles.txt, styles.txtRemove]}>remove</Text>
            </TouchableOpacity>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </Fragment>
  );
};

export default ToDo;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'white',
    marginHorizontal: 20,
    paddingBottom: 0,
    color: 'rgba(255, 255, 255, 0.784)',
    marginVertical: 10,
    fontSize: 17,
  },

  header: {
    marginTop: 25,
    marginBottom: 5,
    marginLeft: 5,
    color: 'rgb(95, 20, 233)',
    fontSize: 17,
    fontWeight: 'bold',
  },

  txt: {
    textAlign: 'center',
    marginVertical: 3,
    backgroundColor: 'rgb(95, 20, 233)',
    borderRadius: 50,
    padding: 10,
    fontSize: 16,
    color: 'rgb(255,255,255)',
    width: 275,
  },

  txtRemove: {
    width: 95,
    backgroundColor: 'rgb(103, 60, 171)',
  },

  view: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },

  dropdown: {
    backgroundColor: 'rgb(49, 139, 218)',
  },

  rowTextStyle: {
    color: 'white',
  },

  buttonTextStyle: {
    color: 'white',
  },

  buttonStyle: {
    backgroundColor: 'rgb(83, 73, 195)',
    width: '60%',
    marginTop: 10,
    marginHorizontal: '20%',
    borderRadius: 10,
  },
});
