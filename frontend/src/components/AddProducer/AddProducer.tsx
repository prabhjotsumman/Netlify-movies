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
        aria-expanded={showAddProducerForm}
        aria-controls="producer-form"
      >
        Add New Producer
      </button>

      {showAddProducerForm && (
        <div id="producer-form" className="producer-form">
          <div className="form-row">
            <label htmlFor="producer-name">Name</label>
            <input
              id="producer-name"
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
              aria-required="true"
            />
            {errors.name && <div className="error-input">{errors.name}</div>}

            <label htmlFor="producer-dob">Date of Birth</label>
            <input
              id="producer-dob"
              type="date"
              value={newProducer.dob}
              onChange={(e) =>
                setNewProducer((prev) => ({ ...prev, dob: e.target.value }))
              }
              aria-required="true"
            />
            {errors.dob && <div className="error-input">{errors.dob}</div>}

            <label htmlFor="producer-gender">Gender</label>
            <select
              id="producer-gender"
              value={newProducer.gender}
              onChange={(e) =>
                setNewProducer((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }))
              }
              aria-required="true"
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

            <label htmlFor="producer-bio">Bio</label>
            <textarea
              id="producer-bio"
              placeholder="Bio"
              value={newProducer.bio}
              onChange={(e) =>
                setNewProducer((prev) => ({ ...prev, bio: e.target.value }))
              }
              aria-required="true"
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
