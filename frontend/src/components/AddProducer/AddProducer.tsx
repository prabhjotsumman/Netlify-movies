import React from "react";
import { useAddProducer } from "../../hooks/useAddProducer";
import "./AddProducer.css";

const AddProducer = () => {
  const {
    showAddProducerForm,
    setShowAddProducerForm,
    error,
    newProducer,
    setNewProducer,
    handleAddProducer,
    errors,
    validateFields,
  } = useAddProducer();

  const handleSaveProducer = () => {
    if (validateFields()) {
      handleAddProducer();
    }
  };

  return (
    <div>
      <button
        type="button"
        className="add-producer-btn btn-secondary"
        onClick={() => setShowAddProducerForm((prev) => !prev)}
      >
        Add New Producer
      </button>

      {showAddProducerForm && (
        <div className="producer-form">
          <div className="form-row">
            <input
              type="text"
              placeholder="Name"
              pattern="[A-Za-z\s]*"
              value={newProducer.name}
              onChange={(e) =>
                setNewProducer((prev) => ({ ...prev, name: e.target.value }))
              }
              onInput={(e) =>
                (e.currentTarget.value = e.currentTarget.value.replace(
                  /[^A-Za-z\s]/g,
                  ""
                ))
              }
            />
            {errors.name && <div className="error-input">{errors.name}</div>}
            <input
              type="date"
              value={newProducer.dob}
              onChange={(e) =>
                setNewProducer((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
            {errors.dob && <div className="error-input">{errors.dob}</div>}
            <select
              value={newProducer.gender}
              onChange={(e) =>
                setNewProducer((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }))
              }
            >
              <option value="" disabled>
                Gender
              </option>
              <option>Male</option>
              <option>Female</option>
            </select>
            {errors.gender && (
              <div className="error-input">{errors.gender}</div>
            )}
            <textarea
              placeholder="Bio"
              value={newProducer.bio}
              onChange={(e) =>
                setNewProducer((prev) => ({ ...prev, bio: e.target.value }))
              }
            />
            {errors.bio && <div className="error-input">{errors.bio}</div>}
            <button
              onClick={handleSaveProducer}
              className="save-button"
              disabled={
                !newProducer.name ||
                !newProducer.dob ||
                !newProducer.gender ||
                !newProducer.bio
              }
            >
              Save Producer
            </button>
          </div>
          {error && (
            <div className="error-input">{"Please check all Inputs."}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddProducer;
