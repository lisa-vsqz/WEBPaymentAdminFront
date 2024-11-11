"use client";

import React, { useEffect, useState } from 'react';
import { getPayments, createPayment, updatePayment, deletePayment } from '../../services/paymentService';
import EntityTable from '../../components/EntityTable';
import EntityForm from '../../components/EntityForm';

export default function ListPayments() {
  const [payments, setPayments] = useState([]);
  const [formView, setFormView] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const paymentFields = [
    { label: 'Bank Account ID', name: 'BankAccountID', type: 'number' },
    { label: 'Payment Date', name: 'PaymentDate', type: 'date' },
    { label: 'Amount Paid', name: 'AmountPaid', type: 'number' },
    { label: 'Provider ID', name: 'ProviderID', type: 'number' },
    { label: 'Invoice ID', name: 'InvoiceID', type: 'number' },
    { label: 'Payment Notification', name: 'PaymentNotification', type: 'checkbox' },
  ];
  
  const paymentColumns = [
    { label: 'Bank Account ID', name: 'BankAccountID' },
    { label: 'Payment Date', name: 'PaymentDate' },
    { label: 'Amount Paid', name: 'AmountPaid' },
    { label: 'Provider ID', name: 'ProviderID' },
    { label: 'Invoice ID', name: 'InvoiceID' },
    { label: 'Payment Notification', name: 'PaymentNotification' },
  ];
  
  useEffect(() => { fetchPayments(); }, []);

  const fetchPayments = async () => {
    const data = await getPayments();
    setPayments(data);
  };

  const handleCreate = () => { setSelectedPayment(null); setFormView("create"); };
  const handleRead = (payment) => { setSelectedPayment(payment); setFormView("read"); };
  const handleUpdate = (payment) => { setSelectedPayment(payment); setFormView("update"); };
  const handleDelete = async (id) => { await deletePayment(id); fetchPayments(); };
  const handleSave = async (paymentData) => { formView === "create" ? await createPayment(paymentData) : await updatePayment(selectedPayment.PaymentID, paymentData); fetchPayments(); setFormView(null); };
  const handleCancel = () => { setFormView(null); setSelectedPayment(null); };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Payments CRUD</h1>
      <button onClick={handleCreate} className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Create Payment</button>
      {!formView ? (
        <EntityTable data={payments} columns={paymentColumns} onRead={handleRead} onUpdate={handleUpdate} onDelete={handleDelete} />
      ) : (
        <EntityForm fields={paymentFields} initialData={selectedPayment} onSave={handleSave} onCancel={handleCancel} readOnly={formView === "read"} />
      )}
    </div>
  );
}
