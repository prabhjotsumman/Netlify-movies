import { useState } from "react";
import { addProducer, Producer } from "../reducers/producerSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

export const useAddProducer = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [showAddProducerForm, setShowAddProducerForm] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [newProducer, setNewProducer] = useState<Producer>({
    name: "",
    dob: "",
    gender: "",
    bio: "",
  });

  const checkValidInput = () => {
    if (
      !newProducer.name ||
      !newProducer.dob ||
      !newProducer.gender ||
      !newProducer.bio
    )
      return false;

    const dob = new Date(newProducer.dob);
    const currentYear = new Date().getFullYear();
    if (
      dob.getFullYear() > currentYear ||
      dob.getFullYear() < 1700 ||
      newProducer.dob.length !== 10
    )
      return false;

    setError(false);
    return true;
  };

  const handleAddProducer = () => {
    if (!checkValidInput()) {
      setError(true);
      return;
    }

    dispatch(addProducer(newProducer));
    setNewProducer({ name: "", dob: "", gender: "", bio: "" });
    setShowAddProducerForm(false);
  };

  return {
    showAddProducerForm,
    setShowAddProducerForm,
    error,
    setError,
    newProducer,
    setNewProducer,
    handleAddProducer,
  };
};
