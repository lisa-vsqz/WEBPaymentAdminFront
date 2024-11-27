"use client";

import React, { useEffect, useState } from "react";
import {
  getInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "../../../services/invoiceService";
import EntityTable from "../../../components/EntityTable";
import EntityForm from "../../../components/EntityForm";

export default function ListInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [formView, setFormView] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const invoiceFields = [
    { label: "Provider ID", name: "ProviderID", type: "number" },
    { label: "Invoice Number", name: "InvoiceNumber", type: "text" },
    { label: "Due Date", name: "DueDate", type: "date" },
    { label: "Total Amount", name: "TotalAmount", type: "number" },
    { label: "Amount Paid", name: "AmountPaid", type: "number" },
    { label: "Payment Status", name: "PaymentStatus", type: "text" },
  ];

  const invoiceColumns = [
    { label: "Provider ID", name: "ProviderID" },
    { label: "Invoice Number", name: "InvoiceNumber" },
    { label: "Due Date", name: "DueDate" },
    { label: "Total Amount", name: "TotalAmount" },
    { label: "Amount Paid", name: "AmountPaid" },
    { label: "Payment Status", name: "PaymentStatus" },
  ];

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    const data = await getInvoices();
    setInvoices(data);
  };

  const handleCreate = () => {
    setSelectedInvoice(null);
    setFormView("create");
  };
  const handleRead = (invoice) => {
    setSelectedInvoice(invoice);
    setFormView("read");
  };
  const handleUpdate = (invoice) => {
    setSelectedInvoice(invoice);
    setFormView("update");
  };
  const handleDelete = async (id) => {
    await deleteInvoice(id);
    fetchInvoices();
  };
  const handleSave = async (invoiceData) => {
    formView === "create"
      ? await createInvoice(invoiceData)
      : await updateInvoice(selectedInvoice.InvoiceID, invoiceData);
    fetchInvoices();
    setFormView(null);
  };
  const handleCancel = () => {
    setFormView(null);
    setSelectedInvoice(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Invoices CRUD</h1>
      <button
        onClick={handleCreate}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Create Invoice
      </button>
      {!formView ? (
        <EntityTable
          data={invoices}
          columns={invoiceColumns}
          onRead={handleRead}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ) : (
        <EntityForm
          fields={invoiceFields}
          initialData={selectedInvoice || {}}
          onSave={handleSave}
          onCancel={handleCancel}
          readOnly={formView === "read"}
        />
      )}
    </div>
  );
}
