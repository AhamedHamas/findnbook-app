import {useMutation, UseMutationOptions} from '@tanstack/react-query';
import {uploadImageProps} from './uploadImage.types';
import {AxiosError} from 'axios';

const uploadImage = ({client, file}: uploadImageProps) => {
  const formData = new FormData();
  formData.append('file', file as any);

  return client
    .post<any>('/upload/public/business-logo', formData)
    .then(({data}) => data);
};

export const useUploadImage = (
  options?:
    | UseMutationOptions<any, AxiosError, uploadImageProps, unknown>
    | undefined,
) => useMutation({...options, mutationFn: uploadImage});
