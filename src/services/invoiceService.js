import { getSession } from 'next-auth/react';

const API_URL = "http://localhost:5000/api";

const getAuthToken = async () => {
  const session = await getSession();
  return session?.accessToken;
};

export const getInvoices = async () => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/invoices`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch invoices');
  return response.json();
};

export const getInvoice = async (id) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/invoices/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch invoice');
  return response.json();
};

export const createInvoice = async (invoice) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/invoices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(invoice),
  });
  if (!response.ok) throw new Error('Failed to create invoice');
  return response.json();
};

export const updateInvoice = async (id, invoice) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/invoices/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(invoice),
  });
  if (!response.ok) throw new Error('Failed to update invoice');
  return response.json();
};

export const deleteInvoice = async (id) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/invoices/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to delete invoice');
  return response.status === 204 ? undefined : response.json();
};
