import { useState, useEffect } from 'react';

/**
 * @returns {isMobile: bool}
 * ref: https://www.thiscodeworks.com/usedevicedetect-hook-react-js-hooks/5f9071357aad9600147f8682
 */
export default function useDeviceDetect() {
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const userAgent =
      typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );
    setMobile(mobile);
  }, []);

  return { isMobile };
}
