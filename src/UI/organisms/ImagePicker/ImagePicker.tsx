import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {CustomModal} from '../../molecules/customModal/CustomModal';

type ImagePickerProps = {
  children: React.ReactNode;
  onPick: (uri: string | undefined) => void;
  modalTitle?: string;
};

export const ImagePicker: React.FC<ImagePickerProps> = ({
  children,
  onPick,
  modalTitle = 'Select Media',
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCamera = () => {
    setModalVisible(false);
    launchCamera({mediaType: 'photo', quality: 0.7}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.errorCode) {
        console.log('ImagePicker Error Code: ', response.errorCode);
      }
      if (response.assets && response.assets.length > 0) {
        console.log(response);
        onPick(response.assets[0].uri);
      } else {
        onPick(undefined);
      }
    });
  };

  const handleGallery = () => {
    setModalVisible(false);
    launchImageLibrary({mediaType: 'photo', quality: 0.7}, response => {
      if (response.assets && response.assets.length > 0) {
        onPick(response.assets[0].uri);
      } else {
        onPick(undefined);
      }
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {children}
      </TouchableOpacity>
      <CustomModal
        visible={modalVisible}
        handleClose={() => setModalVisible(false)}
        title={modalTitle}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.option} onPress={handleCamera}>
            <Text style={styles.optionText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handleGallery}>
            <Text style={styles.optionText}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 16,
  },
  option: {
    width: '90%',
    backgroundColor: '#EAF4FF',
    paddingVertical: 16,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
