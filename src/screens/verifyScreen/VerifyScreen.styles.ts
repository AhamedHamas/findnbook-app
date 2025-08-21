import {StyleSheet} from 'react-native';
import globalStyles from '../../../global.css';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginHorizontal: 10,
    fontSize: 20,
    textAlign: 'center',
  },
  resendText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  resendLink: {
    color: globalStyles.colors.primary,
  },
});
