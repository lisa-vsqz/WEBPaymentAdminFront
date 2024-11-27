import { getSession } from "next-auth/react";

const API_URL = "https://webpaymentbackend-production.up.railway.app/api";

const getAuthToken = async () => {
  const session = await getSession();
  return session?.accessToken;
};

export const getLiquidityAnalyses = async () => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/liquidityanalysis`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch liquidity analyses");
  return response.json();
};

export const getLiquidityAnalysis = async (id) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/liquidityanalysis/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch liquidity analysis");
  return response.json();
};

export const createLiquidityAnalysis = async (liquidityAnalysis) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/liquidityanalysis`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(liquidityAnalysis),
  });
  if (!response.ok) throw new Error("Failed to create liquidity analysis");
  return response.json();
};

export const updateLiquidityAnalysis = async (id, liquidityAnalysis) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/liquidityanalysis/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(liquidityAnalysis),
  });
  if (!response.ok) throw new Error("Failed to update liquidity analysis");
  return response.json();
};

export const deleteLiquidityAnalysis = async (id) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}/liquidityanalysis/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to delete liquidity analysis");
  return response.status === 204 ? undefined : response.json();
};
