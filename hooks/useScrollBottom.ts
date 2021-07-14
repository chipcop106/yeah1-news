import { useEffect, useRef, useState } from 'react';
import { checkScrollReachBottom } from '@/helpers/utils';

const useScrollBottom = () => {
  const [isReachBottom, setIsReachBottom] = useState(false);

  const handleScroll = () => {
    const isReach = checkScrollReachBottom();
    setIsReachBottom(isReach);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isReachBottom]);

  return {
    isReachBottom,
  };
};

export default useScrollBottom;
