import {
  faBuilding,
  faCar,
  faPaintBrush,
  faScissors,
} from '@fortawesome/free-solid-svg-icons';
import {BusinessCategory} from '../../../api/business/business.types';

export const getServicePills = () => {
  return [
    {
      label: 'All',
      icon: faBuilding,
      value: null,
    },
    {
      label: 'Barbershop',
      icon: faScissors,
      value: BusinessCategory.Barbershop,
    },
    {
      label: 'Salon',
      icon: faPaintBrush,
      value: BusinessCategory.Salon,
    },
    {
      label: 'Vehicle Repair',
      icon: faCar,
      value: BusinessCategory.VehicleRepair,
    },
  ];
};
