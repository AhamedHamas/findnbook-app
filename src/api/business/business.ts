import {useMutation, UseMutationOptions, useQuery} from '@tanstack/react-query';
import {
  AddBusinessServiceProps,
  BusinessKeyTypes,
  DeleteServiceByIdProps,
  DeleteServiceByIdResponse,
  GetAllBusinessesProps,
  GetAllBusinessResponse,
  GetBusinessByOwnerIdProps,
  GetBusinessByOwnerIdResponse,
  GetBusinessDashboardDataProps,
  GetBusinessDashboardResponse,
  GetServicesByBusinessIdProps,
  GetServicesByBusinessResponse,
} from './business.types';
import {AxiosError} from 'axios';

const getAllBusinesses = ({client, params}: GetAllBusinessesProps) =>
  client
    .get<GetAllBusinessResponse>('/businesses', {params})
    .then(({data}) => data);

export const useGetAllBusinesses = ({
  client,
  params,
}: GetAllBusinessesProps) => {
  return useQuery({
    queryKey: [BusinessKeyTypes.AllBusiness, params],
    queryFn: () => getAllBusinesses({client, params}),
  });
};

const addBusinessService = ({client, body}: AddBusinessServiceProps) => {
  return client.post('/services', body).then(({data}) => data);
};

export const useAddBusinesService = (
  options?:
    | UseMutationOptions<any, AxiosError, AddBusinessServiceProps, unknown>
    | undefined,
) => useMutation({...options, mutationFn: addBusinessService});

const getServicesByBusinessId = ({
  client,
  businessId,
}: GetServicesByBusinessIdProps) => {
  return client
    .get<GetServicesByBusinessResponse>(`/services/${businessId}`)
    .then(({data}) => data);
};

export const useGetServicesByBusinessId = ({
  client,
  businessId,
}: GetServicesByBusinessIdProps) => {
  return useQuery({
    queryKey: [BusinessKeyTypes.ServicesByBusinessId, businessId],
    queryFn: () => getServicesByBusinessId({client, businessId}),
  });
};

const deleteServiceById = ({client, serviceId}: DeleteServiceByIdProps) => {
  return client
    .delete<DeleteServiceByIdResponse>(`/services/${serviceId}`)
    .then(({data}) => data);
};

export const useDeleteServiceById = (
  options?:
    | UseMutationOptions<
        DeleteServiceByIdResponse,
        AxiosError,
        DeleteServiceByIdProps,
        unknown
      >
    | undefined,
) => useMutation({...options, mutationFn: deleteServiceById});

const getBusinessByOwnerId = ({client, ownerId}: GetBusinessByOwnerIdProps) => {
  return client
    .get<GetBusinessByOwnerIdResponse>(`/businesses/owner/${ownerId}`)
    .then(({data}) => data);
};

export const useGetBusinessByOwnerId = ({
  client,
  ownerId,
}: GetBusinessByOwnerIdProps) => {
  return useQuery({
    queryKey: [BusinessKeyTypes.BusinessByOwnerId, ownerId],
    queryFn: () => getBusinessByOwnerId({client, ownerId}),
  });
};

const getBusinessDashboardData = ({
  client,
  businessId,
}: GetBusinessDashboardDataProps) => {
  return client
    .get<GetBusinessDashboardResponse>(`/dashboard/business/${businessId}`)
    .then(({data}) => data);
};

export const useGetBusinessDashboardData = ({
  client,
  businessId,
}: GetBusinessDashboardDataProps) => {
  return useQuery({
    queryKey: [BusinessKeyTypes.BusinessDashboard, businessId],
    queryFn: () => getBusinessDashboardData({client, businessId}),
    enabled: !!businessId,
  });
};
