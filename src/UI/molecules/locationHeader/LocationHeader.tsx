import {faLocationDot} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Text, View} from 'react-native';

const LocationHeader = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
      }}>
      <View style={{marginRight: 10}}>
        <FontAwesomeIcon icon={faLocationDot} size={20} />
      </View>
      <View style={{marginVertical: 10}}>
        <Text>Location</Text>
        <Text style={{fontSize: 16, fontWeight: '600'}}>
          Kotikawatte, Colombo
        </Text>
      </View>
    </View>
  );
};

export default LocationHeader;
