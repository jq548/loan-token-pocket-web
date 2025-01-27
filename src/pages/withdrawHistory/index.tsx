// withdraw history
import { useEffect, useState } from 'react';
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/dashboard/_dashboard';
import BackIcon from '@/assets/images/global/back-icon.png';
import CopyIcon from '@/assets/images/global/copy-icon.png';
import Image from '@/components/ui/image';
import { getProvideIncomeWithrawRecord } from '@/apis';
import { useRouter } from 'next/router';

const WithdrawHistory: NextPageWithLayout = () => {
  const router = useRouter();
  const [historyList, setHistoryList] = useState([
    {
      provider: '0',
      amount: '0',
      hash: '0',
      at: 0,
    },
  ]);
  const getProvideIncomeWithrawRecordApi = async () => {
    const res = await getProvideIncomeWithrawRecord({
      address: '0x301e5039A65cbf62599dD74F397B1Abdf4eAaAaf',
    });
    setHistoryList(res);
  };

  const handleCopy = (hash: string) => {
    // copy to clipboard
    navigator.clipboard.writeText(hash);
    alert('Copied to clipboard');
  };

  useEffect(() => {
    // getProvideIncomeWithrawRecordApi();
  }, []);

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
                {item.at}
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
                    {item.provider}
                  </span>
                  <Image
                    width={12}
                    height={12}
                    src={CopyIcon}
                    onClick={() => handleCopy(item.provider)}
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
