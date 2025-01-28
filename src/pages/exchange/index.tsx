import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/dashboard/_dashboard';
import FileIcon from '@/assets/images/global/file-icon.png';
import ADIIcon from '@/assets/images/exchange/exchange-adi-icon.png';
import USDTIcon from '@/assets/images/exchange/exchange-usdt-icon.png';
import TimerIcon from '@/assets/images/exchange/exchange-timer.png';
import ChangeIcon from '@/assets/images/exchange/exchange-change-icon.png';
import Change2Icon from '@/assets/images/exchange/exchange-change-icon-2.png';
import Image from '@/components/ui/image';
import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@/components/ui/dialog';
import { useWeb3 } from '@/contexts/Web3Context';
import LoadingSpinner from '@/components/loading';
import { useLoading } from '@/components/loading/loading';

let timer: any = null;
const Exchange: NextPageWithLayout = () => {
  const router = useRouter();
  const [adiQuantity, setAdiQuantity] = useState('');
  const [usdtQuantity, setUsdtQuantity] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { isLoading, openLoading, closeLoading } = useLoading();
  const [confirmModal, setConfirmModal] = useState(false);
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [lpBalance, setLpBalance] = useState(0);
  const [lpToUsdt, setLpToUsdt] = useState(true); // true: lp to usdt, false: usdt to lp
  const [maxExchangeableUsdt, setMaxExchangeableUsdt] = useState(0); // usdt to lp, limit by contract
  const [maxExchangeableLp, setMaxExchangeableLp] = useState(0); // lp to usdt, limit by contract
  const { web3, account, usdtContract, lpContract, loanContract } = useWeb3();
  const [countDown, setCountDown] = useState(30);

  const handleMaxClick = () => {
    if (lpToUsdt) {
      const amount = maxExchangeableLp > lpBalance ? lpBalance : maxExchangeableLp;
      setAdiQuantity(amount.toString());
      setUsdtQuantity(amount.toString());
    } else {
      const amount = maxExchangeableUsdt > usdtBalance ? usdtBalance : maxExchangeableUsdt;
      setAdiQuantity(amount.toString());
      setUsdtQuantity(amount.toString());
    }
    
  };
  // get first element
  const getExchangeElement = (type: boolean) => {
    return type ? (
      <>
        <Image src={ADIIcon} width={36} height={36} />
        <span className="flex border-r border-[#DFE7EB] pl-2 pr-4 text-base text-[#18191A]">
          ADI
        </span>
        <input
          type="text"
          placeholder="Enter quantity"
          value={adiQuantity}
          onChange={(e) => {
            setAdiQuantity(e.target.value);
            setUsdtQuantity(e.target.value);
          }}
          className="w-full border-0 bg-[transparent] py-2 pr-3 text-[#18191A]"
        />
      </>
    ) : (
      <>
        <Image src={USDTIcon} width={36} height={36} />
        <span className="border-r border-[#DFE7EB] pl-2 pr-4 text-base text-[#18191A]">
          USDT
        </span>
        <input
          type="text"
          placeholder="Enter quantity"
          value={usdtQuantity}
          onChange={(e) => {
            setAdiQuantity(e.target.value);
            setUsdtQuantity(e.target.value);
          }}
          className="w-full border-0 bg-[transparent] py-2 pr-3 text-[#18191A]"
        />
      </>
    );
  };
  // get second element
  const getExchangedElement = (type: boolean) => {
    return type ? (
      <>
        <Image src={USDTIcon} width={36} height={36} />
        <span className="border-r border-[#DFE7EB] pl-2 pr-4 text-base text-[#18191A]">
          USDT
        </span>
        <input
          type="text"
          placeholder="Enter quantity"
          value={usdtQuantity}
          onChange={(e) => {
            setAdiQuantity(e.target.value);
            setUsdtQuantity(e.target.value);
          }}
          className="w-full border-0 bg-[transparent] py-2 pr-3 text-[#18191A]"
        />
      </>
    ) : (
      <>
        <Image src={ADIIcon} width={36} height={36} />
        <span className="flex border-r border-[#DFE7EB] pl-2 pr-4 text-base text-[#18191A]">
          ADI
        </span>
        <input
          type="text"
          placeholder="Enter quantity"
          value={adiQuantity}
          onChange={(e) => {
            setAdiQuantity(e.target.value);
            setUsdtQuantity(e.target.value);
          }}
          className="w-full border-0 bg-[transparent] py-2 pr-3 text-[#18191A]"
        />
      </>
    );
  };

  const handleCountDownClick = () => {
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(() => {
      setCountDown((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleCountDownClick();
          fetchExchangeable();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const fetchExchangeable = async () => {
    if (!web3 || !account || !loanContract || !usdtContract || !lpContract) {
      return;
    }
    try {
      const usdtBalanceResult = await usdtContract.methods
        .balanceOf(account)
        .call();
      const usdtBalance = web3.utils.fromWei(usdtBalanceResult, 'ether');
      setUsdtBalance(parseFloat(usdtBalance));

      const lpBalanceResult = await lpContract.methods
        .balanceOf(account)
        .call();
      const lpBalance = web3.utils.fromWei(lpBalanceResult, 'ether');
      setLpBalance(parseFloat(lpBalance));

      const maxExchangeableLpToUsdtResult = await loanContract.methods
        .maxExchangeLpUsdt(true)
        .call();
      const maxExchangeableLpToUsdt = web3.utils.fromWei(
        maxExchangeableLpToUsdtResult,
        'ether'
      );
      setMaxExchangeableLp(parseFloat(maxExchangeableLpToUsdt));

      const maxExchangeableUsdtToLpResult = await loanContract.methods
        .maxExchangeLpUsdt(false)
        .call();
      const maxExchangeableUsdtToLp = web3.utils.fromWei(
        maxExchangeableUsdtToLpResult,
        'ether'
      );
      setMaxExchangeableUsdt(parseFloat(maxExchangeableUsdtToLp));
      console.log(
        'fetch complete: ',
        usdtBalance,
        lpBalance,
        maxExchangeableLpToUsdt,
        maxExchangeableUsdtToLp
      );
    } catch (error) {
      console.log('fetch exchangeable error: ', error);
    }
  };

  const submitExchange = async () => {
    if (!web3 || !account || !loanContract || !usdtContract || !lpContract) {
      return;
    }
    openLoading();
    try {
      const checkAmount = parseFloat(lpToUsdt ? adiQuantity : usdtQuantity);
      if (
        checkAmount <= 0 ||
        checkAmount > (lpToUsdt ? lpBalance : usdtBalance) ||
        checkAmount > (lpToUsdt ? maxExchangeableLp : maxExchangeableUsdt)
      ) {
        console.log('exceed limit');
        alert('Exceed limit');
        closeLoading();
        return;
      }
      const amount = web3.utils.toWei(
        lpToUsdt ? adiQuantity : usdtQuantity,
        'ether'
      );
      const allowance = await (lpToUsdt ? lpContract : usdtContract).methods
        .allowance(account, loanContract.options.address)
        .call();
      if (allowance < amount) {
        const approveResult = await (lpToUsdt
          ? lpContract
          : usdtContract
        ).methods
          .approve(loanContract.options.address, amount)
          .send({ from: account });
        console.log(approveResult);
      }
      const exchangeResult = await loanContract.methods
        .exchangeLpUsdt(lpToUsdt, amount)
        .send({ from: account });
      console.log(exchangeResult);
      setConfirmModal(true);
      closeLoading();
    } catch (error) {
      console.log('submit error: ', error);
      closeLoading();
    }
  };

  const handleToHistory = () => {
    router.push('/conversionHistory');
  };

  useEffect(() => {
    handleCountDownClick();
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

  useEffect(() => {
    fetchExchangeable();
  }, [account]);

  return (
    <>
      <div className="mx-auto flex h-full max-w-7xl flex-col px-2 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="mb-4 text-4xl font-bold text-[#18191A]">Exchange</h1>
          <Image
            width={16}
            height={20}
            src={FileIcon}
            onClick={handleToHistory}
          ></Image>
        </div>

        <div className="flex-1 rounded-3xl bg-white p-6 py-8">
          <div className="mb-2 flex items-center rounded-xl border border-[#E8EAEB] bg-[#F3F5F6] p-1 pl-2">
            {/* <Image src={ADIIcon} width={36} height={36} />
          <span className="flex border-r border-[#DFE7EB] pl-2 pr-4 text-base text-[#18191A]">
            ADI
          </span> */}
            {getExchangeElement(lpToUsdt)}
            {/* <input
            type="text"
            placeholder="Enter quantity"
            value={adiQuantity}
            onChange={(e) => setAdiQuantity(e.target.value)}
            className="w-full border-0 bg-[transparent] py-2 pr-3 text-[#18191A]"
          /> */}
            <button
              onClick={handleMaxClick}
              className="ml-4 rounded-lg bg-green-500 px-4 py-2 text-white"
            >
              MAX
            </button>
          </div>

          <div className="mb-16 flex items-center justify-end">
            <span className="text-xs text-[#8A9199]">Balance</span>
            <span className="ml-1 text-sm text-[#18191A]">{lpToUsdt?lpBalance:usdtBalance}</span>
          </div>

          <div
            className="relative mb-16 flex flex items-center justify-center justify-center"
            onClick={() => setLpToUsdt(!lpToUsdt)}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Image src={ChangeIcon} width={35} height={70} />
            </div>
            <div className="absolute top-1/2 left-1/2 z-[2] flex -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E8EAEB] bg-white px-2 py-1">
              <Image src={TimerIcon} width={20} height={6}></Image>
              <div className="flex items-end">
                <span className="ml-2 text-sm text-[#FE4C30]">{countDown}</span>
                <span className="text-sm text-[#FE4C30]">s</span>
              </div>
            </div>
          </div>

          <div className="mb-2 flex items-center rounded-xl border border-[#E8EAEB] bg-[#F3F5F6] p-1 pl-2">
            {/* <Image src={USDTIcon} width={36} height={36} />
          <span className="border-r border-[#DFE7EB] pl-2 pr-4 text-base text-[#18191A]">
            USDT
          </span>*/}
            {getExchangedElement(lpToUsdt)}
            {/* <input
            type="text"
            placeholder="Enter quantity"
            value={adiQuantity}
            onChange={(e) => setAdiQuantity(e.target.value)}
            className="w-full border-0 bg-[transparent] py-2 pr-3 text-[#18191A]"
          /> */}
            <button
              onClick={handleMaxClick}
              className="ml-4 rounded-lg bg-green-500 px-4 py-2 text-white"
            >
              MAX
            </button>
          </div>

          <div className="mb-16 flex items-center justify-end">
            <span className="text-xs text-[#8A9199]">
              Balance
            </span>
            <span className="ml-1 text-sm text-[#18191A]">{lpToUsdt?usdtBalance:lpBalance}</span>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-xs tracking-tighter text-[#8A9199]">
                Exchange rate
              </span>
              <span className="ml-2 text-sm tracking-tighter text-[#FE4C30]">
                1 : 1
              </span>
            </div>
            <div className="text-xs text-[#8A9199]">1 USDT = 1 ADI</div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="w-full rounded-full bg-[#1EBE70] px-6 py-3 font-bold text-white"
          >
            Exchange for USDT
          </button>

          <div className="mt-4 text-xs text-[#8A9199]">
            <p>Exchange instructions:</p>
            <p>USDT only supports BSC chain.</p>
            <p>Stablecoins only support BSC chain.</p>
          </div>

          {/* Modal */}
          <Transition show={showModal} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setShowModal(false)}
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
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="mb-6 text-center text-2xl font-bold text-[#18191A]"
                      >
                        Confirm exchange information
                      </Dialog.Title>
                      <div className="mt-12">
                        <div className="flex items-center justify-between">
                          <div className="mr-4 flex  flex-1 flex-col items-end">
                            <div className="mb-2 flex items-center">
                              <span className="mr-1 text-base text-[#18191A]">
                                ADI
                              </span>
                              <Image
                                src={ADIIcon}
                                width={24}
                                height={24}
                              ></Image>
                            </div>
                            <div className="text-2xl font-bold text-[#18191A]">
                              {adiQuantity}
                            </div>
                          </div>
                          <Image
                            src={Change2Icon}
                            width={36}
                            height={24}
                          ></Image>
                          <div className="ml-4 flex flex-1 flex-col items-start">
                            <div className="mb-2 flex items-center">
                              <Image
                                src={USDTIcon}
                                width={24}
                                height={24}
                              ></Image>
                              <span className="ml-1 text-base text-[#18191A]">
                                USDT
                              </span>
                            </div>
                            <div className="text-2xl font-bold text-[#18191A]">
                              {usdtQuantity}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-16 flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-xs tracking-tighter text-[#8A9199]">
                            Exchange rate
                          </span>
                          <span className="ml-2 text-sm tracking-tighter text-[#FE4C30]">
                            1 : 1
                          </span>
                        </div>
                        <div className="text-xs text-[#8A9199]">
                          1 USDT = 1 ADI
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <button
                          type="button"
                          className="mr-2 flex w-1/2 justify-center rounded-full bg-[#1EBE70] px-4 py-2 text-xl font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => setShowModal(false)}
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          className="ml-2 flex w-1/2 justify-center rounded-full bg-[#1EBE70] px-4 py-2 text-xl font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={submitExchange}
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

          <Transition show={confirmModal} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setShowModal(false)}
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
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 pt-12 text-left align-middle shadow-xl transition-all">
                      <div className="mb-12 text-base tracking-tighter text-[#18191A]">
                        Exchange successful. Check in wallet!
                      </div>

                      <button
                        type="button"
                        className="ml-2 flex w-full justify-center rounded-full bg-[#1EBE70] px-4 py-2 text-xl font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setConfirmModal(false)}
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
      </div>
      <LoadingSpinner isLoading={isLoading} />
    </>
  );
};

Exchange.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default Exchange;
