import { ReactNode } from "react";
import ReactModal from "react-modal";
import { Button } from "../ui/button";

type ModalProps = {
  children: ReactNode;
  title: string;
  onClose: () => void;
};

function Modal({ children, title, onClose }: ModalProps) {
  return (
    <ReactModal
      ariaHideApp
      shouldFocusAfterRender
      shouldReturnFocusAfterClose
      className="relative h-max min-h-[240px]"
      overlayClassName="fixed top-[0px] right-[0px] left-[0px] bottom-[0px] bg-[rgba(45, 56, 69, 0.6)] transition duration-400 transition-opacity ease-in-out"
      isOpen
    >
      <div className="p-3 px-6 flex justify-end items-center rounded-t-2xl">
        <ModalTitle title={title} />
        <Button onClick={onClose}>
            </Button>
      </div>
      {children}
    </ReactModal>
  );
}

function ModalTitle({ title }: { title: string}) {
    return (
      <h3>{title}</h3>
    );
  }

ReactModal.setAppElement('body');

export default Modal;


