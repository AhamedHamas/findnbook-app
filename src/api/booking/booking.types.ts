import {AxiosInstance} from 'axios';

export type CreateBookingProps = {
  client: AxiosInstance;
  body: CreateBookingBody;
};

export type CreateBookingBody = {
  customerId: string;
  businessId: string;
  serviceId: string;
  bookingDate: string;
  bookingTime: string;
};

export type OngoingBookingProps = {
  client: AxiosInstance;
  customerId: string;
};

export enum BookingKeyTypes {
  OngoingBookings = 'OngoingBookings',
  PreviousBookings = 'PreviousBookings',
  GetTodayBookings = 'GetTodayBookings',
  GetUpcomingBookings = 'GetUpcomingBookings',
}

export type BookingResponse = {
  bookingId: string;
  bookingDate: string;
  bookingTime: string;
  status: BookingStatus;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  businessId: string;
  businessName: string;
  businessAddress: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
};

export enum BookingStatus {
  BOOKED = 'BOOKED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  INVALID = 'INVALID',
}

export type GetBookingResponse = BookingResponse[];

export type CancelBookingProps = {
  client: AxiosInstance;
  bookingId: string;
};

export type GetTodaysBookingsProps = {
  client: AxiosInstance;
  businessId: string;
};

export type GetAvailableTimeSlotsProps = {
  client: AxiosInstance;
  body: {
    businessId: string;
    serviceId: string;
    bookingDate: string;
  };
};

export type GetAvailableSlotsResponse = {
  availableSlots: string[];
};
