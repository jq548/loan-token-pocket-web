import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/dashboard/_dashboard';
import Image from '@/components/ui/image';
import QuestionIcon from '@/assets/images/global/question-icon.png';
import { useEffect, useState } from 'react';
import { useWeb3 } from '@/contexts/Web3Context';

const ProvideLiquidity: NextPageWithLayout = () => {
  const [index, setIndex] = useState(0);
  const [usdtBalance, setUsdtBalance] = useState(0);
  const { web3, account, usdtContract, lpContract, loanContract, connectWallet, disconnectWallet } = useWeb3();

  const fetchUsdtBalance = async () => {
    if (!web3 || !account || !usdtContract) {
      return;
    }
    console.log(process.env.LP_CONTRACT);
return;
    try {
      const result = await usdtContract.methods.balanceOf(account).call();
      console.log("合约返回值：", result);
    } catch (error) {
      console.error("调用合约方法失败：", error);
    }
  };

  return (
    <div className="mx-auto flex h-full max-w-7xl flex-col justify-between px-2">
      <div>
        <h2 className="mb-3 text-xl font-bold tracking-tighter text-[#18191A]">
          Deadline & weekly interest rate
        </h2>

        <div className="mb-4 flex flex-wrap gap-2">
          <button
            className={`w-[23%] shrink-0 rounded-xl border border-white bg-white px-3 py-4 ${
              index === 0 ? 'bg-[#1EBE70] text-white' : 'text-[#18191A]'
            }`}
            onClick={() => setIndex(0)}
          >
            7day
          </button>
          <button
            className={`w-[23%] shrink-0 rounded-xl border border-white bg-white p-3 ${
              index === 1 ? 'bg-[#1EBE70] text-white' : 'text-[#18191A]'
            }`}
            onClick={() => setIndex(1)}
          >
            30day
          </button>
          <button
            className={`w-[23%] shrink-0 rounded-xl border border-white bg-white p-3 ${
              index === 2 ? 'bg-[#1EBE70] text-white' : 'text-[#18191A]'
            }`}
            onClick={() => setIndex(2)}
          >
            60day
          </button>
          <button
            className={`w-[23%] shrink-0 rounded-xl border border-white bg-white p-3 ${
              index === 3 ? 'bg-[#1EBE70] text-white' : 'text-[#18191A]'
            }`}
            onClick={() => setIndex(3)}
          >
            90day
          </button>
          <button
            className={`w-[23%] shrink-0 rounded-xl border border-white bg-white p-3 ${
              index === 4 ? 'bg-[#1EBE70] text-white' : 'text-[#18191A]'
            }`}
            onClick={() => setIndex(4)}
          >
            180day
          </button>
        </div>

        <div className="mb-4 flex items-center justify-between text-sm tracking-tighter">
          <div className="flex items-center text-gray-500">
            <span className="mr-2">estimate weekly interest rate</span>
            <Image width={14} height={14} src={QuestionIcon}></Image>
          </div>
          <span className="text-[#FE4C30]">0.5%</span>
        </div>

        <div className="rounded-2xl bg-white p-4 py-8 shadow-[0px_20px_50px_0px_rgba(7,17,53,0.05)]">
          <div className="text-xl font-medium text-gray-900">
            Subscription amount
          </div>
          <div className="mt-2 flex rounded-xl bg-[#E8EAEB] p-2">
            <input
              type="number"
              min="100"
              step="1"
              className="w-full border-0 bg-[transparent] py-2 px-3 text-[#18191A]"
              placeholder="minimum 100USDT"
            />
            <div className="ml-2 flex">
              <div className="pt-2 text-[#18191A]">USDT</div>
              <button onClick={fetchUsdtBalance} className="ml-4 rounded-lg bg-[#1EBE70] px-6 font-bold text-white">
                MAX
              </button>
            </div>
          </div>
          <div className="mt-4 text-gray-600">Balance: {usdtBalance}USDT</div>
        </div>

        <div className="mt-6">
          <div className="text-lg font-bold tracking-tighter text-[#18191A]">
            Overview
          </div>
          <div className="mt-4 px-8">
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content  text-[#18191A]">
                  Subscription Date
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content  text-[#18191A]">
                  Interest Commencement Date
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content text-[#18191A]">
                  Interest Calculation End Date
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="mt-6 w-full rounded-full bg-[#1EBE70] px-6 py-3 font-bold text-white">
        Confirm
      </button>
    </div>
  );
};

ProvideLiquidity.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ProvideLiquidity;
