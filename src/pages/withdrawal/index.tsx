// my loan details page
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/dashboard/_dashboard';
import BackIcon from '@/assets/images/global/back-icon.png';
import Image from '@/components/ui/image';
import {useState, Fragment, useEffect} from 'react';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@/components/ui/dialog';
import { useWeb3 } from '@/contexts/Web3Context';
import {useDialog} from "@/components/confirm-dialog/confirmDialog";

const Withdrawal: NextPageWithLayout = () => {
  const router = useRouter();
  let [isOpen, setIsOpen] = useState(false);
  const { message, status, openDialog, closeDialog } = useDialog();
  const { web3, account, usdtContract, lpContract, loanContract } = useWeb3();
  const [recordData, setRecordData] = useState<any>({});

  useEffect(() => {
    if (!account) {
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const item = localStorage.getItem(`myEarning-${id}`);
    const record = item ? JSON.parse(item as string) : null;
    setRecordData(record);

  }, [account])

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleReturn = async () => {
    // return back to previous page
    router.back();
  };

  const handleRedeem = async () => {
    if (recordData.status == 1) {
      openDialog('Already redeemed', 'error')
      return ;
    }
    if (!web3 || !account || !loanContract || !usdtContract || !lpContract) {
      openDialog('Please connect your wallet first!', 'error')
      return ;
    }
    if (recordData.fee_rate == 0) {
      await callRetrieve()
    } else {
      openModal()
    }
  }

  const handleConfirm = async () => {
    closeModal()
    await callRetrieve()
  }

  const callRetrieve = async () => {
    if (!web3 || !account || !loanContract || !usdtContract || !lpContract) {
      return openDialog('Please connect your wallet first!', 'error');
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
  }

  return (
    <>
      <main className="flex h-full w-full max-w-screen-lg flex-col justify-between rounded-lg">
        <div>
          {/* return button */}
          <div className="pointer mb-6 flex items-center" onClick={handleReturn}>
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
                  {recordData.amount}
                </span>
                <span className="ml-1 text-2xl font-bold">USDT</span>
              </div>
            </div>
            <div className="w-1/3">
              <div className="text-sm tracking-tighter text-[#5C6166]">
                Real-time annualized rate
              </div>
              <div className="text-lg tracking-tighter text-[#1EBE70]">
                {recordData.rate_year}%
              </div>
            </div>
          </div>

          <div className="mb-4 flex rounded-3xl border border-[#E8EAEB] bg-white p-4 shadow-[0px_20px_50px_0px_rgba(7,17,53,0.05)]">
            <div className="flex w-1/2 flex-col">
              <span className="text-sm tracking-tighter text-[#5C6166]">
                Yesterday's annualized income
              </span>
              <span className="mt-3 text-lg font-bold text-[#18191A]">
                {recordData.yesterday_income}
              </span>
            </div>
            <div className="flex w-1/2 flex-col">
              <span className="text-sm tracking-tighter text-[#5C6166]">
                Cumulative annualized income
              </span>
              <span className="mt-3 text-lg font-bold text-[#18191A]">
                {recordData.total_income}
              </span>
            </div>
          </div>

          <div className="mb-4 rounded-3xl border border-[#E8EAEB] bg-white p-4 shadow-[0px_20px_50px_0px_rgba(7,17,53,0.05)]">
            <div className="mb-3 flex w-full justify-between  ">
              <span className="text-base tracking-tighter text-[#8A9199]">
                Lock-up period
              </span>
              <span className="text-base tracking-tighter text-[#18191A]">
                {recordData.days}day
              </span>
            </div>
            <div className="mb-3 flex w-full justify-between">
              <span className="text-base tracking-tighter text-[#8A9199]">
                Interest commencement date
              </span>
              <span className="text-base tracking-tighter text-[#18191A]">
                {recordData.income_start_day}
              </span>
            </div>
            <div className="mb-3 flex w-full justify-between">
              <span className="text-base tracking-tighter text-[#8A9199]">
                Interest settlement date
              </span>
              <span className="text-base tracking-tighter text-[#18191A]">
                {recordData.income_end_day}
              </span>
            </div>
            <div className="mb-3 flex w-full justify-between">
              <span className="text-base tracking-tighter text-[#8A9199]">
                Redemption status
              </span>
              <span className="text-base tracking-tighter text-[#18191A]">
                {recordData.status == 1 ? 'YES' : 'NO'}
              </span>
            </div>
          </div>
        </div>
        <button
          className="mt-6 w-full rounded-full bg-[#1EBE70] px-6 py-3 font-bold text-white"
          onClick={handleRedeem}
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
                    <p className="">principal amount {recordData.amount}USDT</p>
                    <p className="">deducted expense {recordData.amount}*{recordData.fee_rate*100}%={recordData.estimated_fee}USDT</p>
                  </div>

                  <div className="mt-16">
                    <button
                      type="button"
                      className="flex justify-center rounded-full bg-green-600 px-4 py-2 text-xl font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      style={{ width: '100%' }}
                      onClick={handleConfirm}
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
