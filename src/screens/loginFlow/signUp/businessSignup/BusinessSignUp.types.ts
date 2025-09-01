import {BusinessCategory} from '../../../../api/business/business.types';

export type BusinessSignUpProps = {
  email?: string;
};

export type BusinessSignUpInput = {
  name: string;
  businessName: string;
  email: string;
  phoneNumber: string;
  address: string;
  openingTime: string;
  closingTime: string;
  workingDays: string[];
  description: string;
  category: BusinessCategory;
};
