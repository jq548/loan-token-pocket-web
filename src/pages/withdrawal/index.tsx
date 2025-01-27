// my loan details page
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/dashboard/_dashboard';
import BackIcon from '@/assets/images/global/back-icon.png';
import Image from '@/components/ui/image';
import { useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@/components/ui/dialog';
import { useWeb3 } from '@/contexts/Web3Context';

const Withdrawal: NextPageWithLayout = () => {
  const router = useRouter();
  let [isOpen, setIsOpen] = useState(false);
  const { web3, account, usdtContract, lpContract, loanContract } = useWeb3();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const handlReturn = async () => {
    // return back to previous page
    if (!web3 || !account || !loanContract || !usdtContract || !lpContract) {
      return;
    }
    try {
      const provideId = 1; // provide id
      const redeemResult = await loanContract.methods
        .retrieveUsdt(provideId)
        .send({ from: account });
      console.log(redeemResult);
    } catch (error) {
      console.log('fetch exchangeable error: ', error);
    }
    router.back();
  };

  return (
    <>
      <main className="flex h-full w-full max-w-screen-lg flex-col justify-between rounded-lg">
        <div>
          {/* return button */}
          <div className="pointer mb-6 flex items-center" onClick={handlReturn}>
            <Image width={20} height={16} src={BackIcon}></Image>
            <span className="ml-2 text-3xl font-bold tracking-tighter text-black">
              Assets
            </span>
          </div>

          <div className="mb-8 flex justify-between">
            <div>
              <div className="mb-2 text-sm tracking-tighter text-[#18191A]">
                Quantity
              </div>
              <div className="flex items-end text-[#18191A]">
                <span className="text-4xl font-bold tracking-tighter">
                  5.325
                </span>
                <span className="ml-1 text-2xl font-bold">USDT</span>
              </div>
            </div>
            <div className="w-1/3">
              <div className="text-sm tracking-tighter text-[#5C6166]">
                Real-time annualized rate
              </div>
              <div className="text-lg tracking-tighter text-[#1EBE70]">
                4.55%
              </div>
            </div>
          </div>

          <div className="mb-4 flex rounded-3xl border border-[#E8EAEB] bg-white p-4 shadow-[0px_20px_50px_0px_rgba(7,17,53,0.05)]">
            <div className="flex w-1/2 flex-col">
              <span className="text-sm tracking-tighter text-[#5C6166]">
                Yesterday's annualized income
              </span>
              <span className="mt-3 text-lg font-bold text-[#18191A]">
                +125.36
              </span>
            </div>
            <div className="flex w-1/2 flex-col">
              <span className="text-sm tracking-tighter text-[#5C6166]">
                Cumulative annualized income
              </span>
              <span className="mt-3 text-lg font-bold text-[#18191A]">
                +5.36
              </span>
            </div>
          </div>

          <div className="mb-4 rounded-3xl border border-[#E8EAEB] bg-white p-4 shadow-[0px_20px_50px_0px_rgba(7,17,53,0.05)]">
            <div className="mb-3 flex w-full justify-between  ">
              <span className="text-base tracking-tighter text-[#8A9199]">
                Lock-up period
              </span>
              <span className="text-base tracking-tighter text-[#18191A]">
                21day
              </span>
            </div>
            <div className="mb-3 flex w-full justify-between">
              <span className="text-base tracking-tighter text-[#8A9199]">
                Interest commencement date
              </span>
              <span className="text-base tracking-tighter text-[#18191A]">
                2025/01/01
              </span>
            </div>
            <div className="mb-3 flex w-full justify-between">
              <span className="text-base tracking-tighter text-[#8A9199]">
                Interest settlement date
              </span>
              <span className="text-base tracking-tighter text-[#18191A]">
                2025/01/23
              </span>
            </div>
            <div className="mb-3 flex w-full justify-between">
              <span className="text-base tracking-tighter text-[#8A9199]">
                Redemption status
              </span>
              <span className="text-base tracking-tighter text-[#18191A]">
                NO/YES
              </span>
            </div>
          </div>
        </div>
        <button
          className="mt-6 w-full rounded-full bg-[#1EBE70] px-6 py-3 font-bold text-white"
          onClick={openModal}
        >
          Redeem
        </button>
      </main>
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
                    className="flex items-center justify-center text-center text-2xl font-bold leading-6 text-[#18191A]"
                  >
                    <span className="ml-2 text-[#18191A]">Hint</span>
                  </Dialog.Title>
                  <div className="mt-4">
                    <p className="text-sm tracking-tighter text-[#18191A]">
                      Since your lock-up period has not expired, redemption is a
                      breach of contract. The platform will charge 3% of the
                      principal as liquidated damages.
                    </p>
                  </div>

                  <div className="mt-12 text-sm text-[#FE4C30]">
                    <p className="">principal amount 500USDT</p>
                    <p className="">deducted expense 500*3%=15USDT</p>
                  </div>

                  <div className="mt-16">
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

Withdrawal.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Withdrawal;
