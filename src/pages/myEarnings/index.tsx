import { useEffect, useState } from 'react';
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/dashboard/_dashboard';
import { getProvideRecord } from '@/apis';
import { useRouter } from 'next/router';

const MyEarnings: NextPageWithLayout = () => {
  const handleToWithdrawal = () => {
    router.push('/withdrawal');
  };

  const [pageData, setPageData] = useState({
    total_provide: '0',
    income_30: '0',
    income_yesterday: '0',
    provide_record: [
      {
        days: 30,
        amount: '1000.00',
        rate_year: '5.00',
        total_income: '41.09',
        duration: 2592000,
        start: 1706169600,
        status: 0,
        provider: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
        create_at: 1706169540,
        create_hash:
          '0x6c9f2f9c8e5d8b2a5e2b1f9c4f8e7d6f7b8a9e4d3f2b1c0a9d8e7f2b4d5a6c7b',
        retrieve_at: null,
        retrieve_hash: null,
        record_id: 12345,
        yesterday_income: '0.13',
        total_income_dec: '41.095890410958904',
        yesterday_income_dec: '0.136986301369863',
        income_start_day: '2024-01-26',
        income_end_day: '2024-02-25',
      },
    ],
  });

  const getProvideRecordApi = async () => {
    const res = await getProvideRecord({
      address: '0x301e5039A65cbf62599dD74F397B1Abdf4eAaAaf',
    });
    setPageData(res);
  };

  useEffect(() => {
    // getProvideRecordApi();
  });

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
                onClick={handleToWithdrawal}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium tracking-tighter text-[#8A9199]">
                    7-day locked storage
                  </div>
                  <div className="text-sm font-bold tracking-tighter text-[#18191A]">
                    {item.amount}
                  </div>
                </div>
                <div className="mt-4 flex">
                  <div className="flex w-1/2 flex-col items-center justify-center">
                    <div className="text-xl font-bold tracking-tighter text-[#18191A]">
                      {item.rate_year}
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
