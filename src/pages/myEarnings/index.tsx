import { useEffect, useState } from 'react';
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/dashboard/_dashboard';
import { getProvideRecord } from '@/apis';
import { useRouter } from 'next/router';
import { useWeb3 } from '@/contexts/Web3Context';

const MyEarnings: NextPageWithLayout = () => {
  const { web3, account, usdtContract, lpContract, loanContract } = useWeb3();

  const handleToWithdrawal = (record: any) => {
    const id = record.record_id;
    localStorage.setItem(`myEarning-${id}`, JSON.stringify(record));
    router.push(`/withdrawal?id=${id}`);
  };

  const [pageData, setPageData] = useState({
    total_provide: '0',
    income_30: '0',
    income_yesterday: '0',
    provide_record: [
      {
        days: 0,
        amount: '',
        rate_year: '',
        total_income: '',
        duration: 0,
        start: 0,
        status: 0,
        provider: '',
        create_at: 0,
        create_hash: '',
        retrieve_at: 0,
        retrieve_hash: '',
        record_id: 0,
        yesterday_income: '0',
        total_income_dec: '',
        yesterday_income_dec: '',
        income_start_day: '',
        income_end_day: '',
      },
    ],
  });

  const getProvideRecordApi = async () => {
    if (!account) {
      return;
    }
    const res = await getProvideRecord({
      address: account,
    });
    setPageData(res);
  };

  useEffect(() => {
    getProvideRecordApi();
  }, [account]);

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
              {pageData.total_provide}
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
            <div className="text-lg font-bold text-[#1EBE70]">
              {pageData.income_30}
            </div>
          </div>
          <div className="w-2/5">
            <div className="text-sm tracking-tighter text-[#5C6166]">
              Yesterday's income
            </div>
            <div className="text-lg font-bold text-[#FA9825]">
              {pageData.income_yesterday}
            </div>
          </div>
        </div>

        {pageData.provide_record &&
          pageData.provide_record.length &&
          pageData.provide_record.map((item) => {
            return (
              <div
                className="mt-4 rounded-2xl border border-[#E8EAEB] bg-white p-4 shadow-[0px_20px_50px_0px_rgba(7,17,53,0.05)]"
                key={item.record_id}
                onClick={() => handleToWithdrawal(item)}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium tracking-tighter text-[#8A9199]">
                    {item.days}-day locked storage
                  </div>
                  <div className="text-sm font-bold tracking-tighter text-[#18191A]">
                    {item.amount}
                  </div>
                </div>
                <div className="mt-4 flex">
                  <div className="flex w-1/2 flex-col items-center justify-center">
                    <div className="text-xl font-bold tracking-tighter text-[#18191A]">
                      {item.rate_year}%
                    </div>
                    <div className="text-sm font-medium tracking-tighter text-[#8A9199]">
                      annual interest rate
                    </div>
                  </div>
                  <div className="flex w-1/2 flex-col items-center justify-center">
                    <div className="text-xl font-bold tracking-tighter text-[#18191A]">
                      {item.total_income}
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
