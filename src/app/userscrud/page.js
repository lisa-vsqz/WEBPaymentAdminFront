"use client"

import React, { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../../services/userService';
import EntityTable from '../../components/EntityTable';
import EntityForm from '../../components/EntityForm';
import { useSession } from "next-auth/react";
import LogoutButton from '../../components/LogoutButton';
import useAuthRedirect from "../../../hooks/useAuthRedirect"; // Import the custom hook
import { useRouter } from 'next/navigation';

export default function ListUsers() {
  useAuthRedirect(); // Protect this page based on user role
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [formView, setFormView] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: session, status } = useSession();

  // Campos y columnas específicos para la entidad de usuarios
  const userFields = [
    { label: 'First Name', name: 'firstName', type: 'text' },
    { label: 'Last Name', name: 'lastName', type: 'text' },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Phone', name: 'phoneNumber', type: 'text' },
    { label: 'Password', name: 'password', type: 'password' },
    { label: 'Role', name: 'role', type: 'select', options: [{ value: 'admin', label: 'Admin' }, { value: 'client', label: 'Client' }] },
  ];

  const userColumns = [
    { label: 'First Name', name: 'firstName' },
    { label: 'Last Name', name: 'lastName' },
    { label: 'Email', name: 'email' },
    { label: 'Phone', name: 'phoneNumber' },
    { label: 'Role', name: 'role' },
  ];

  useEffect(() => {
    if (status === "loading") return; // Wait until session is loaded
    if (session) {
      fetchUsers();
    }
  }, [session]);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error("Expected an array but got:", data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Error al obtener los usuarios.");
    }
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setFormView("create");
  };

  const handleRead = (user) => {
    setSelectedUser(user);
    setFormView("read");
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setFormView("update");
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleSave = async (userData) => {
    try {
      if (formView === "create") {
        await createUser(userData);
      } else if (formView === "update" && selectedUser) {
        await updateUser(selectedUser.id, userData);
      }
      setFormView(null);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleCancel = () => {
    setFormView(null);
    setSelectedUser(null);
  };

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Users CRUD</h1>
      <LogoutButton />
      <button onClick={() => router.push('/bankaccounts')} className="mb-4 ml-4 px-4 py-2 bg-[#165585] text-white rounded hover:bg-blue-800">Bank Accounts</button>
      <button onClick={() => router.push('/providers')} className="mb-4 ml-4 px-4 py-2 bg-[#165585] text-white rounded hover:bg-blue-800">Providers</button>
      <button onClick={() => router.push('/invoices')} className="mb-4 ml-4 px-4 py-2 bg-[#165585] text-white rounded hover:bg-blue-800">Invoices</button>
      <button onClick={() => router.push('/payments')} className="mb-4 ml-4 px-4 py-2 bg-[#165585] text-white rounded hover:bg-blue-800">Payments</button>
      <button onClick={() => router.push('/providerhistory')} className="mb-4 ml-4 px-4 py-2 bg-[#165585] text-white rounded hover:bg-blue-800">Provider History</button>
      <button onClick={() => router.push('/liquidityanalysis')} className="mb-4 ml-4 mr-4 px-4 py-2 bg-[#165585] text-white rounded hover:bg-blue-800">Liquidity Analysis</button>

      {!formView && (
        <>
          <button 
            onClick={handleCreate} 
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Create User
          </button>
          <EntityTable 
            data={users} 
            columns={userColumns} 
            onRead={handleRead} 
            onUpdate={handleUpdate} 
            onDelete={handleDelete} 
          />
        </>
      )}
      {formView && (
        <EntityForm 
          fields={userFields} 
          initialData={selectedUser} 
          onSave={handleSave} 
          onCancel={handleCancel} 
          readOnly={formView === "read"}
        />
      )}
    </div>
  );
}
