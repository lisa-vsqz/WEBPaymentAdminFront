"use client";

import React, { useEffect, useState } from "react";
import {
  getProviders,
  createProvider,
  updateProvider,
  deleteProvider,
} from "../../../services/providerService";
import EntityTable from "../../../components/EntityTable";
import EntityForm from "../../../components/EntityForm";

export default function ListProviders() {
  const [providers, setProviders] = useState([]);
  const [formView, setFormView] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const providerFields = [
    { label: "Provider Name", name: "ProviderName", type: "text" },
    { label: "Phone Number", name: "PhoneNumber", type: "text" },
  ];

  const providerColumns = [
    { label: "Provider Name", name: "ProviderName" },
    { label: "Phone Number", name: "PhoneNumber" },
  ];

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    const data = await getProviders();
    setProviders(data);
  };

  const handleCreate = () => {
    setSelectedProvider(null);
    setFormView("create");
  };
  const handleRead = (provider) => {
    setSelectedProvider(provider);
    setFormView("read");
  };
  const handleUpdate = (provider) => {
    setSelectedProvider(provider);
    setFormView("update");
  };
  const handleDelete = async (id) => {
    await deleteProvider(id);
    fetchProviders();
  };
  const handleSave = async (providerData) => {
    formView === "create"
      ? await createProvider(providerData)
      : await updateProvider(selectedProvider.ProviderID, providerData);
    fetchProviders();
    setFormView(null);
  };
  const handleCancel = () => {
    setFormView(null);
    setSelectedProvider(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Providers CRUD</h1>
      <button
        onClick={handleCreate}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Create Provider
      </button>
      {!formView ? (
        <EntityTable
          data={providers}
          columns={providerColumns}
          onRead={handleRead}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ) : (
        <EntityForm
          fields={providerFields}
          initialData={selectedProvider || {}}
          onSave={handleSave}
          onCancel={handleCancel}
          readOnly={formView === "read"}
        />
      )}
    </div>
  );
}
