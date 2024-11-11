import { getSession } from 'next-auth/react';

const API_URL = "http://localhost:5000/api";

const getAuthToken = async () => {
  const session = await getSession();
  return session?.accessToken;
};

export const getPayments = async () => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/payments`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch payments');
  return response.json();
};

export const getPayment = async (id) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/payments/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch payment');
  return response.json();
};

export const createPayment = async (payment) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payment),
  });
  if (!response.ok) throw new Error('Failed to create payment');
  return response.json();
};

export const updatePayment = async (id, payment) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/payments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payment),
  });
  if (!response.ok) throw new Error('Failed to update payment');
  return response.json();
};

export const deletePayment = async (id) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/payments/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to delete payment');
  return response.status === 204 ? undefined : response.json();
};
