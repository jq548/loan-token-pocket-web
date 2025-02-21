// my loan details page
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/dashboard/_dashboard';
import BackIcon from '@/assets/images/global/back-icon.png';
import WarnIcon from '@/assets/images/loan/warning-icon-2.png';
import Image from '@/components/ui/image';
import { useState, Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@/components/ui/dialog';
import { useWeb3 } from '@/contexts/Web3Context';
import { getStatusLabel, getShowAddress } from "@/utils/getStatusLabel";
import dayjs from "dayjs";

const LoanDetails: NextPageWithLayout = () => {
  const router = useRouter();
  let [isOpen, setIsOpen] = useState(false);
  const [originalData, setOriginalData] = useState<any>({});
  const { web3, account, usdtContract, lpContract, loanContract } = useWeb3();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const borrowAmountFieldList = [
    {
      label: 'Penriod',
      value: originalData.stages,
    },
    {
      label: 'mortgaged quantity',
      value: originalData.deposit_amount + 'aleo',
    },
    {
      label: 'interest rate type',
      value: 'fixed rate',
    },
    {
      label: 'interest rate',
      value: parseFloat(originalData.rate) * 100 + '%',
    },
  ];

  const [receiveLoansFieldList, setReceoveLoansFieldList] = useState([
    {
      label: 'Principal to be repaid',
      value: '',
    },
    {
      label: 'Repayment date',
      value: '',
    },
    {
      label: 'Repayment method',
      value: 'Interest first, then principal',
    },
    {
      label: 'Loan address',
      value: '',
    },
    {
      label: 'Receiving address',
      value: '',
    },
    {
      label: 'hash',
      value: '',
    },
  ]);

  const handlReturn = async () => {
    // return back to previous page
    router.back();
  };

  const handlePayback = async  () => {
    if (!web3 || !account || !loanContract || !usdtContract || !lpContract) {
      return;
    }
    try {
      const amount = 100; // amount that need pay back
      const loanId = 1; // id of loan

      const lpBalanceResult = await lpContract.methods.balanceOf(account).call();
      const lpBalance = web3.utils.fromWei(lpBalanceResult, "ether");
      const floatBalance = parseFloat(lpBalance);

      if (floatBalance < amount) {
        console.log("insuffient balance");
        return;
      }

      const weiAmount = web3.utils.toWei(amount, "ether");
      const allowance = await lpContract.methods.allowance(account, loanContract.options.address).call();
      if (allowance < weiAmount) {
        const approveResult = await lpContract.methods.approve(loanContract.options.address, weiAmount).send({ from: account });
        console.log(approveResult);
      }
      const paybackResult = await loanContract.methods.payBack(loanId).send({ from: account });
      console.log(paybackResult);

    } catch (error) {
      console.log("fetch exchangeable error: ", error);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const item = localStorage.getItem(`myLoan-${id}`);
    const originItem = item ? JSON.parse(item as string) : null;
    setOriginalData(originItem);
    if (!originItem) return;
    const deepReceiveLoansFieldList = JSON.parse(
        JSON.stringify(receiveLoansFieldList)
    );
    deepReceiveLoansFieldList[0].value = originItem.release_amount;
    deepReceiveLoansFieldList[1].value = "Before " + dayjs.unix(originItem.start_at+originItem.stages*originItem.day_per_stage*24*3600).format("YYYY-MM-DD");
    deepReceiveLoansFieldList[3].value = getShowAddress(originItem.aleo_address);
    deepReceiveLoansFieldList[4].value = getShowAddress(originItem.bsc_address);
    deepReceiveLoansFieldList[5].value = getShowAddress(originItem.release_hash);
    setReceoveLoansFieldList(deepReceiveLoansFieldList);
    return () => {};
  }, []);

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

        <div className="mb-2 flex items-center justify-between">
          <p className="text-lg text-[#5C6166]">Amount</p>
          <p className="text-lg text-[#1EBE70]">{getStatusLabel(originalData.status)}</p>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <p className="flex items-start font-bold text-[#18191A]">
            <span className="mr-1 text-xl">$</span>
            <span className="text-3xl">{originalData.release_amount}</span>
          </p>
        </div>

        <div className="rounded-2xl border border-[#E8EAEB] bg-white px-4 py-2 shadow-[0px_20px_50px_0px_rgba(7,17,53,0.05)]">
          <div className="mb-12">
            {borrowAmountFieldList.map((item) => {
              return (
                <div className="mt-2 flex items-center justify-between">
                  <div className="mr-8 shrink-0 text-base tracking-tighter text-[#8A9199]">
                    {item.label}
                  </div>
                  <div className="text-base tracking-tighter text-[#18191A]">
                    {item.value}
                  </div>
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

          <div className="mb-4">
            {receiveLoansFieldList.map((item) => {
              return (
                <div className="mt-2 flex items-center justify-between">
                  <div className="mr-8 shrink-0 text-base tracking-tighter text-[#8A9199]">
                    {item.label}
                  </div>
                  <div className="text-base tracking-tighter text-[#18191A]">
                    {item.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-[#E8EAEB] bg-white px-4 py-2 shadow-[0px_20px_50px_0px_rgba(7,17,53,0.05)]">
          <div className="mt-2 flex items-center justify-between">
            <div className="mr-8 shrink-0 text-base tracking-tighter text-[#8A9199]">
              Health value of mortgaged
            </div>
            <div className="text-base tracking-tighter text-[#18191A]">
              {(originalData.health * 100).toFixed(2)}%
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="mr-8 shrink-0 text-base tracking-tighter text-[#8A9199]">
              overdue
            </div>
            <div className="text-base tracking-tighter text-[#18191A]">0</div>
          </div>
        </div>

        {/* <button
          className="mt-4 w-full rounded-full bg-[#1EBE70] px-6 py-3 font-bold text-white"
          onClick={openModal}
        >
          Current repayment
        </button> */}

        <button className="mt-4 w-full rounded-full bg-[#1EBE70] px-6 py-3 font-bold text-white" onClick={handlePayback}>
          Current repayment
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
                    <Image width={24} height={24} src={WarnIcon}></Image>
                    <span className="ml-2 text-[#FA9825]">Prompt</span>
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-[#FA9825]">
                      The repayment value needs to be operated in a wallet that
                      supports the BSC chain. Currently, the ALEO chain is not
                      supported.
                    </p>
                  </div>

                  <div className="mt-8">
                    <button
                      type="button"
                      className="flex justify-center rounded-full bg-[#1EBE70] px-4 py-2 text-xl font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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

LoanDetails.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default LoanDetails;
