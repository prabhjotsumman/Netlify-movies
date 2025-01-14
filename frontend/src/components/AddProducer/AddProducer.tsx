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
  } = useAddProducer();

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
            <input
              type="date"
              value={newProducer.dob}
              onChange={(e) =>
                setNewProducer((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
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
            <textarea
              placeholder="Bio"
              value={newProducer.bio}
              onChange={(e) =>
                setNewProducer((prev) => ({ ...prev, bio: e.target.value }))
              }
            />
            <button
              onClick={handleAddProducer}
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
          {error && <div className="error">{"Please check all Inputs."}</div>}
        </div>
      )}
    </div>
  );
};

export default AddProducer;
