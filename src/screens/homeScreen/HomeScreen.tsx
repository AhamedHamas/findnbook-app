import {useSelector} from 'react-redux';
import {CustomerHome} from './customerHome/CustomerHome';
import {RootState} from '../../store/store';
import {OwnerHome} from './ownerHome/OwnerHome';

export const HomeScreen = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.user);

  console.log('User data in HomeScreen:', user);
  console.log('Auth Token:', token);

  if (user.role === 'CUSTOMER' && token) {
    return <CustomerHome />;
  }

  return <OwnerHome />;
};
