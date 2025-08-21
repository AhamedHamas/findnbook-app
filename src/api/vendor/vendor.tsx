import {useQuery} from '@tanstack/react-query';
import {AxiosInstance} from 'axios';

const getAllVendorTypes = async (client: AxiosInstance) => {
  try {
    const response = await client.get('/vendor-types');
    return response.data;
  } catch (error) {
    console.error('Error fetching vendor types:', error);
    throw error;
  }
};

export const useGetAllVendorTypes = (client: AxiosInstance) => {
  return useQuery({
    queryKey: ['vendorTypes'],
    queryFn: () => getAllVendorTypes(client),
  });
};
