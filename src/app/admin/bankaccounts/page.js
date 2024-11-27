"use client";

import React, { useEffect, useState } from "react";
import {
  getBankAccounts,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
} from "../../../services/bankAccountService";
import EntityTable from "../../../components/EntityTable";
import EntityForm from "../../../components/EntityForm";

export default function ListBankAccounts() {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [formView, setFormView] = useState(null);
  const [selectedBankAccount, setSelectedBankAccount] = useState(null);

  const bankAccountFields = [
    { label: "Account Name", name: "AccountName", type: "text" },
    { label: "Institution No", name: "InstitutionNo", type: "text" },
    { label: "Branch No", name: "BranchNo", type: "text" },
    { label: "Account No", name: "AccountNo", type: "text" },
    { label: "Balance", name: "Balance", type: "number" },
  ];

  const bankAccountColumns = [
    { label: "Account Name", name: "AccountName" },
    { label: "Institution No", name: "InstitutionNo" },
    { label: "Branch No", name: "BranchNo" },
    { label: "Account No", name: "AccountNo" },
    { label: "Balance", name: "Balance" },
  ];

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  const fetchBankAccounts = async () => {
    const data = await getBankAccounts();
    console.log(data); // Verificar que cada objeto tiene las claves esperadas
    setBankAccounts(data);
  };

  const handleCreate = () => {
    setSelectedBankAccount(null);
    setFormView("create");
  };
  const handleRead = (account) => {
    setSelectedBankAccount(account);
    setFormView("read");
  };
  const handleUpdate = (account) => {
    setSelectedBankAccount(account);
    setFormView("update");
  };
  const handleDelete = async (id) => {
    await deleteBankAccount(id);
    fetchBankAccounts();
  };
  const handleSave = async (accountData) => {
    formView === "create"
      ? await createBankAccount(accountData)
      : await updateBankAccount(selectedBankAccount.BankAccountID, accountData);
    fetchBankAccounts();
    setFormView(null);
  };
  const handleCancel = () => {
    setFormView(null);
    setSelectedBankAccount(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Bank Accounts CRUD</h1>
      <button
        onClick={handleCreate}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Create Account
      </button>
      {!formView ? (
        <EntityTable
          data={bankAccounts}
          columns={bankAccountColumns}
          onRead={handleRead}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ) : (
        <EntityForm
          fields={bankAccountFields}
          initialData={selectedBankAccount || {}}
          onSave={handleSave}
          onCancel={handleCancel}
          readOnly={formView === "read"}
        />
      )}
    </div>
  );
}
