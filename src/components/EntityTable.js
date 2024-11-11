import React from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const EntityTable = ({ data, columns, onRead, onUpdate, onDelete }) => {
  return (
    <table className="min-w-full bg-white border">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.name} className="py-2 px-4 border">{col.label}</th>
          ))}
          <th className="py-2 px-4 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="text-center">
            {columns.map((col) => (
              <td key={col.name} className="py-2 px-4 border">{row[col.name]}</td>
            ))}
            <td className="py-2 px-4 border flex justify-center space-x-2">
              <button onClick={() => onRead(row)} className="text-blue-500 hover:text-blue-700">
                <FaEye />
              </button>
              <button onClick={() => onUpdate(row)} className="text-green-500 hover:text-green-700">
                <FaEdit />
              </button>
              <button onClick={() => onDelete(row.id)} className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EntityTable;
