import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const CustomDialog = ({ isOpen, onClose, message, status }: any) => {
  return (
    <div className="w-[90vw]">
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as="div"
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
                as="div"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 pt-12 text-left align-middle shadow-xl transition-all">
                  {/* Ensure message is a string */}
                  <div
                    className={`mb-12 text-base tracking-tighter ${
                      status === 'success' ? 'text-[#18191A]' : 'text-red-500'
                    }`}
                  >
                    {typeof message === 'string' ? message : 'Invalid message'}
                  </div>

                  {/* 确认按钮 */}
                  <button
                    type="button"
                    className="ml-2 flex w-full justify-center rounded-full bg-[#1EBE70] px-4 py-2 text-xl font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Confirm
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CustomDialog;
