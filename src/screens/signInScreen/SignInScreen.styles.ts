import {StyleSheet} from 'react-native';
import globalStyles from '../../../global.css';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.colors.primary,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    color: '#000000',
  },
  orText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
