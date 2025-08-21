import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import globalStyles from '../../../global.css';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faLocationDot,
  faMapLocationDot,
  faScissors,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import ServicePill from '../../UI/molecules/servicePill/ServicePill';
import LocationHeader from '../../UI/molecules/locationHeader/LocationHeader';
import SearchBar from '../../UI/molecules/searchBar/SearchBar';
import {createAxiosClient} from '../../api';
import {useGetAllVendorTypes} from '../../api/vendor/vendor';
import VendorCard from '../../UI/molecules/vendorCard/VendorCard';

const HomeScreen = () => {
  // const client = createAxiosClient();

  // const {data: vendorTypes} = useGetAllVendorTypes(client);

  return (
    <View style={globalStyles.pagePadding}>
      <LocationHeader />
      <SearchBar />
      <View style={{marginVertical: 20}}>
        <Text style={globalStyles.text.subtitle}>Services</Text>
        <ScrollView
          style={{flexDirection: 'row', marginVertical: 20, gap: 20}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{gap: 10}}>
          <ServicePill />
          <ServicePill />
          <ServicePill />
        </ScrollView>
        <View style={{marginTop: 15, marginBottom: 15}}>
          <Text style={globalStyles.text.subtitle}>Barbershops Near You</Text>
        </View>
        <ScrollView
          contentContainerStyle={{gap: 15}}
          showsVerticalScrollIndicator={false}>
          <VendorCard />
          <VendorCard />
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
