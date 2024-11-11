import { getSession } from 'next-auth/react';

const API_URL = "http://localhost:5000/api";

const getAuthToken = async () => {
  const session = await getSession();
  return session?.accessToken;
};

export const getProviders = async () => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/providers`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch providers');
  return response.json();
};

export const getProvider = async (id) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/providers/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch provider');
  return response.json();
};

export const createProvider = async (provider) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/providers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(provider),
  });
  if (!response.ok) throw new Error('Failed to create provider');
  return response.json();
};

export const updateProvider = async (id, provider) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/providers/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(provider),
  });
  if (!response.ok) throw new Error('Failed to update provider');
  return response.json();
};

export const deleteProvider = async (id) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/providers/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to delete provider');
  return response.status === 204 ? undefined : response.json();
};
