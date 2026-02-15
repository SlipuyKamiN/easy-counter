import { Backdrop, ModalWindow } from "./Modal.styled";

export const Modal = ({ children, toggleModal }) => {
  return (
    <Backdrop onClick={toggleModal}>
      <ModalWindow onClick={(e) => e.stopPropagation()}>{children}</ModalWindow>
    </Backdrop>
  );
};
