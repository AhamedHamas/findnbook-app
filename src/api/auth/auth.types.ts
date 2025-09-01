import {AxiosInstance} from 'axios';
import {BusinessData} from '../business/business.types';

export type RequestOTPProps = {
  client: AxiosInstance;
  body: {
    email: string;
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
};

export type RegisterUserProps = {
  client: AxiosInstance;
  body: {
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
  };
};

export type VerifyOTPProps = {
  client: AxiosInstance;
  body: {
    email: string;
    otp: string;
  };
};

export type RegisterBusinessProps = {
  client: AxiosInstance;
  body: {
    name: string;
    email: string;
    phoneNumber: string;
    businessName: string;
    address: string;
    openingTime: string;
    closingTime: string;
    description: string;
    workingDays: string[];
  };
};

export type RegisterBusinessResponse = {
  token: string;
  business: BusinessData & {owner: User};
  user: User;
};
