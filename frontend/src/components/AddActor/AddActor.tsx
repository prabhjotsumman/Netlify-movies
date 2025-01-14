import React from "react";
import { useAddActor } from "../../hooks/useAddActor";
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
  } = useAddActor(onActorAdded);

  return (
    <div>
      <button
        type="button"
        className="add-actor-btn btn-secondary"
        onClick={() => setShowAddActorForm((prev) => !prev)}
      >
        Add New Actor
      </button>

      {showAddActorForm && (
        <div className="actor-form">
          <div className="form-row">
            <input
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
            />
            <input
              type="date"
              value={newActor.dob}
              onChange={(e) =>
                setNewActor((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
            <select
              value={newActor.gender}
              onChange={(e) =>
                setNewActor((prev) => ({ ...prev, gender: e.target.value }))
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
              value={newActor.bio}
              onChange={(e) =>
                setNewActor((prev) => ({ ...prev, bio: e.target.value }))
              }
            />
            <button
              onClick={handleAddActor}
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
          {error && <div className="error">{"Please check all Inputs."}</div>}
        </div>
      )}
    </div>
  );
};

export default AddActor;
