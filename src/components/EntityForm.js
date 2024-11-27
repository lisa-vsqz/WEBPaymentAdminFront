import React, { useState, useEffect } from "react";

const EntityForm = ({
  fields,
  initialData = {}, // Default to an empty object if not provided
  onSave,
  onCancel,
  readOnly = false,
}) => {
  const [formData, setFormData] = useState(() =>
    fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: (initialData || {})[field.name] || "", // Safely access properties
      }),
      {}
    )
  );

  useEffect(() => {
    setFormData(
      fields.reduce(
        (acc, field) => ({
          ...acc,
          [field.name]: (initialData || {})[field.name] || "", // Safely access properties
        }),
        {}
      )
    );
  }, [initialData, fields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!readOnly) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow"
    >
      {fields.map(({ label, name, type, options }) => (
        <div key={name} className="mb-4">
          <label className="block mb-1">{label}</label>
          {type === "select" ? (
            <select
              name={name}
              value={formData[name]}
              onChange={handleChange}
              disabled={readOnly}
              className="w-full px-3 py-2 border rounded"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              disabled={readOnly}
              required
              className="w-full px-3 py-2 border rounded"
            />
          )}
        </div>
      ))}
      <div className="flex justify-end space-x-2">
        {!readOnly && (
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        )}
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          {readOnly ? "Back" : "Cancel"}
        </button>
      </div>
    </form>
  );
};

export default EntityForm;
