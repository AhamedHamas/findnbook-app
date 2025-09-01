import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import globalStyles from '../../../../global.css';
import {createAxiosClient} from '../../../api';
import {useGetAllBusinesses} from '../../../api/business/business';
import {BusinessCategory} from '../../../api/business/business.types';
import Loader from '../../../UI/atoms/loader/Loader';
import ServicePill from '../../../UI/molecules/servicePill/ServicePill';
import VendorCard from '../../../UI/molecules/vendorCard/VendorCard';
import {getServicePills} from './CustomerHome.utils';

export const CustomerHome = () => {
  const client = createAxiosClient({});
  const [category, setCategory] = React.useState<BusinessCategory | null>(null);
  const {data, isLoading} = useGetAllBusinesses({
    client,
    params: {category: category},
  });

  if (isLoading) return <Loader visible={isLoading} size="large" />;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={[globalStyles.pagePadding, {flex: 1}]}>
        {/* <LocationHeader /> */}
        {/* <SearchBar /> */}
        <View style={styles.servicesSection}>
          <View>
            <Text style={globalStyles.text.subtitle}>Services</Text>
            <ScrollView
              style={styles.servicesScroll}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.servicesScrollContent}>
              {getServicePills().map(pill => (
                <ServicePill
                  key={pill.label}
                  label={pill.label}
                  icon={pill.icon}
                  onPress={() => setCategory(pill.value)}
                  selected={category === pill.value}
                />
              ))}
            </ScrollView>
          </View>
          <View>
            <View style={styles.serviceHeader}>
              <Text style={globalStyles.text.subtitle}>
                {` ${category || 'All Service'}s Near You `}
              </Text>
            </View>
            <FlatList
              data={data || []}
              keyExtractor={item =>
                item.id?.toString() || Math.random().toString()
              }
              renderItem={({item}) => <VendorCard businessData={item} />}
              contentContainerStyle={[styles.vendorScrollContent]}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  servicesSection: {
    marginVertical: 20,
    flex: 1,
  },
  servicesScroll: {
    flexDirection: 'row',
    marginVertical: 20,
    gap: 20,
  },
  servicesScrollContent: {
    gap: 10,
  },
  serviceHeader: {
    marginTop: 15,
    marginBottom: 15,
  },
  vendorScrollContent: {
    gap: 15,
    paddingBottom: 230,
  },
});
