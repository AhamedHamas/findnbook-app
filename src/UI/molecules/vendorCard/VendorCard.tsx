import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import globalStyles from '../../../../global.css';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLocationDot} from '@fortawesome/free-solid-svg-icons';
import {RootStackParamList} from '../../../navigation/AppNavigator.types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {VendorCardProps} from './VendorCard.types';
import {BusinessCategory} from '../../../api/business/business.types';

const VendorCard: React.FC<VendorCardProps> = ({businessData}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  let profileImage;
  switch (businessData.category) {
    case BusinessCategory.Salon:
      profileImage = require('../../../assets/images/common/salon_profile.png');
      break;
    case BusinessCategory.Barbershop:
      profileImage = require('../../../assets/images/common/barbershop_profile.png');
      break;
    case BusinessCategory.VehicleRepair:
      profileImage = require('../../../assets/images/common/mechanic_profile.jpg');
      break;
    default:
      profileImage = require('../../../assets/images/common/default_profile.jpg');
  }
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('vendorCardScreen', {businessData, profileImage})
      }>
      <View style={styles.cardContainer}>
        <View style={styles.cardRow}>
          <Image source={profileImage} style={styles.imageBox} />

          <View style={styles.infoBox}>
            <View style={styles.headerRow}>
              <Text style={styles.businessName}>{businessData.name}</Text>
            </View>
            <View style={styles.addressRow}>
              <FontAwesomeIcon
                icon={faLocationDot}
                size={18}
                color={globalStyles.colors.secondary}
              />
              <Text style={styles.address}>{businessData.address}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  cardRow: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    width: '100%',
    gap: 15,
  },
  imageBox: {
    flexBasis: '30%',
    height: 100,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10,
  },
  infoBox: {
    width: '70%',
    gap: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingEnd: 10,
  },
  businessName: {
    fontSize: 18,
    fontWeight: '500',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  address: {
    color: globalStyles.colors.secondary,
  },
});

export default VendorCard;
