"use client";

import React, { useEffect, useState } from 'react';
import { getProviderHistories, createProviderHistory, updateProviderHistory, deleteProviderHistory } from '../../services/providerHistoryService';
import EntityTable from '../../components/EntityTable';
import EntityForm from '../../components/EntityForm';

export default function ListProviderHistory() {
  const [providerHistory, setProviderHistory] = useState([]);
  const [formView, setFormView] = useState(null);
  const [selectedHistory, setSelectedHistory] = useState(null);

  const providerHistoryFields = [
    { label: 'Provider ID', name: 'ProviderID', type: 'number' },
    { label: 'Total Paid', name: 'TotalPaid', type: 'number' },
    { label: 'Payments Count', name: 'PaymentsCount', type: 'number' },
  ];
  
  const providerHistoryColumns = [
    { label: 'Provider ID', name: 'ProviderID' },
    { label: 'Total Paid', name: 'TotalPaid' },
    { label: 'Payments Count', name: 'PaymentsCount' },
  ];
  

  useEffect(() => { fetchProviderHistory(); }, []);

  const fetchProviderHistory = async () => {
    try {
      const data = await getProviderHistories(); // Usa la función plural para obtener todos los registros
      setProviderHistory(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching provider histories:", error);
    }
  };
  

  const handleCreate = () => { setSelectedHistory(null); setFormView("create"); };
  const handleRead = (history) => { setSelectedHistory(history); setFormView("read"); };
  const handleUpdate = (history) => { setSelectedHistory(history); setFormView("update"); };
  const handleDelete = async (id) => { await deleteProviderHistory(id); fetchProviderHistory(); };
  const handleSave = async (historyData) => { formView === "create" ? await createProviderHistory(historyData) : await updateProviderHistory(selectedHistory.ProviderHistoryID, historyData); fetchProviderHistory(); setFormView(null); };
  const handleCancel = () => { setFormView(null); setSelectedHistory(null); };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Provider History CRUD</h1>
      <button onClick={handleCreate} className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Add History</button>
      {!formView ? (
        <EntityTable data={providerHistory} columns={providerHistoryColumns} onRead={handleRead} onUpdate={handleUpdate} onDelete={handleDelete} />
      ) : (
        <EntityForm fields={providerHistoryFields} initialData={selectedHistory} onSave={handleSave} onCancel={handleCancel} readOnly={formView === "read"} />
      )}
    </div>
  );
}
