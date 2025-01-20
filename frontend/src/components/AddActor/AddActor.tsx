import React from "react";
import { useAddActor } from "../../hooks";
import { Actor } from "../../reducers/actorSlice";

import "./AddActor.css";

const AddActor: React.FC<{ onActorAdded?: (actor: Actor) => void }> = ({
  onActorAdded,
}) => {
  const {
    showAddActorForm,
    setShowAddActorForm,
    error,
    newActor,
    setNewActor,
    handleAddActor,
    inputErrors,
    validateInputs,
  } = useAddActor(onActorAdded);

  const handleSaveActor = () => {
    if (validateInputs()) {
      handleAddActor();
    }
  };

  return (
    <div>
      <button
        type="button"
        className="add-actor-btn btn-secondary"
        onClick={() => setShowAddActorForm((prev) => !prev)}
        aria-expanded={showAddActorForm}
        aria-controls="actor-form"
      >
        Add New Actor
      </button>

      {showAddActorForm && (
        <div id="actor-form" className="actor-form">
          <div className="form-row">
            <label htmlFor="actor-name">Name</label>
            <input
              id="actor-name"
              type="text"
              placeholder="Name"
              pattern="[A-Za-z\s]*"
              value={newActor.name}
              onChange={(e) =>
                setNewActor((prev) => ({ ...prev, name: e.target.value }))
              }
              onInput={(e) =>
                (e.currentTarget.value = e.currentTarget.value.replace(
                  /[^A-Za-z\s]/g,
                  ""
                ))
              }
              aria-invalid={!!inputErrors.name}
              aria-describedby="name-error"
            />
            {inputErrors.name && (
              <div id="name-error" className="error-input">
                {inputErrors.name}
              </div>
            )}

            <label htmlFor="actor-dob">Date of Birth</label>
            <input
              id="actor-dob"
              type="date"
              value={newActor.dob}
              onChange={(e) =>
                setNewActor((prev) => ({ ...prev, dob: e.target.value }))
              }
              aria-invalid={!!inputErrors.dob}
              aria-describedby="dob-error"
            />
            {inputErrors.dob && (
              <div id="dob-error" className="error-input">
                {inputErrors.dob}
              </div>
            )}

            <label htmlFor="actor-gender">Gender</label>
            <select
              id="actor-gender"
              value={newActor.gender}
              onChange={(e) =>
                setNewActor((prev) => ({ ...prev, gender: e.target.value }))
              }
              aria-invalid={!!inputErrors.gender}
              aria-describedby="gender-error"
            >
              <option value="" disabled>
                Gender
              </option>
              <option>Male</option>
              <option>Female</option>
            </select>
            {inputErrors.gender && (
              <div id="gender-error" className="error-input">
                {inputErrors.gender}
              </div>
            )}

            <label htmlFor="actor-bio">Bio</label>
            <textarea
              id="actor-bio"
              placeholder="Bio"
              value={newActor.bio}
              onChange={(e) =>
                setNewActor((prev) => ({ ...prev, bio: e.target.value }))
              }
              aria-invalid={!!inputErrors.bio}
              aria-describedby="bio-error"
            />
            {inputErrors.bio && (
              <div id="bio-error" className="error-input">
                {inputErrors.bio}
              </div>
            )}

            <button
              onClick={handleSaveActor}
              disabled={
                !newActor.name ||
                !newActor.dob ||
                !newActor.gender ||
                !newActor.bio
              }
            >
              Save Actor
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

export default AddActor;
