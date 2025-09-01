import React, {useEffect, useRef} from 'react';
import {Animated, View, StyleSheet} from 'react-native';

export const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.text,
          {
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}],
          },
        ]}>
        FindNBook
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
});
