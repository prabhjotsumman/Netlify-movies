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

  const [errors, setErrors] = useState({
    name: "",
    dob: "",
    gender: "",
    bio: "",
  });

  const validateFields = () => {
    let isValid = true;
    const newErrors = { name: "", dob: "", gender: "", bio: "" };

    if (!newProducer.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!newProducer.dob) {
      newErrors.dob = "Date of Birth is required.";
      isValid = false;
    }

    if (!newProducer.gender) {
      newErrors.gender = "Gender is required.";
      isValid = false;
    }

    if (!newProducer.bio) {
      newErrors.bio = "Bio is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return {
    showAddProducerForm,
    setShowAddProducerForm,
    error,
    setError,
    newProducer,
    setNewProducer,
    handleAddProducer,
    errors,
    validateFields,
  };
};
