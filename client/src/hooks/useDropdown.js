import { useEffect, useState, useRef } from "react";

const useDropdown = (initialOption) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(initialOption);
  const ref = useRef(null);

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelectOption = (name, value) => {
    setSelected({
      name,
      value
    });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return {
    ref,
    isOpen,
    selected,
    handleToggleDropdown,
    handleSelectOption
  };
};

export default useDropdown;
