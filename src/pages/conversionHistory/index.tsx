// conversion history
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/dashboard/_dashboard';
import BackIcon from '@/assets/images/global/back-icon.png';
import CopyIcon from '@/assets/images/global/copy-icon.png';
import Image from '@/components/ui/image';
import { useRouter } from 'next/router';
import { getExchangeRecord } from '@/apis';
import { useEffect, useState } from 'react';

const ConversionHistory: NextPageWithLayout = () => {
  const router = useRouter();
  // const historyList = [
  //   {
  //     date: '2023-08-16 17:21',
  //     quantity: '500.00',
  //     USDTQuantity: '499.00',
  //     exchangeRate: '1USDT=0.99 xxx',
  //   },
  //   {
  //     date: '2023-08-17 17:21',
  //     quantity: '500.00',
  //     USDTQuantity: '499.00',
  //     exchangeRate: '1USDT=0.99 xxx',
  //   },
  //   {
  //     date: '2023-08-18 17:21',
  //     quantity: '500.00',
  //     USDTQuantity: '499.00',
  //     exchangeRate: '1USDT=0.99 xxx',
  //   },
  //   {
  //     date: '2023-08-19 17:21',
  //     quantity: '500.00',
  //     USDTQuantity: '499.00',
  //     exchangeRate: '1USDT=0.99 xxx',
  //   },
  //   {
  //     date: '2023-08-20 17:21',
  //     quantity: '500.00',
  //     USDTQuantity: '499.00',
  //     exchangeRate: '1USDT=0.99 xxx',
  //   },
  //   {
  //     date: '2023-08-21 17:21',
  //     quantity: '500.00',
  //     USDTQuantity: '499.00',
  //     exchangeRate: '1USDT=0.99 xxx',
  //   },
  //   {
  //     date: '2023-08-22 17:21',
  //     quantity: '500.00',
  //     USDTQuantity: '499.00',
  //     exchangeRate: '1USDT=0.99 xxx',
  //   },
  //   {
  //     date: '2023-08-23 17:21',
  //     quantity: '500.00',
  //     USDTQuantity: '499.00',
  //     exchangeRate: '1USDT=0.99 xxx',
  //   },
  // ];
  const [historyList, setHistoryList] = useState([
    {
      type: 1, // 1:lp to usdt, 2:usdt to lp
      address: '',
      amount: 1,
      hash: '',
      at: 0,
    },
  ]);
  const getExchangeRecordApi = async () => {
    const res = await getExchangeRecord({
      address: '0x301e5039A65cbf62599dD74F397B1Abdf4eAaAaf',
    });
    setHistoryList(res);
  };

  useEffect(() => {
    getExchangeRecordApi();
  });

  const handlReturn = () => {
    // return back to previous page
    router.back();
  };

  return (
    <main className="w-full max-w-screen-lg rounded-lg">
      {/* return button */}
      <div className="pointer mb-6 flex items-center" onClick={handlReturn}>
        <Image width={20} height={16} src={BackIcon}></Image>
        <span className="ml-2 text-3xl font-bold tracking-tighter text-black">
          Record
        </span>
      </div>
      <div>
        {historyList.map((item) => {
          return (
            <div className="mt-4 rounded-3xl bg-white py-4 px-6" key={item.at}>
              <div className="flex items-end justify-between">
                <div className="text-xl font-bold tracking-tighter text-[#FA9825]">
                  {/* xxx &gt; USDT */}
                  {item.type === 1 ? 'ADI > USDT' : 'USDT > ADI'}
                </div>
                <div className="text-sm tracking-tighter text-[#5C6166]">
                  {item.at}
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-base tracking-tighter text-[#8A9199]">
                    Quantity
                  </span>
                  <span className="ml-1 text-xl font-bold tracking-tighter text-[#18191A]">
                    {item.amount}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base tracking-tighter text-[#8A9199]">
                    USDT quantity
                  </span>
                  <span className="ml-1 text-xl font-bold tracking-tighter text-[#18191A]">
                    {item.hash}
                  </span>
                </div>
              </div>
              <div className="mt-2 flex items-end justify-between">
                <div className="text-sm tracking-tighter text-[#5C6166]">
                  exchange rate
                </div>
                <div className="text-sm tracking-tighter text-[#18191A]">
                  1 USDT = 1 ADI
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

ConversionHistory.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ConversionHistory;
