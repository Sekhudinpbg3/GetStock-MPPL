import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { element, func, node, oneOfType, shape, string } from "prop-types";
import { Button, Gap, Progress, Text } from "../../atoms";

const Confirm = ({ children, ...props }) => {
  const { title, questions, buttonYes, ...newProps } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isProgress, setIsProgress] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeFrompanel = (e) => {
    if (e.target.classList.contains("dialogConfirm")) {
      closeModal();
    }
  };

  const buttonYeshandler = async () => {
    setIsProgress(true);
    const complete = await buttonYes.handler();
    if (complete) {
      setIsProgress(false);
      setIsOpen(false);
      return 1;
    }
    return 0;
  };

  return (
    <>
      <div onClick={openModal} className="cursor-pointer" {...newProps}>
        {children}
      </div>
      <Transition
        appear
        show={isOpen}
        as={Fragment}
        onClose={() => setIsOpen(true)}
      >
        <Dialog as="div" className="fixed inset-0 z-10 select-none">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              as={"div"}
              className="transition-all gridCenter dialogPanel dialogConfirm"
              onClick={(e) => closeFrompanel(e)}
            >
              <Progress.Circle loading={isProgress} />
              {/* prettier-ignore */}
              <div className={`${isProgress? 'hidden':'block'} containerPanel w-64`}>
                <Text.Title textClass="text-sm text-gray-500 font-semibold">
                  {title}
                </Text.Title>
                <Gap gapClass="h-1" />
                <Text.Normal textClass="text-sm text-gray-500 font-normal">
                  {questions}
                </Text.Normal>
                <Gap gapClass="h-4" />
                <div className="flex justify-start items-center space-x-3">
                  <Button.Normal
                    buttonVariant="primary-opacity"
                    buttonClass="text-sm px-1 py-0.5 rounded"
                    onClick={buttonYeshandler}
                  >
                    Yes
                  </Button.Normal>
                  <Button.Normal
                    buttonVariant="danger-opacity"
                    buttonClass="text-sm px-1 py-0.5 rounded"
                    onClick={closeModal}
                  >
                    No
                  </Button.Normal>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

Confirm.propTypes = {
  children: oneOfType([string, element, node]),
  title: string,
  questions: string,
  buttonYes: shape({
    title: string,
    handler: func,
  }),
};

Confirm.defaultProps = {
  children: "trigger",
  title: "Confirmations",
  questions: "Questions?",
  buttonYes: {
    title: "yes",
    handler: () => {
      return true;
    },
  },
};

export default Confirm;
