import axios from 'axios';

const token = btoa(
  `${process.env.BASIC_AUTH_USERNAME}:${process.env.BASIC_AUTH_PASSWORD}`,
);

export const createAxiosClient = () => {
  const client = axios.create({
    baseURL: process.env.FINDNBOOK_APP_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`,
    },
  });

  return client;
};
