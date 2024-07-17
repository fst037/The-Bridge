import { IoMdClose } from "react-icons/io";

export const Modal = ({
  isOpen,
  setIsOpen,
  cardRef,
  title,
  children,
  className,
}) => {
  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black/10 z-50 ${className}`}
        >
          <div
            className="flex flex-col p-6 w-full max-w-md mx-2 rounded-md bg-white"
            ref={cardRef}
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-[500]">{title}</h4>
              <button onClick={() => setIsOpen(false)}>
                <IoMdClose className="size-4" />
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
