import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/dashboard/_dashboard';
import { useRouter } from 'next/router';
import { useRef, useEffect, useState, Fragment } from 'react';
import Image from '@/components/ui/image';
import BackIcon from '@/assets/images/global/back-icon.png';
import { circleBarConfig } from './chartsConfig';
import { Dialog, Transition } from '@headlessui/react';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PolarComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
  PolarComponent,
]);

const ReceiveLoanPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [pledgeAmount, setPledgeAmount] = useState('0.00');
  const circleBarChartRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handlReturn = () => {
    // return back to previous page
    router.back();
  };

  useEffect(() => {
    if (!circleBarChartRef.current) return;

    const circleBarChartInstance = echarts.init(circleBarChartRef.current);

    circleBarChartInstance.setOption(circleBarConfig());

    window.addEventListener('resize', () => circleBarChartInstance.resize());

    return () => {
      window.removeEventListener('resize', () =>
        circleBarChartInstance.resize()
      );
      circleBarChartInstance.dispose();
    };
  }, []);

  return (
    <>
      <main className="flex h-[100%] w-full max-w-screen-lg flex-col justify-between rounded-lg">
        <div>
          {/* return button */}
          <div className="pointer mb-6 flex items-center" onClick={handlReturn}>
            <Image width={20} height={16} src={BackIcon}></Image>
            <span className="ml-2 text-3xl font-bold tracking-tighter text-black">
              Supplement
            </span>
          </div>

          <div className="mt-10 flex items-center justify-between">
            <div className="w-1/2 text-base tracking-tighter text-[#5C6166]">
              Asset value at the time of mortgage
            </div>
            <div className="flex items-end text-[#18191A]">
              <span className="text-2xl font-bold">1888</span>
              <span className="text-xl font-bold">USDT</span>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between">
            <div className="w-1/2 text-base tracking-tighter text-[#5C6166]">
              Current mortgaged asset value
            </div>
            <div className="flex items-end text-[#18191A]">
              <span className="text-2xl font-bold">1700</span>
              <span className="text-xl font-bold">USDT</span>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between rounded-3xl border border-[#E8EAEB] bg-[#FFFFFF] px-4 py-2">
            <div
              ref={circleBarChartRef}
              className="mr-4 w-1/4"
              style={{ height: '100%' }}
            ></div>
            <div className="w-3/4">
              <div className="text-sm tracking-tighter text-[#737980]">
                Mortgaged asset health value
              </div>
              <div className="mt-3 font-bold text-[#18191A]">80%</div>
            </div>
          </div>

          <div className="mt-6 flex items-center rounded-lg border border-[#E8EAEB] bg-white p-2 pl-4">
            <div className="flex flex-grow items-center">
              <span className="text-[#FE4C30]">ALEO</span>
              <input
                type="number"
                value={pledgeAmount}
                onChange={(e) => setPledgeAmount(e.target.value)}
                // 去掉边框
                className="w-full border-0 bg-transparent text-2xl font-bold text-[#18191A]"
              />
            </div>
            <button className="ml-auto rounded-lg bg-[#1EBE70] px-6 py-3 text-white">
              MAX
            </button>
          </div>

          <div className="mt-2 text-sm tracking-tighter text-[#8A9199]">
            Balance：5263.36
          </div>

          <p className="mt-8 text-sm tracking-tighter text-[#8A9199]">
            The mortgaged asset health value needs to be recharged to restore it
            to the normal range.:
          </p>

          <div className="mt-6 flex items-end text-[#18191A]">
            <span className="text-2xl font-bold">532.35</span>
            <span className="text-xl font-bold">ALEO</span>
          </div>

          {/* <div className="mt-10 text-xl font-bold tracking-tighter text-[#5C6166]">
            Declaration
          </div>

          <p className="mt-3 text-sm tracking-tighter text-[#8A9199]">
            When the mortgaged asset health value is lower than 75%, the system
            will automatically close out positions and sell assets to repay the
            loan.
          </p>

          <p className="mt-6 text-sm tracking-tighter text-[#8A9199]">
            You can increase your mortgaged assets or repay part of the assets
            to restore the health value of your mortgaged assets.
          </p> */}
        </div>
        <button
          className="mt-6 w-full rounded-full bg-[#1EBE70] px-6 py-3 font-bold text-white"
          onClick={() => setOpen(true)}
        >
          Increase mortgaged assets.
        </button>
      </main>

      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpen(false)}
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

          <div className="fixed inset-x-0 bottom-0 p-4">
            <div className="w-full max-w-md rounded-3xl bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                <h2 className="w-2/3 text-lg font-medium tracking-tighter text-[#18191A]">
                  Select the mortgaged coin to be used.
                </h2>
                <button
                  type="button"
                  className="ml-auto flex-shrink-0 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6 text-gray-400 hover:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-4 px-4 py-3">
                <div className="mb-2 flex items-center justify-between space-x-3">
                  <label
                    htmlFor="usdt"
                    className="block text-base font-medium text-gray-900"
                  >
                    USDT
                  </label>
                  <input
                    id="usdt"
                    name="coin"
                    type="radio"
                    value="USDT"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex items-center justify-between space-x-3">
                  <label
                    htmlFor="aleo"
                    className="block text-base font-medium text-gray-900"
                  >
                    ALEO
                  </label>
                  <input
                    id="aleo"
                    name="coin"
                    type="radio"
                    value="ALEO"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

ReceiveLoanPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ReceiveLoanPage;
