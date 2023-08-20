import { useEffect, useState } from "react";

const useDirectory = () => {
  const [isModalOpened, setIsOpenModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState();

  const handleClickOpen = () => {
    setIsOpenModal(true);
    console.log('isModalOpened',isModalOpened)
  };

  const handleCloseModal = (value) => {
    setIsOpenModal(false);
    setSelectedValue(value);
  };

  return {
    handleClickOpen,
    handleCloseModal,
    isModalOpened,
  };
};

export default useDirectory;
