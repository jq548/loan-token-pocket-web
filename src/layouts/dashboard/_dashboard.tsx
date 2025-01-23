import { useState } from 'react';
import cn from 'classnames';
import { useWindowScroll } from '@/lib/hooks/use-window-scroll';
import Hamburger from '@/components/ui/hamburger';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useDrawer } from '@/components/drawer-views/context';
import Sidebar from '@/layouts/dashboard/_sidebar';
import React, { FC, useMemo } from 'react';
import logo from '@/assets/images/global/logo.png';
import Image from '@/components/ui/image';
import walletIcon from '@/assets/images/global/wallet-icon.png';
import { useWeb3 } from "@/contexts/Web3Context";


export function Header() {
  const { openDrawer } = useDrawer();
  const isMounted = useIsMounted();
  let windowScroll = useWindowScroll();
  const { web3, account, connectWallet, disconnectWallet } = useWeb3();

  return (
    <nav
      className={`fixed top-0 z-30 w-full transition-all duration-300 ltr:right-0 rtl:left-0 ltr:xl:pl-72 rtl:xl:pr-72 ltr:2xl:pl-80 rtl:2xl:pr-80 ${
        isMounted && windowScroll.y > 10
          ? 'h-16 bg-gradient-to-b from-white to-white/80 shadow-card backdrop-blur dark:from-dark dark:to-dark/80 sm:h-20'
          : 'h-16 sm:h-24'
      }`}
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10 3xl:px-12">
        <div className="flex items-center">
          <Image
            height={50} // Reduce the height
            width={150} // Reduce the width
            src={logo}
            alt="Logo"
            className="mr-4"
          />
        </div>

        <div className="flex items-center">
        <button onClick={connectWallet} className="mr-4 flex rounded-full border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700">
          <Image width={16} height={16} src={walletIcon} alt="wallet-icon"></Image>    
          {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
        </button>
          <Hamburger
            isOpen={false}
            onClick={() => openDrawer('DASHBOARD_SIDEBAR')}
            variant="transparent"
            className="text-black"
          />
        </div>
      </div>
    </nav>
  );
}

interface DashboardLayoutProps {
  contentClassName?: string;
}

export default function Layout({
  children,
  contentClassName,
}: React.PropsWithChildren<DashboardLayoutProps>) {
  return (
    <div className="ltr:xl:pl-72 rtl:xl:pr-72 ltr:2xl:pl-80 rtl:2xl:pr-80">
      <Header />
      <Sidebar className="hidden xl:block" />
      <main
        className={cn(
          'h-[100vh] px-3 pt-24 pb-16 sm:px-6 sm:pb-20 lg:px-8 xl:px-10 xl:pb-24 3xl:px-12',
          contentClassName
        )}
      >
        {children}
      </main>
    </div>
  );
}
