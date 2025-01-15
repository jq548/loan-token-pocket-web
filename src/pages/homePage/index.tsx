// homgPage
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/dashboard/_dashboard';
import { useRef, useEffect, useState } from 'react';
import BannerIcon from '@/assets/images/loan/banner.png';
import WarningIcon from '@/assets/images/loan/warning-icon-2.png';
import Image from '@/components/ui/image';
import { circleBarConfig, lineConfig } from './chartsConfig';
import * as echarts from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PolarComponent,
  GridComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
  PolarComponent,
  LineChart,
  GridComponent,
]);
const HomePage: NextPageWithLayout = () => {
  const circleBarChartRef = useRef(null);
  const lineChartRef = useRef(null);

  const [activeTab, setActiveTab] = useState('1m');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (!circleBarChartRef.current || !lineChartRef.current) return;

    const circleBarChartInstance = echarts.init(circleBarChartRef.current);
    const lineChartInstance = echarts.init(lineChartRef.current);

    circleBarChartInstance.setOption(circleBarConfig());
    lineChartInstance.setOption(lineConfig());

    window.addEventListener('resize', () => {
      circleBarChartInstance.resize();
      lineChartInstance.resize();
    });

    return () => {
      window.removeEventListener('resize', () => {
        circleBarChartInstance.resize();
        lineChartInstance.resize();
      });
      circleBarChartInstance.dispose();
      lineChartInstance.dispose();
    };
  }, []);
  return (
    <div className="h-full rounded-3xl">
      <main className="w-full max-w-screen-lg rounded-lg">
        <div className="mb-3 rounded-3xl">
          <Image className="w-full" height={600} src={BannerIcon}></Image>
        </div>

        <section className="mb-4 pb-4">
          <div className="rounded-3xl bg-white p-6">
            <div className="mb-6 text-3xl font-bold tracking-tighter text-[#18191A]">
              Sunpply info
            </div>

            <div className="mb-6 flex w-full">
              {/* charts circleBarConfig show */}
              <div className="mr-4 w-1/3">
                <div
                  ref={circleBarChartRef}
                  style={{ width: '100%', height: '100%' }}
                ></div>
              </div>
              {/* field info */}
              <div className="w-2/3">
                <p className="mb-2 text-sm tracking-tighter text-[#737980]">
                  Total supplied
                </p>
                <p className="mb-2 text-base font-bold tracking-tighter text-[#18191A]">
                  $500.365 of $2255200
                </p>
                <p className="mb-2 text-sm tracking-tighter text-[#737980]">
                  Total Mortqaqe quantity
                </p>
                <p className="text-base font-bold tracking-tighter text-[#18191A]">
                  10025.25 ALEO
                </p>
              </div>
            </div>

            <div className="flex justify-around rounded-2xl border border-[#E8EAEB] bg-[#F3F5F6] px-2 py-4">
              <div className="flex flex-col items-center justify-center">
                <div className="text-3xl font-bold tracking-tighter text-[#FA9825]">
                  5.14
                </div>
                <div className="mt-2 flex items-center">
                  <span className="mr-2 tracking-tighter text-[#8A9199]">
                    AOY,variable
                  </span>
                  <Image width={16} height={16} src={WarningIcon}></Image>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="flex items-start font-bold tracking-tighter text-[#18191A]">
                  <span className="text-xl">$</span>
                  <span className="text-3xl">2255200</span>
                </div>
                <div className="mt-2 flex items-center">
                  <span className="mr-2 tracking-tighter text-[#8A9199]">
                    Reserve Size
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 h-[180px] w-full">
              <div className="flex items-center justify-between">
                <div className="mr-8 text-base tracking-tighter text-[#18191A]">
                  Borrow apr,variable
                </div>

                <div className="flex-1 overflow-hidden rounded-lg bg-gray-100">
                  <button
                    className={`w-1/3 rounded-lg py-1 text-center font-medium ${
                      activeTab === '1m'
                        ? 'bg-white text-black'
                        : 'text-gray-500'
                    }`}
                    onClick={() => handleTabClick('1m')}
                  >
                    1m
                  </button>
                  <button
                    className={`w-1/3 rounded-lg py-1 text-center font-medium ${
                      activeTab === '6m'
                        ? 'bg-white text-black'
                        : 'text-gray-500'
                    }`}
                    onClick={() => handleTabClick('6m')}
                  >
                    6m
                  </button>
                  <button
                    className={`w-1/3 rounded-lg py-1 text-center font-medium ${
                      activeTab === '1y'
                        ? 'bg-white text-black'
                        : 'text-gray-500'
                    }`}
                    onClick={() => handleTabClick('1y')}
                  >
                    1y
                  </button>
                </div>
              </div>

              <div className="mt-4 h-[150px] w-full" ref={lineChartRef}></div>
            </div>

            <button className="mt-4 w-full rounded-full bg-[#1EBE70] px-6 py-3 font-bold text-white">
              Apply for a loan
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

HomePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default HomePage;
