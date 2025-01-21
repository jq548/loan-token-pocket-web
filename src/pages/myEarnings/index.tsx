import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/dashboard/_dashboard';
import { useRouter } from 'next/router';

const MyEarnings: NextPageWithLayout = () => {
  const list = [
    {
      sevenDayLockedStorage: '61023.36USDT',
      annualInterestRate: '9.65%',
      cumulativeIncome: '456.35',
    },
    {
      sevenDayLockedStorage: '61023.36USDT',
      annualInterestRate: '9.65%',
      cumulativeIncome: '456.35',
    },
    {
      sevenDayLockedStorage: '61023.36USDT',
      annualInterestRate: '9.65%',
      cumulativeIncome: '456.35',
    },
    {
      sevenDayLockedStorage: '61023.36USDT',
      annualInterestRate: '9.65%',
      cumulativeIncome: '456.35',
    },
  ];

  const router = useRouter();
  const handleToWithdraw = () => {
    router.push('/withdraw');
  };
  return (
    <>
      <div className="mx-auto max-w-7xl px-2">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="text-sm text-[#18191A]">Total assets</div>
            <div className="text-4xl font-bold text-[#18191A]">
              9765.325
              <span className="ml-2 text-xl">USDT</span>
            </div>
          </div>
          <div
            className="flex items-center rounded-xl bg-[#1EBE70] p-3 text-base font-medium text-white"
            onClick={handleToWithdraw}
          >
            Withdraw
          </div>
        </div>

        <div className="flex">
          <div className="w-3/5">
            <div className="text-sm tracking-tighter text-[#5C6166]">
              30-day cumulative income
            </div>
            <div className="text-lg font-bold text-[#1EBE70]">+125.36</div>
          </div>
          <div className="w-2/5">
            <div className="text-sm tracking-tighter text-[#5C6166]">
              Yesterday's income
            </div>
            <div className="text-lg font-bold text-[#FA9825]">+5.36</div>
          </div>
        </div>

        {list.map((item) => {
          return (
            <div className="mt-4 rounded-2xl border border-[#E8EAEB] bg-white p-4 shadow-[0px_20px_50px_0px_rgba(7,17,53,0.05)]">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium tracking-tighter text-[#8A9199]">
                  7-day locked storage
                </div>
                <div className="text-sm font-bold tracking-tighter text-[#18191A]">
                  {item.sevenDayLockedStorage}
                </div>
              </div>
              <div className="mt-4 flex">
                <div className="flex w-1/2 flex-col items-center justify-center">
                  <div className="text-xl font-bold tracking-tighter text-[#18191A]">
                    {item.annualInterestRate}
                  </div>
                  <div className="text-sm font-medium tracking-tighter text-[#8A9199]">
                    annual interest rate
                  </div>
                </div>
                <div className="flex w-1/2 flex-col items-center justify-center">
                  <div className="text-xl font-bold tracking-tighter text-[#18191A]">
                    {item.cumulativeIncome}
                  </div>
                  <div className="text-sm font-medium tracking-tighter text-[#8A9199]">
                    cumulative income
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

MyEarnings.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default MyEarnings;
