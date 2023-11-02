import { useState } from "react";

function useInputWithValidation(validate, defaultValue = "", maxLength = 10) {
  const [value, setValue] = useState(defaultValue);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleChangeInput = (event) => {
    if (
      typeof defaultValue === "object" &&
      !Array.isArray(defaultValue) &&
      defaultValue !== null
    ) {
      const { name, value } = event.target;
      setValue((prev) => ({ ...prev, [name]: value }));
    } else {
      setValue(event.target.value);
    }
  };

  const handleReset = () => {
    setValue(defaultValue);
    setErrorMessage(null);
    setShowErrorMessage(false);
  };

  const validateAndSetErrorMessage = () => {
    if (validate) {
      const errorMsg = validate(value);
      setErrorMessage(errorMsg);
      setShowErrorMessage(!!errorMsg);
      return errorMsg;
    }
    return null;
  };

  return {
    value,
    handleChangeInput,
    handleReset,
    errorMessage,
    showErrorMessage,
    validateAndSetErrorMessage
  };
}

export default useInputWithValidation;
