import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/dashboard/_dashboard';
import BackIcon from '@/assets/images/global/back-icon.png';
import QuestionIcon from '@/assets/images/global/question-icon.png';
import DocIcon from '@/assets/images/loan/doc-icon.png';
import WarnIcon from '@/assets/images/loan/waring-icon.png';
import Image from '@/components/ui/image';
import { useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@/components/ui/dialog';

// stepOne
const ReceiveLoanStepOne = (props: any) => {
  const [index, setIndex] = useState(0);
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tighter text-black">
          Deadline & weekly interest rate
        </h1>
      </div>

      <div className="mb-3">
        <div className="flex gap-2">
          <button
            className={`flex-1 rounded-xl border border-white bg-white px-3 py-4 ${
              index === 0 ? 'bg-[#1EBE70] text-white' : 'text-[#18191A]'
            }`}
            onClick={() => setIndex(0)}
          >
            1 week
          </button>
          <button
            className={`flex-1 rounded-xl border border-white bg-white px-3 py-4 ${
              index === 1 ? 'bg-[#1EBE70] text-white' : 'text-[#18191A]'
            }`}
            onClick={() => setIndex(1)}
          >
            2 week
          </button>
          <button
            className={`flex-1 rounded-xl border border-white bg-white px-3 py-4 ${
              index === 2 ? 'bg-[#1EBE70] text-white' : 'text-[#18191A]'
            }`}
            onClick={() => setIndex(2)}
          >
            3 week
          </button>
          <button
            className={`flex-1 rounded-xl border border-white bg-white px-3 py-4 ${
              index === 3 ? 'bg-[#1EBE70] text-white' : 'text-[#18191A]'
            }`}
            onClick={() => setIndex(3)}
          >
            4 week
          </button>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between text-xs">
        <div className="flex items-center text-gray-500">
          <span className="mr-2">estimate weekly interest rate</span>
          <Image width={14} height={14} src={QuestionIcon}></Image>
        </div>
        <span className="text-[#FE4C30]">0.5%</span>
      </div>

      <div className="rounded-lg border border-[#E8EAEB] p-4 shadow-[0px_20px_50px_0px_rgba(7,17,53,0.05)]">
        <h2 className="text-2xl font-bold text-black">Receive loan</h2>
        <div className="mb-4 mt-4">
          <div className="mb-3 flex items-center justify-between text-xl font-bold text-black">
            <p>Network</p>
            <p>BSC</p>
          </div>
          <label htmlFor="address" className="mb-2 block text-xs text-black">
            Address
          </label>
          <input
            type="text"
            id="address"
            placeholder="Required item"
            className="w-full rounded-xl border border-white px-4 py-2"
          />
          <p className="mt-2 text-xs tracking-tighter text-red-500">
            Please remember to check your receiving address carefully. If it is
            filled in incorrectly, you will bear all consequences.
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold tracking-tighter text-black">
            Asset triggers liquidation reminder service.
          </h3>
          <p className="mt-2 text-xs text-red-500">
            When the value of mortgaged assets declines, the system will send an
            email reminder to cover positions in real time.
          </p>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Optional item"
            className="w-full rounded-xl border border-white px-4 py-2"
          />
        </div>

        <button
          className="mt-6 w-full rounded-full bg-[#1EBE70] px-6 py-3 font-bold text-white"
          onClick={() => props.onStepChange(2)}
        >
          Next step
        </button>
      </div>
    </>
  );
};
// stepTwo
const ReceiveLoanStepTwo = (props: any) => {
  const fieldList = [
    {
      label: 'Loan type',
      tooltip: {
        show: true,
        content: 'The type of loan you want to receive',
      },
      value: 'ALEO / pos借贷',
    },
    {
      label: 'Collateral',
      tooltip: {
        show: true,
        content: 'The collateral you are providing for the loan',
      },
      value: '1611aleo',
    },
    {
      label: 'Collateral value',
      tooltip: {
        show: true,
        content: 'The value of the collateral in USD',
      },
      value: '1811.25USDT',
    },
    {
      label: 'Collateral rate',
      tooltip: {
        show: true,
        content: 'The collateral rate as a multiplier',
      },
      value: '0.700x',
    },
    {
      label: 'Borrowing amount',
      tooltip: {
        show: true,
        content: 'The amount you wish to borrow',
      },
      value: '1267.75USDT',
    },
    {
      label: 'Repayment method',
      tooltip: {
        show: true,
        content: 'The method of repayment',
      },
      value: 'Interest first, principal later.',
    },
    {
      label: 'Installment number',
      tooltip: {
        show: true,
        content: 'The number of installments',
      },
      value: '1week',
    },
    {
      label: 'Weekly interest',
      tooltip: {
        show: true,
        content: 'The weekly interest rate',
      },
      value: '0.5%',
    },
    {
      label: 'Interest rate type',
      tooltip: {
        show: false,
        content: 'The type of interest rate',
      },
      value: 'Fixed interest rate',
    },
    {
      label: 'Interest per installment',
      tooltip: {
        show: false,
        content: 'The interest per installment',
      },
      value: '5.25USDT',
    },
    {
      label: 'Receiving address',
      tooltip: {
        show: false,
        content: 'The receiving address for the loan',
      },
      value: '0x45s****6a8454s',
    },
    {
      label: 'Email',
      tooltip: {
        show: false,
        content: 'Your email address',
      },
      value: '31**365@gmail.com',
    },
  ];
  return (
    <>
      <div className="mb-4 flex items-center text-xl font-bold tracking-tighter text-black">
        <Image width={16} height={18} src={DocIcon}></Image>
        <span className="ml-2">Create a loan contract</span>
      </div>

      <div className="rounded-2xl border border-[#E8EAEB] p-4 shadow-[0px_20px_50px_0px_rgba(7,17,53,0.05)]">
        <div>
          {fieldList.map((item) => {
            return (
              <div className="mb-4 flex items-center justify-between py-2">
                <div className="mr-6 shrink-0 tracking-tighter text-[#8A9199]">
                  <span className="mr-2">{item.label}</span>
                  {item.tooltip.show && (
                    <Image width={16} height={16} src={QuestionIcon} />
                  )}
                </div>
                <div className="flex justify-end text-xs tracking-tighter text-[#18191A]">
                  {item.value}
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-xl border border-[#FE4C30] bg-[#FE4C3010] p-4">
          <div className="flex items-center">
            <Image width={16} height={16} src={WarnIcon}></Image>
            <span className="ml-2 font-bold text-[#FE4C30]">Risk warning</span>
          </div>

          <div className="mt-2 text-xs text-[#FE4C30]">
            When the value of your collateral assets is less than 75%, they will
            face being sold for repayment (or when the price of aleo/USDT
            reaches xxx).
          </div>
        </div>

        <button
          className="mt-6 w-full rounded-full bg-[#1EBE70] px-6 py-3 font-bold text-white"
          onClick={() => props.onStepChange(3)}
        >
          Confirm the loan contract.
        </button>
      </div>
    </>
  );
};
// stepThree
const ReceiveLoanStepThree = (props: any) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const borrowAmountFieldList = [
    {
      label: 'Loan address',
      value: '0x84**55dd',
    },
    {
      label: 'Loan type',
      value: 'aleo/pos',
    },
    {
      label: 'collateral',
      value: '1125aelo',
    },
  ];

  const receiveLoansFieldList = [
    {
      label: 'Network',
      value: 'BSC',
    },
    {
      label: 'Address',
      value: '1125aelo',
    },
  ];

  const handleSubmit = () => {
    openModal();
  };
  return (
    <>
      <div className="mb-4 flex items-center text-xl font-bold tracking-tighter text-black">
        <Image width={16} height={18} src={DocIcon}></Image>
        <span className="ml-2">Create a loan contract</span>
      </div>

      <div className="rounded-2xl border border-[#E8EAEB] p-4 shadow-[0px_20px_50px_0px_rgba(7,17,53,0.05)]">
        <div className="mb-2 text-xl font-bold text-[#18191A]">Overview</div>

        <div className="mb-2 text-base tracking-tighter text-[#5C6166]">
          Borrowing amount
        </div>

        <div className="text-3xl font-bold text-[#18191A]">$1267.85</div>

        <div className="mb-12">
          {borrowAmountFieldList.map((item) => {
            return (
              <div className="mt-2 flex items-center justify-between">
                <div className="text-sm text-[#5C6166]">{item.label}</div>
                <div className="text-sm text-[#18191A]">{item.value}</div>
              </div>
            );
          })}
        </div>

        <div className="relative">
          <div className="absolute top-[-28px] left-[-32px] h-8 w-8 rounded-full border-r-2 border-[#E8EAEB] bg-[#efefef]"></div>
          <div
            className="absolute left-0 top-[-14px] border border-dashed border-[#eaeaea]"
            style={{ width: 'calc(100%)', height: '1px' }}
          ></div>
          <div className="absolute top-[-28px] right-[-32px] h-8 w-8 rounded-full border-l-2 border-[#E8EAEB] bg-[#efefef]"></div>
        </div>

        <div className="mt-14 mb-2 text-xl font-bold text-[#18191A]">
          Receive loans
        </div>

        <div className="mb-4">
          {receiveLoansFieldList.map((item) => {
            return (
              <div className="mt-2 flex items-center justify-between">
                <div className="text-sm text-[#5C6166]">{item.label}</div>
                <div className="text-sm text-[#18191A]">{item.value}</div>
              </div>
            );
          })}
        </div>

        <div className="rounded-xl border border-[#FE4C30] bg-[#FE4C3010] p-4">
          <div className="flex items-center">
            <span className="ml-2 font-bold text-[#FE4C30]">
              Declaration (Be sure to read carefully)
            </span>
          </div>

          <div className="mt-2 text-xs text-[#FE4C30]">
            <p className="mb-4">
              If the borrowing receiving address is filled in incorrectly and
              the loan is not received, the user shall bear all consequences on
              their own.{' '}
            </p>
            <p className="mb-4">
              If the value of the mortgaged asset is less than 75%, the system
              will automatically close out the position (or when the aleo/USDT
              price is lower than 1.6 USDT).{' '}
            </p>
            <p>
              Applying for a loan requires transferring the corresponding
              mortgaged asset. If it is not approved, it will be automatically
              returned.
            </p>
          </div>
        </div>

        <button
          className="mt-6 w-full rounded-full bg-[#1EBE70] px-6 py-3 font-bold text-white"
          onClick={handleSubmit}
        >
          Confirm the loan contract.
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-center text-2xl font-bold leading-6 text-[#18191A]"
                  >
                    Hint
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-[#18191A]">
                      Application is successful. You can check the loan progress
                      in "My Loans".
                    </p>
                  </div>

                  <div className="mt-8">
                    <button
                      type="button"
                      className="flex justify-center rounded-full bg-green-600 px-4 py-2 text-xl font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      style={{ width: '100%' }}
                      onClick={closeModal}
                    >
                      Confirm
                    </button>
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

const ReceiveLoanPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const handleNextStep = (step: number) => {
    // You can add logic here to validate inputs before navigating
    // router.push('/confirmation');
    setStep(step);
  };

  const handlReturn = () => {
    // return back to previous page
    router.back();
  };

  return (
    <>
      <main className="w-full max-w-screen-lg rounded-lg">
        {/* return button */}
        <div className="pointer mb-6 flex items-center" onClick={handlReturn}>
          <Image width={20} height={16} src={BackIcon}></Image>
          <span className="ml-2 text-3xl font-bold tracking-tighter text-black">
            Return
          </span>
        </div>

        {step === 1 ? (
          <ReceiveLoanStepOne onStepChange={handleNextStep} />
        ) : step === 2 ? (
          <ReceiveLoanStepTwo onStepChange={handleNextStep} />
        ) : step === 3 ? (
          <ReceiveLoanStepThree onStepChange={handleNextStep} />
        ) : (
          <div>Invalid step</div>
        )}
      </main>
    </>
  );
};

ReceiveLoanPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ReceiveLoanPage;
