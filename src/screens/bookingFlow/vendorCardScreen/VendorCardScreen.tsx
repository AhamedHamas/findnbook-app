import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ImageSourcePropType,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faComment,
  faPhone,
  faMapMarkerAlt,
  faClock,
  faCalendarDay,
} from '@fortawesome/free-solid-svg-icons';
import ServiceItemBar from '../../../UI/molecules/serviceItemBar/ServiceItemBar';
import {BackButtonHeader} from '../../../UI/molecules/backButtonHeader/BackButtonHeader';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {BusinessData} from '../../../api/business/business.types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/AppNavigator.types';

export const VendorCardScreen = () => {
  const route =
    useRoute<
      RouteProp<
        {
          params: {
            businessData: BusinessData;
            profileImage: ImageSourcePropType;
          };
        },
        'params'
      >
    >();
  const {businessData, profileImage} = route.params;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackButtonHeader title="Vendor Details" />

      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={profileImage}
          />
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.vendorName}>{businessData.name}</Text>
            <View style={styles.iconRow}>
              <TouchableOpacity style={styles.iconButton}>
                <FontAwesomeIcon icon={faPhone} size={20} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <FontAwesomeIcon icon={faComment} size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{marginBottom: 10}}>
            <View style={styles.addressRow}>
              <FontAwesomeIcon icon={faMapMarkerAlt} size={14} color="#666" />
              <Text style={styles.addressText}>{businessData.address}</Text>
            </View>

            <View style={styles.hoursRow}>
              <FontAwesomeIcon icon={faClock} size={14} color="#666" />
              <Text
                style={
                  styles.hoursText
                }>{`${businessData.openingTime} - ${businessData.closingTime}`}</Text>
            </View>

            <View style={styles.workingDaysRow}>
              <FontAwesomeIcon icon={faCalendarDay} size={14} color="#666" />
              <Text style={styles.workingDaysText}>
                {businessData.workingDays
                  .map(day => day.slice(0, 3))
                  .join(', ')}
              </Text>
            </View>
          </View>

          <Text style={styles.description}>{businessData.description}</Text>
        </View>
        <View style={{paddingHorizontal: 15}}>
          {businessData.services.length !== 0 ? (
            <FlatList
              data={businessData.services}
              keyExtractor={(item, idx) => `${item.name}-${idx}`}
              renderItem={({item}) => (
                <ServiceItemBar
                  title={item.name}
                  price={item.price}
                  duration={item.durationMinutes}
                  onTap={() => {
                    navigation.navigate('datePickerScreen', {
                      businessData,
                      bookingDetails: {
                        id: item.id,
                        title: item.name,
                        price: item.price,
                        date: '',
                        time: '',
                      },
                    });
                  }}
                />
              )}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text>No services available</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  detailsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vendorName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  iconRow: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    padding: 5,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  hoursText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  workingDaysRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  workingDaysText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  scrollContent: {
    gap: 20,
  },
});
