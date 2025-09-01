import {useMutation, UseMutationOptions, useQuery} from '@tanstack/react-query';
import {
  BookingKeyTypes,
  BookingResponse,
  CancelBookingProps,
  CreateBookingProps,
  GetAvailableSlotsResponse,
  GetAvailableTimeSlotsProps,
  GetBookingResponse,
  GetTodaysBookingsProps,
  OngoingBookingProps,
} from './booking.types';
import {AxiosError} from 'axios';

const createBooking = ({client, body}: CreateBookingProps) => {
  return client.post<any>('/booking', body).then(({data}) => data);
};

export const useCreateBooking = (
  options?:
    | UseMutationOptions<any, AxiosError, CreateBookingProps, unknown>
    | undefined,
) => useMutation({...options, mutationFn: createBooking});

const getOngoingBookings = ({client, customerId}: OngoingBookingProps) => {
  return client
    .get<GetBookingResponse>(`/booking/customer/${customerId}/ongoing`)
    .then(({data}) => data);
};

export const useGetOngoingBookings = ({
  client,
  customerId,
}: OngoingBookingProps) => {
  return useQuery({
    queryKey: [BookingKeyTypes.OngoingBookings, customerId],
    queryFn: () => getOngoingBookings({client, customerId}),
  });
};

const getPreviousBookings = ({client, customerId}: OngoingBookingProps) => {
  return client
    .get<GetBookingResponse>(`/booking/customer/${customerId}/previous`)
    .then(({data}) => data);
};

export const useGetPreviousBookings = ({
  client,
  customerId,
}: OngoingBookingProps) => {
  return useQuery({
    queryKey: [BookingKeyTypes.PreviousBookings, customerId],
    queryFn: () => getPreviousBookings({client, customerId}),
  });
};

const cancelBooking = ({client, bookingId}: CancelBookingProps) => {
  return client
    .put<BookingResponse>(`/booking/${bookingId}/cancel`)
    .then(({data}) => data);
};

export const useCancelBooking = (
  options?:
    | UseMutationOptions<
        BookingResponse,
        AxiosError,
        CancelBookingProps,
        unknown
      >
    | undefined,
) => useMutation({...options, mutationFn: cancelBooking});

const getTodaysBookings = ({client, businessId}: GetTodaysBookingsProps) => {
  return client
    .get<GetBookingResponse>(`/booking/today/${businessId}`)
    .then(({data}) => data);
};

export const useGetTodaysBookings = ({
  client,
  businessId,
}: GetTodaysBookingsProps) => {
  return useQuery({
    queryKey: [BookingKeyTypes.GetTodayBookings, businessId],
    queryFn: () => getTodaysBookings({client, businessId}),
    enabled: !!businessId,
  });
};

const getUpcomingBookings = ({client, businessId}: GetTodaysBookingsProps) => {
  return client
    .get<GetBookingResponse>(`/booking/booked/${businessId}`)
    .then(({data}) => data);
};

export const useGetUpcomingBookings = ({
  client,
  businessId,
}: GetTodaysBookingsProps) => {
  return useQuery({
    queryKey: [BookingKeyTypes.GetUpcomingBookings, businessId],
    queryFn: () => getUpcomingBookings({client, businessId}),
    enabled: !!businessId,
  });
};

const getAvailableTimeSlots = ({client, body}: GetAvailableTimeSlotsProps) => {
  return client
    .post<GetAvailableSlotsResponse>(`/booking/available-slots`, body)
    .then(({data}) => data);
};

export const useGetAvailableTimeSlots = (
  options?:
    | UseMutationOptions<
        GetAvailableSlotsResponse,
        AxiosError,
        GetAvailableTimeSlotsProps,
        unknown
      >
    | undefined,
) => useMutation({...options, mutationFn: getAvailableTimeSlots});
