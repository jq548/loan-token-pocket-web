import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/dashboard/_dashboard';

const MyEarnings: NextPageWithLayout = () => {
  const list = [
    {
      sevenDayLockedStorage: '2023-08-16 17:21',
      provideLiquidity: '500.0',
      platformReward: '300.0',
      releaseRules: 'linear release within 90 days',
    },
    {
      sevenDayLockedStorage: '2023-08-16 17:21',
      provideLiquidity: '500.0',
      platformReward: '300.0',
      releaseRules: 'linear release within 90 days',
    },
    {
      sevenDayLockedStorage: '2023-08-16 17:21',
      provideLiquidity: '500.0',
      platformReward: '300.0',
      releaseRules: 'linear release within 90 days',
    },
    {
      sevenDayLockedStorage: '2023-08-16 17:21',
      provideLiquidity: '500.0',
      platformReward: '300.0',
      releaseRules: 'linear release within 90 days',
    },
  ];
  return (
    <div className="mx-auto max-w-7xl px-2 pb-4">
      <h1 className="mb-4 text-4xl font-bold text-[#18191A]">Reward</h1>

      {list.map((item) => {
        return (
          <div className="mt-4 rounded-2xl bg-white p-4">
            <div className="text-xl font-bold tracking-tighter text-[#FA9825]">
              7-day locked storage
            </div>
            <div className="mt-2 text-sm tracking-tighter text-[#18191A]">
              {item.sevenDayLockedStorage}
            </div>
            <hr className="color-[#F4F4F4] my-4 bg-[#F4F4F4]" />
            <div className="text-sm">
              <div className="mt-4 flex justify-between">
                <div className="tracking-tighter text-[#5C6166]">
                  Provide liquidity
                </div>
                <div className="text-right tracking-tighter text-[#18191A]">
                  {item.provideLiquidity}
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <div className="tracking-tighter text-[#5C6166]">
                  Platform Reward
                </div>
                <div className="text-right tracking-tighter text-[#18191A]">
                  {item.platformReward}
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <div className="tracking-tighter text-[#5C6166]">
                  Release Rules
                </div>
                <div className="text-right tracking-tighter text-[#18191A]">
                  {item.releaseRules}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <div className="flex items-center rounded-full border border-[#000000] px-6 py-2 text-sm font-medium text-[#191722]">
                Receive
              </div>
              <div className="ml-4 inline-flex items-center rounded-full border border-[#000000] px-6 py-2 text-sm font-medium text-[#191722]">
                Details
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

MyEarnings.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default MyEarnings;
