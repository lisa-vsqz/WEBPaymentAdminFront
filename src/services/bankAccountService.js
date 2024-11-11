import { getSession } from 'next-auth/react';

const API_URL = "http://localhost:5000/api";

const getAuthToken = async () => {
  const session = await getSession();
  return session?.accessToken;
};

export const getBankAccounts = async () => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/bankaccounts`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch bank accounts');
  return response.json();
};

export const getBankAccount = async (id) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/bankaccounts/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch bank account');
  return response.json();
};

export const createBankAccount = async (bankAccount) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/bankaccounts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(bankAccount),
  });
  if (!response.ok) throw new Error('Failed to create bank account');
  return response.json();
};

export const updateBankAccount = async (id, bankAccount) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/bankaccounts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(bankAccount),
  });
  if (!response.ok) throw new Error('Failed to update bank account');
  return response.json();
};

export const deleteBankAccount = async (id) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/bankaccounts/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to delete bank account');
  return response.status === 204 ? undefined : response.json();
};
