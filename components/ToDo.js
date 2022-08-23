/* eslint-disable prettier/prettier */
import React, {Fragment, useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';

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

  const [toDo, setToDo] = useState('');

  const [toDoList, setToDoList] = useState([
    {
      key: 1,
      title: 'Friday',
      data: ['ToDo1', 'ToDo2', 'ToDo3'],
    },
    {
      key: 2,
      title: 'Saturday',
      data: ['ToDo1', 'ToDo2', 'ToDo3'],
    },
    {
      key: 3,
      title: 'Sunday',
      data: ['ToDo1', 'ToDo2', 'ToDo3'],
    },
    {
      key: 4,
      title: 'Monday',
      data: ['ToDo1', 'ToDo2', 'ToDo3'],
    },
    {
      key: 5,
      title: 'Tuesday',
      data: ['ToDo1', 'ToDo2', 'ToDo3'],
    },
    {
      key: 6,
      title: 'Wednesday',
      data: ['ToDo1', 'ToDo2', 'ToDo3'],
    },
    {
      key: 7,
      title: 'Thursday',
      data: ['ToDo1', 'ToDo2', 'ToDo3'],
    },
  ]);

  const removeHandler = (item, index, section) => {
    const set = toDoList.map(data => {
      let filtered;
      if (data.key === section.key) {
        filtered = {
          data: [...data.data.filter((_, idx) => idx !== index)],
        };
      }
      return {...data, ...filtered};
    });
    // console.log(set);
    setToDoList(set);
  };

  const addHandler = (toDoo, index) => {
    // console.log(toDoo, index);
    if (toDoo === '') {
      return;
    }
    const set = toDoList.map(data => {
      let addedToData;
      if (data.key === index) {
        addedToData = {
          data: [...data.data, toDoo],
        };
      }
      return {...data, ...addedToData};
    });
    // console.log(set);
    setToDoList(set);
  };

  return (
    <Fragment>
      <TextInput
        caretHidden={false}
        style={styles.input}
        placeholder="Enter your To Do"
        placeholderTextColor={'rgba(255, 255, 255, 0.67)'}
        onChangeText={text => {
          setToDo(text);
        }}
        value={toDo}
      />

      <SelectDropdown
        data={days}
        onSelect={(selectedItem, index) => {
          addHandler(toDo, index + 1);
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
        defaultButtonText="Select ToDo Day"
      />

      <SectionList
        sections={toDoList}
        renderItem={({item, index, section}) => (
          <View style={styles.view}>
            <Text style={styles.txt}>{item}</Text>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => removeHandler(item, index, section)}>
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
    paddingVertical: 10,
    color: 'rgb(255,255,255)',
    width: 275,
  },
  txtRemove: {
    width: 95,
    backgroundColor: 'rgb(103, 60, 171)',
  },

  view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },

  touchableOpacity: {
    cursor: 'pointer',
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
    borderRadius: 10,
    padding: 0,
    width: 175,
    marginHorizontal: '30%',
    marginTop: 10,
  },
});
