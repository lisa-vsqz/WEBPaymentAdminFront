"use client";

import React, { useEffect, useState } from "react";
import {
  getLiquidityAnalyses,
  createLiquidityAnalysis,
  updateLiquidityAnalysis,
  deleteLiquidityAnalysis,
} from "../../../services/liquidityAnalysisService";
import EntityTable from "../../../components/EntityTable";
import EntityForm from "../../../components/EntityForm";

export default function ListLiquidityAnalysis() {
  const [liquidityAnalysis, setLiquidityAnalysis] = useState([]);
  const [formView, setFormView] = useState(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  const liquidityFields = [
    { label: "Analysis Date", name: "AnalysisDate", type: "date" },
    { label: "Bank Balance", name: "BankBalance", type: "number" },
    { label: "Pending Payments", name: "PendingPayments", type: "number" },
    { label: "Liquidity Status", name: "LiquidityStatus", type: "text" },
    {
      label: "Suggested Payment Date",
      name: "SuggestedPaymentDate",
      type: "date",
    },
  ];

  const liquidityColumns = [
    { label: "Analysis Date", name: "AnalysisDate" },
    { label: "Bank Balance", name: "BankBalance" },
    { label: "Pending Payments", name: "PendingPayments" },
    { label: "Liquidity Status", name: "LiquidityStatus" },
    { label: "Suggested Payment Date", name: "SuggestedPaymentDate" },
  ];

  useEffect(() => {
    fetchLiquidityAnalysis();
  }, []);

  const fetchLiquidityAnalysis = async () => {
    try {
      const data = await getLiquidityAnalyses(); // Usa la función plural para obtener todos los registros
      setLiquidityAnalysis(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching liquidity analyses:", error);
    }
  };

  const handleCreate = () => {
    setSelectedAnalysis(null);
    setFormView("create");
  };
  const handleRead = (analysis) => {
    setSelectedAnalysis(analysis);
    setFormView("read");
  };
  const handleUpdate = (analysis) => {
    setSelectedAnalysis(analysis);
    setFormView("update");
  };
  const handleDelete = async (id) => {
    await deleteLiquidityAnalysis(id);
    fetchLiquidityAnalysis();
  };
  const handleSave = async (analysisData) => {
    formView === "create"
      ? await createLiquidityAnalysis(analysisData)
      : await updateLiquidityAnalysis(
          selectedAnalysis.LiquidityID,
          analysisData
        );
    fetchLiquidityAnalysis();
    setFormView(null);
  };
  const handleCancel = () => {
    setFormView(null);
    setSelectedAnalysis(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Liquidity Analysis CRUD</h1>
      <button
        onClick={handleCreate}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Create Analysis
      </button>
      {!formView ? (
        <EntityTable
          data={liquidityAnalysis}
          columns={liquidityColumns}
          onRead={handleRead}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ) : (
        <EntityForm
          fields={liquidityFields}
          initialData={selectedAnalysis || {}}
          onSave={handleSave}
          onCancel={handleCancel}
          readOnly={formView === "read"}
        />
      )}
    </div>
  );
}
