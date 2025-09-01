import React from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../../UI/atoms/customButton/CustomButton';
import {useDispatch} from 'react-redux';
import {clearUser} from '../../store/user/userReducer';
import {onLogout} from '../../store/auth/authReducer';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator.types';

export const Account = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const onPressSignOut = () => {
    Alert.alert('Confirm Sign Out', 'Are you sure you want to sign out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: handleSignOut,
      },
    ]);
  };

  const handleSignOut = () => {
    dispatch(clearUser());
    dispatch(onLogout());
    navigation.replace('initialScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>My Account</Text>
      </View>
      <View style={styles.topSection}>
        <View style={styles.pill}>
          <FontAwesomeIcon
            icon={faUserCircle}
            size={32}
            color="#007AFF"
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.subtitle}>
              View and edit your personal information
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <CustomButton
          buttonLabel="Sign Out"
          onPress={onPressSignOut}
          buttonBackgroundColor="red"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  headerContainer: {
    marginBottom: 12,
    marginTop: 8,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: 1,
  },
  topSection: {
    flex: 1,
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bottomSection: {
    width: '100%',
    marginBottom: 24,
    justifyContent: 'flex-end',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF4FF',
    borderRadius: 32,
    paddingVertical: 18,
    paddingHorizontal: 20,
    width: '100%',
    elevation: 2,
    shadowColor: '#007AFF',
    shadowOpacity: 0.08,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
  },
  icon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
});
