import axios from 'axios';
import {store} from '../store/store';

type createAxiosClientProps = {
  isFormData?: boolean;
};

export const createAxiosClient = ({
  isFormData = false,
}: createAxiosClientProps) => {
  const state = store.getState();
  const token = state.auth?.token;

  const headers: Record<string, string> = {};

  if (isFormData) {
    headers['Content-Type'] = 'multipart/form-data';
  } else {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return axios.create({
    baseURL: process.env.FINDNBOOK_APP_API_URL,
    headers,
  });
};
