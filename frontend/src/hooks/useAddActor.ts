import { useState } from "react";
import { Actor, addActor } from "../reducers/actorSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

const useAddActor = (onActorAdded?: (actor: Actor) => void) => {
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

  const [inputErrors, setInputErrors] = useState({
    name: "",
    dob: "",
    gender: "",
    bio: "",
  });

  const validateInputs = () => {
    const errors = {
      name: "",
      dob: "",
      gender: "",
      bio: "",
    };

    if (!newActor.name) errors.name = "Name is required.";
    if (newActor.name.length > 20)
      errors.name = "Name should not be greater than 20 characters.";
    if (!newActor.dob) errors.dob = "Date of birth is required.";
    if (!newActor.gender) errors.gender = "Gender is required.";
    if (!newActor.bio) errors.bio = "Bio is required.";
    if (newActor.bio.length > 50)
      errors.name = "Bio should not be greater than 50 characters.";

    setInputErrors(errors);

    return !errors.name && !errors.dob && !errors.gender && !errors.bio;
  };

  return {
    showAddActorForm,
    setShowAddActorForm,
    error,
    newActor,
    setNewActor,
    handleAddActor,
    inputErrors,
    setInputErrors,
    validateInputs,
  };
};

export default useAddActor;