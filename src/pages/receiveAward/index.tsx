// components/ReceiveAward.js
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/dashboard/_dashboard';
import BackIcon from '@/assets/images/global/back-icon.png';
import Image from '@/components/ui/image';
import { useRouter } from 'next/router';

const ReceiveAward: NextPageWithLayout = () => {
  const router = useRouter();
  const data = [
    {
      number: 1,
      time: '2023-05-12',
      quantity: 100,
      hash: 1,
    },
    {
      number: 2,
      time: '2023-05-12',
      quantity: 100,
      hash: 2,
    },
    {
      number: 3,
      time: '2023-05-12',
      quantity: 100,
      hash: 3,
    },
    {
      number: 4,
      time: '2023-05-12',
      quantity: 100,
      hash: 4,
    },
    {
      number: 5,
      time: '2023-05-12',
      quantity: 100,
      hash: 5,
    },
    {
      number: 6,
      time: '2023-05-12',
      quantity: 100,
      hash: 6,
    },
    {
      number: 7,
      time: '2023-05-12',
      quantity: 100,
      hash: 7,
    },
    {
      number: 8,
      time: '2023-05-12',
      quantity: 100,
      hash: 8,
    },
    {
      number: 9,
      time: '2023-05-12',
      quantity: 100,
      hash: 9,
    },
    {
      number: 10,
      time: '2023-05-12',
      quantity: 100,
      hash: 10,
    },
    {
      number: 11,
      time: '2023-05-12',
      quantity: 100,
      hash: 11,
    },
    {
      number: 12,
      time: '2023-05-12',
      quantity: 100,
      hash: 12,
    },
    {
      number: 13,
      time: '2023-05-12',
      quantity: 100,
      hash: 13,
    },
  ];

  const handleReturn = () => {
    // return back to previous page
    router.back();
  };

  return (
    <main className="h-full w-full max-w-screen-lg rounded-lg">
      {/* return button */}
      <div className="pointer mb-6 flex items-center" onClick={handleReturn}>
        <Image width={20} height={16} src={BackIcon}></Image>
        <span className="ml-2 text-3xl font-bold tracking-tighter text-black">
          Record
        </span>
      </div>

      <div className="relative overflow-x-auto shadow-md">
        <div className="sticky top-0 z-10 grid grid-cols-4 gap-4 bg-[#F3F5F6] p-2 text-xs text-[#5C6166]">
          <div className="text-center">Number</div>
          <div className="text-center">Time</div>
          <div className="text-center">Quantity</div>
          <div className="text-center">Hash</div>
        </div>
        <div className="h-[76vh] overflow-y-auto">
          {data.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-4 gap-4 p-3 ${
                index % 2 !== 0 ? 'bg-[#F3F5F6]' : 'bg-white'
              }`}
            >
              <div className="text-center text-sm tracking-tighter text-[#18191A]">
                {item.number}
              </div>
              <div className="text-center text-sm tracking-tighter text-[#18191A]">
                {item.time}
              </div>
              <div className="text-center text-sm tracking-tighter text-[#18191A]">
                {item.quantity}
              </div>
              <div className="text-center text-sm tracking-tighter text-[#18191A]">
                {item.hash}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

ReceiveAward.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ReceiveAward;
