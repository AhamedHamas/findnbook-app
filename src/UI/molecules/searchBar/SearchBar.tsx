import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {TextInput, View} from 'react-native';

const SearchBar = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ddd',
        paddingHorizontal: 10,
        marginVertical: 10,
      }}>
      <FontAwesomeIcon icon={faSearch} size={20} color={'#aaa'} />
      <TextInput
        style={{
          fontSize: 16,
          paddingHorizontal: 10,
          width: '100%',
          color: '#000',
        }}
        placeholder="Search for businesses"
        placeholderTextColor={'#aaa'}
      />
    </View>
  );
};

export default SearchBar;
