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
      className="relative h-max min-h-[240px] bg-white w-[960px] m-auto rounded-2xl overflow-hidden"
      overlayClassName="fixed top-[0px] right-[0px] left-[0px] bottom-[0px] bg-overlayBackground transition duration-400 transition-opacity ease-in-out flex justify-center overflow-auto animate-fadeIn"
      isOpen
    >
      <div className="p-3 px-6 flex justify-between items-center rounded-t-2xl">
        <ModalTitle title={title} />
        <Button className="bg-red-500 rounded-full text-white" onClick={onClose}>X</Button>
      </div>
      {children}
    </ReactModal>
  );
}

function ModalTitle({ title }: { title: string }) {
  return <h3>{title}</h3>;
}

ReactModal.setAppElement("body");

export default Modal;
