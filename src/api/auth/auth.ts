import {useMutation, UseMutationOptions} from '@tanstack/react-query';
import {
  RegisterBusinessProps,
  RegisterBusinessResponse,
  RegisterUserProps,
  RequestOTPProps,
  VerifyOTPProps,
} from './auth.types';
import {AxiosError} from 'axios';

const requestOTP = ({client, body}: RequestOTPProps) =>
  client.post<any>('auth/request-otp', body).then(({data}) => data);

export const useRequestOTP = (
  options?:
    | UseMutationOptions<any, AxiosError, RequestOTPProps, unknown>
    | undefined,
) => useMutation({...options, mutationFn: requestOTP});

const registerUser = ({client, body}: RegisterUserProps) =>
  client.post<any>('auth/signup', body).then(({data}) => data);

export const useRegisterUser = (
  options?:
    | UseMutationOptions<any, AxiosError, RegisterUserProps, unknown>
    | undefined,
) => useMutation({...options, mutationFn: registerUser});

const verifyOTP = ({client, body}: VerifyOTPProps) =>
  client.post<any>('auth/verify-otp', body).then(({data}) => data);

export const useVerifyOTP = (
  options?:
    | UseMutationOptions<any, AxiosError, VerifyOTPProps, unknown>
    | undefined,
) => useMutation({...options, mutationFn: verifyOTP});

const registerBusiness = ({client, body}: RegisterBusinessProps) => {
  return client
    .post<RegisterBusinessResponse>('auth/signup-owner', body)
    .then(({data}) => data);
};

export const useRegisterBusiness = (
  options?:
    | UseMutationOptions<
        RegisterBusinessResponse,
        AxiosError,
        RegisterBusinessProps,
        unknown
      >
    | undefined,
) => useMutation({...options, mutationFn: registerBusiness});
