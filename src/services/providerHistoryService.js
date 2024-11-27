import { getSession } from "next-auth/react";

const API_URL = "https://webpaymentbackend-production.up.railway.app/api";

const getAuthToken = async () => {
  const session = await getSession();
  return session?.accessToken;
};

export const getProviderHistories = async () => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/providerhistory`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch provider histories");
  return response.json();
};

export const getProviderHistory = async (id) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/providerhistory/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch provider history");
  return response.json();
};

export const createProviderHistory = async (providerHistory) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/providerhistory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(providerHistory),
  });
  if (!response.ok) throw new Error("Failed to create provider history");
  return response.json();
};

export const updateProviderHistory = async (id, providerHistory) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/providerhistory/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(providerHistory),
  });
  if (!response.ok) throw new Error("Failed to update provider history");
  return response.json();
};

export const deleteProviderHistory = async (id) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/providerhistory/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to delete provider history");
  return response.status === 204 ? undefined : response.json();
};
