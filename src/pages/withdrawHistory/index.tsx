// withdraw history
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/dashboard/_dashboard';
import BackIcon from '@/assets/images/global/back-icon.png';
import CopyIcon from '@/assets/images/global/copy-icon.png';
import Image from '@/components/ui/image';
import { useRouter } from 'next/router';

const WithdrawHistory: NextPageWithLayout = () => {
  const router = useRouter();
  const historyList = [
    {
      date: '2025-12-12',
      amount: '-5.5',
      hash: 'sa4d56sa4da8***ads465a4d56',
    },
    {
      date: '2025-12-13',
      amount: '-5.5',
      hash: 'sa4d56sa4da8***ads465a4d57',
    },
    {
      date: '2025-12-14',
      amount: '-5.5',
      hash: 'sa4d56sa4da8***ads465a4d58',
    },
    {
      date: '2025-12-15',
      amount: '-5.5',
      hash: 'sa4d56sa4da8***ads465a4d59',
    },
    {
      date: '2025-12-16',
      amount: '-5.5',
      hash: 'sa4d56sa4da8***ads465a4d60',
    },
    {
      date: '2025-12-17',
      amount: '-5.5',
      hash: 'sa4d56sa4da8***ads465a4d61',
    },
    {
      date: '2025-12-18',
      amount: '-5.5',
      hash: 'sa4d56sa4da8***ads465a4d62',
    },
  ];

  const handleCopy = (hash: string) => {
    // copy to clipboard
    navigator.clipboard.writeText(hash);
    alert('Copied to clipboard');
  };

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
            <div
              className="mt-4 rounded-3xl bg-white py-4 px-6"
              key={item.hash}
            >
              <div className="text-sm tracking-tighter text-[#18191A]">
                {item.date}
              </div>
              <div className="mt-1 flex items-end font-bold text-[#18191A]">
                <span className="text-2xl">{item.amount}</span>
                <span className="ml-1 text-lg">USDT</span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <div className="text-sm tracking-tighter text-[#5C6166]">
                  Hash
                </div>
                <div>
                  <span className="mr-1 text-sm tracking-tighter text-[#18191A]">
                    {item.hash}
                  </span>
                  <Image
                    width={12}
                    height={12}
                    src={CopyIcon}
                    onClick={() => handleCopy(item.hash)}
                  ></Image>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

WithdrawHistory.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default WithdrawHistory;
