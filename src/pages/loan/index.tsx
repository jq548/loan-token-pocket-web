// loan
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/dashboard/_dashboard';
import LoanIcon from '@/assets/images/loan/loan-icon-1.png';
import Image from '@/components/ui/image';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Loan: NextPageWithLayout = () => {
  const router = useRouter();
  const [pledgeAmount, setPledgeAmount] = useState('0.00');
  const [obtainFunds, setObtainFunds] = useState(0);

  const handleToReceive = () => {
    router.push('/receiveLoan');
  };
  return (
    <div className="h-full rounded-3xl bg-white">
      <main className="w-full max-w-screen-lg rounded-lg">
        <div className="bg-[#f4f4f4]">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-4xl font-bold text-black">Borrow</h1>
            <p className="text-xl text-black">
              <span className="text-gray-400" style={{ letterSpacing: '-2px' }}>
                ALEO Price
              </span>{' '}
              $1.59
            </p>
          </div>

          <p className="pb-6 text-[#1EBE70]">Pledge Aleo to obtain funds</p>
        </div>

        <div
          className="mt-[-16px] rounded-3xl p-6 pb-16"
          style={{ background: 'linear-gradient(90deg, #02090F, #032D2B)' }}
        >
          <div className="mb-2 flex items-center text-xl text-yellow-400">
            <Image width={20} height={20} src={LoanIcon}></Image>
            <span className="ml-2 text-[#FA9825]">ALEO Balance</span>
          </div>
          <h2 className="flex text-4xl font-bold text-white">
            <span className="mr-1 text-xl">$</span>
            <div className="flex items-end">
              84.20
              <i className="ml-2 text-2xl">ALEO</i>
            </div>
          </h2>
        </div>

        <div className="h-600 mt-[-40px] rounded-3xl bg-white p-6">
          <div className="mb-2 text-2xl font-bold text-black">Pledge</div>
          <div className="flex gap-2">
            <button className="flex-1 rounded-lg border border-black bg-white py-3 text-gray-700">
              ALEO
            </button>
            <button className="flex-1 rounded-lg border border-black bg-white py-3 text-gray-700">
              POS NODE ALEO
            </button>
          </div>

          <div className="mt-4 flex items-center rounded-lg bg-gray-100 px-4 py-2">
            <div className="flex flex-grow items-center">
              <span className="text-[#FE4C30]">ALEO</span>
              <input
                type="number"
                value={pledgeAmount}
                onChange={(e) => setPledgeAmount(e.target.value)}
                className="w-full border-0 bg-transparent text-3xl font-bold text-[#18191A]"
              />
            </div>
            <button className="ml-auto rounded-lg bg-[#1EBE70] px-6 py-3 text-white">
              MAX
            </button>
          </div>
          <div className="relative mb-1 mt-6">
            <label className="absolute left-4 top-[-7px] block bg-white text-xs text-black">
              Obtain funds
            </label>
            <input
              type="number"
              value={obtainFunds}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-xl text-[#B8C2CC]"
            />
            <label className="absolute right-4 top-4 block bg-white text-xs text-black">
              AIDI
            </label>
          </div>

          <p className="mb-10 text-xs text-[#8A9199]">
            Weekly interest rate 0.4%–0.8%
          </p>

          <button
            className="mt-6 w-full rounded-full bg-green-500 px-6 py-3 text-white"
            onClick={handleToReceive}
          >
            Confirm
          </button>
        </div>
      </main>
    </div>
  );
};

Loan.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Loan;
