// my loan details page
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/dashboard/_dashboard';
import BackIcon from '@/assets/images/global/back-icon.png';
import FileIcon from '@/assets/images/global/file-icon.png';
import Image from '@/components/ui/image';
import { useRouter } from 'next/router';

const Withdraw: NextPageWithLayout = () => {
  const router = useRouter();
  const handlReturn = () => {
    // return back to previous page
    router.back();
  };

  const handleToWithdrawal = () => {
    router.push('/withdrawal');
  };

  const handleToHistory = () => {
    router.push('/withdrawHistory');
  };

  return (
    <main className="flex h-full w-full max-w-screen-lg flex-col justify-between rounded-lg">
      <div>
        {/* return button */}
        <div className="pointer mb-6 flex items-center" onClick={handlReturn}>
          <Image width={20} height={16} src={BackIcon}></Image>
          <span className="ml-2 text-3xl font-bold tracking-tighter text-black">
            Lnteres
          </span>
        </div>

        <div className="mb-2 text-base tracking-tighter text-[#18191A]">
          Lnteres Balance
        </div>

        <div className="mb-8 flex items-end justify-between">
          <div className="flex items-end text-[#18191A]">
            <span className="text-4xl font-bold tracking-tighter">5.325</span>
            <span className="ml-1 text-2xl font-bold">USDT</span>
          </div>
          <div>
            <Image
              width={16}
              height={20}
              src={FileIcon}
              onClick={handleToHistory}
            ></Image>
          </div>
        </div>

        <div className="mb-4 flex rounded-xl border border-[#E8EAEB] py-2 pl-4 pr-2 shadow-[0px_20px_50px_0px_rgba(7,17,53,0.05)]">
          <div className="flex flex-grow items-center">
            <span className="text-[#FE4C30]">ALEO</span>
            <input
              type="number"
              min="100"
              step="1"
              className="w-full border-0 bg-[transparent] py-2 px-3 text-2xl text-[#B8C2CC]"
              placeholder="0.0"
            />
          </div>
          <button className="ml-4 rounded-lg bg-[#1EBE70] px-6 font-bold text-white">
            MAX
          </button>
        </div>

        <div className="mb-8 flex items-center text-sm tracking-tighter">
          <span className="text-[#18191A]">Actual amount received</span>
          <span className="text-[#FE4C30]">4.5USDT</span>
        </div>

        <div className="text-sm tracking-tighter text-[#18191A]">
          <div className="mb-4 tracking-tighter">
            1.Withdrawal can only be made to the current address.
          </div>
          <div className="mb-4 tracking-tighter">
            2.Only one withdrawal can be made per day.
          </div>
          <div className="mb-4 tracking-tighter">
            3.The withdrawal handling fee is 1u.
          </div>
        </div>
      </div>
      <button
        className="mt-6 w-full rounded-full bg-[#1EBE70] px-6 py-3 font-bold text-white"
        onClick={handleToWithdrawal}
      >
        Withdrawal
      </button>
    </main>
  );
};

Withdraw.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Withdraw;
