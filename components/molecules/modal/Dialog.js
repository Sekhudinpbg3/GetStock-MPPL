import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useAlert } from "react-alert";
import { XmarkIcon } from "../../../assets";
import { Button } from "../../atoms";

const defineChildren = (children, type) => {
  const { length } = children;

  if (length) {
    if (type === "custom") {
      return {
        Trigger: children[0],
        Panel: children[1],
      };
    }

    return {
      Trigger: children[0],
      Panel: children[1],
    };
  }

  if (!length) {
    if (type === "panel") {
      return { Panel: children };
    }
    return { Trigger: children };
  }
};

const defaultConfirmation = {
  title: "Title",
  text: "Text Confirmation",
};

const DialogCustom = ({
  children,
  type = "default",
  confirmation = defaultConfirmation,
  buttonConfirm,
  buttonCancel,
  noAlert,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { Trigger, Panel } = defineChildren(children, type);
  const { title, text } = confirmation;

  const Alert = useAlert();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const confirmHandler = async () => {
    try {
      if (buttonConfirm) {
        const passed = await buttonConfirm.onClick();
        if (passed) {
          closeModal();
          if (!noAlert) {
            Alert.success({ msg: "Berhasil" });
          }
          return;
        }

        if (!noAlert) {
          Alert.error({ msg: "Gagal" });
        }
        return;
      }
    } catch (error) {
      Alert.error({ msg: "Terjadi kesalahan" });
    }
  };

  const cancelHandler = async () => {
    try {
      if (buttonCancel) {
        const passed = await buttonCancel.onClick();
        if (passed) {
          closeModal();
          return;
        }

        if (!noAlert) {
          Alert.error({ msg: "Gagal" });
        }
      }
      closeModal();
      return;
    } catch (error) {
      Alert.error({ msg: "Terjadi kesalahan" });
    }
  };

  return (
    <>
      <div className="" onClick={openModal}>
        {Trigger ? Trigger : null}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModal}
          onClick={type === "custom" ? openModal : null}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="div-theme rounded-md px-3 py-2">
                  {Panel ? (
                    Panel
                  ) : (
                    <div className=" h-28 w-64">
                      <h1 className="mt-3 text-base font-semibold text-green-600">
                        {title}
                      </h1>
                      <div className="mt-2">
                        <p className="text-sm">{text}</p>
                      </div>
                    </div>
                  )}

                  <div className="mb-1 flex items-center justify-center space-x-2">
                    {buttonConfirm ? (
                      <Button.Opacity
                        opacity="success"
                        buttonClass="text-sm py-0.5 px-2 rounded"
                        onClick={confirmHandler}
                      >
                        {buttonConfirm.title}
                      </Button.Opacity>
                    ) : null}
                    {type === "custom" ? (
                      <Button.Custom
                        buttonClass="hover:bg-slate-200 dark:hover:bg-slate-800 duration-300  p-0.5 rounded-full absolute top-2 right-2"
                        buttonIcon
                        onClick={cancelHandler}
                      >
                        <XmarkIcon size="h-4 w-4" />
                      </Button.Custom>
                    ) : (
                      <Button.Opacity
                        opacity="danger"
                        buttonClass="text-sm py-0.5 px-2 rounded"
                        onClick={cancelHandler}
                      >
                        Batal
                      </Button.Opacity>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DialogCustom;
