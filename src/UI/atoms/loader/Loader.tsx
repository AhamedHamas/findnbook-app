import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {LoaderProps} from './Loader.types';

const Loader = ({
  visible = false,
  size = 'large',
  color = '#007AFF',
}: LoaderProps) => {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});

export default Loader;
