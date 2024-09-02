import MainCarousel from "../components/atoms/MainCarousel";
import MainProductTemplate from "../components/templates/MainProductTemplate";
import Popup from "../components/popup/Popup";
import { useState } from "react";
const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => setIsModalOpen(false);
  return (
    <div>
      <MainCarousel />
      <MainProductTemplate />
      <Popup isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
export default HomePage;
