import React from 'react';
import LoadingIcon from '@/assets/images/global/loading-icon.png';
import Image from '@/components/ui/image';
const LoadingSpinner = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
      {/* <div className="h-32 w-32 animate-spin rounded-full border-t-4 border-b-4 border-blue-500"></div> */}
      <div className="relative animate-spin">
        <Image
          src={LoadingIcon}
          alt="Loading..."
          width={48}
          height={48}
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
