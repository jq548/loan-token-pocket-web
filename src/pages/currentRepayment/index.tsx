// current repayment
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/dashboard/_dashboard';
import BackIcon from '@/assets/images/global/back-icon.png';
import WarnIcon from '@/assets/images/loan/warning-icon-2.png';
import Image from '@/components/ui/image';
import { useRouter } from 'next/router';

const LoanDetails: NextPageWithLayout = () => {
  const router = useRouter();

  const handlReturn = () => {
    // return back to previous page
    router.back();
  };

  return (
    <main className="flex h-full w-full max-w-screen-lg flex-col justify-between rounded-lg">
      <div>
        {/* return button */}
        <div className="pointer mb-10 flex items-center" onClick={handlReturn}>
          <Image width={20} height={16} src={BackIcon}></Image>
          <span className="ml-2 text-3xl font-bold tracking-tighter text-black">
            Return
          </span>
        </div>

        <div className="text-sm tracking-tighter text-[#5C6166]">
          current interest repayment amount
        </div>

        <div className="mt-2 flex items-end">
          <span className="text-3xl font-bold tracking-tighter text-[#18191A]">
            1.25
          </span>
          <span className="ml-1 text-xl font-bold tracking-tighter text-[#18191A]">
            USDT
          </span>
        </div>

        <div className="mt-4 rounded-3xl border border-[#E8EAEB] bg-white p-5 shadow-[0px_20px_50px_0px_rgba(7,17,53,0.05)]">
          <div className="mb-4 flex w-full items-center justify-between">
            <div className="text-base tracking-tighter text-[#8A9199]">
              Current repayment period
            </div>
            <div className="text-base text-[#18191A]">1</div>
          </div>

          <div className="mb-4 flex w-full items-center justify-between">
            <div className="text-base tracking-tighter text-[#8A9199]">
              Current principal repayment amount
            </div>
            <div className="text-base text-[#18191A]">0</div>
          </div>

          <div className="mb-4 text-base font-[700] tracking-tighter text-[#1EBE70]">
            Repaying interest with platform coins enjoys a 15% discount.
          </div>

          <div className="text-base font-[400] text-[#1EBE70]">1.15平台币</div>
        </div>
      </div>

      <button className="mt-4 w-full rounded-full bg-[#1EBE70] px-6 py-3 font-bold text-white">
        Payment
      </button>
    </main>
  );
};

LoanDetails.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default LoanDetails;
