import {
  Image,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {deviceHeight} from '../../../config/constant';
import {CustomModalProps} from './CustomModal.types';
import {white_close} from '../../../assets/images';
export const CustomModal = ({
  visible,
  title,
  children,
  handleClose,
  onClose,
}: CustomModalProps) => {
  const close = () => {
    Keyboard.dismiss();
    handleClose(false);
    onClose?.();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent]}>
          <TouchableOpacity onPress={() => close()} style={styles.closeButton}>
            <Image source={white_close} style={styles.closeButtonImage} />
          </TouchableOpacity>
          {!!title ? <Text style={[styles.modalTitle]}>{title}</Text> : null}
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    position: 'relative',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: deviceHeight * 0.88,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  closeButton: {
    height: 50,
    width: 50,
    position: 'absolute',
    right: 0,
    top: -45,
  },
  closeButtonImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'darkgray',
    textAlign: 'left',
  },
});
