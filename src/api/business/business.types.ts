import {AxiosInstance} from 'axios';

export type GetAllBusinessesProps = {
  client: AxiosInstance;
  params?: {category: BusinessCategory | null};
};

export enum BusinessCategory {
  Salon = 'Salon',
  Barbershop = 'Barbershop',
  VehicleRepair = 'Vehicle Repair',
}

export enum BusinessKeyTypes {
  AllBusiness = 'AllBusiness',
  ServicesByBusinessId = 'ServicesByBusinessId',
  BusinessByOwnerId = 'BusinessByOwnerId',
  BusinessDashboard = 'BusinessDashboard',
}

export type GetAllBusinessResponse = BusinessData[];

export type BusinessData = {
  id: string;
  name: string;
  address: string;
  description: string;
  openingTime: string;
  closingTime: string;
  workingDays: string[];
  category: BusinessCategory;
  ownerName: string;
  ownerEmail: string;
  services: BusinessService[];
};

export type BusinessService = {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  businessId: string;
  businessName: string;
};

export type AddBusinessServiceProps = {
  client: AxiosInstance;
  body: AddServicePayload;
};

export type AddServicePayload = {
  name: string;
  price: number;
  durationMinutes: number;
  businessId: string;
};

export type GetServicesByBusinessIdProps = {
  client: AxiosInstance;
  businessId: string;
};

export type GetServicesByBusinessResponse = BusinessService[];

export type DeleteServiceByIdProps = {
  client: AxiosInstance;
  serviceId: string;
};

export type DeleteServiceByIdResponse = {
  success: boolean;
  message: string;
};

export type GetBusinessByOwnerIdProps = {
  client: AxiosInstance;
  ownerId: string;
};

export type GetBusinessByOwnerIdResponse = BusinessData;

export type GetBusinessDashboardDataProps = {
  client: AxiosInstance;
  businessId: string;
};

export type GetBusinessDashboardResponse = {
  completedOrders: number;
  totalRevenue: number;
  pendingOrders: number;
};
