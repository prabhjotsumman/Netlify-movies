import { useState } from "react";
import { Actor, addActor } from "../reducers/actorSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

export const useAddActor = (onActorAdded?: (actor: Actor) => void) => {
  const dispatch = useDispatch<AppDispatch>();

  const [showAddActorForm, setShowAddActorForm] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const [newActor, setNewActor] = useState<Actor>({
    name: "",
    dob: "",
    gender: "",
    bio: "",
  });

  const checkValidInput = () => {
    if (!newActor.name || !newActor.dob || !newActor.gender || !newActor.bio)
      return false;

    const dob = new Date(newActor.dob);
    const currentYear = new Date().getFullYear();
    if (
      dob.getFullYear() > currentYear ||
      dob.getFullYear() < 1700 ||
      newActor.dob.length !== 10
    )
      return false;

    setError(false);
    return true;
  };

  const handleAddActor = async () => {
    if (!checkValidInput()) {
      setError(true);
      return;
    }

    try {
      const newActorAdded = await dispatch(addActor(newActor)).unwrap();
      if (onActorAdded) {
        onActorAdded(newActorAdded);
      }
      setNewActor({ name: "", dob: "", gender: "", bio: "" });
      setShowAddActorForm(false);
    } catch (err) {
      console.error("Error adding actor:", err);
    }
  };

  return {
    showAddActorForm,
    setShowAddActorForm,
    error,
    newActor,
    setNewActor,
    handleAddActor,
  };
};
