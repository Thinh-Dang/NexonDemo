import * as React from 'react';
import { SVGProps } from 'react';

export const RingIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.787 2.568 6.96 4.032a1.333 1.333 0 0 0 2.082 0l1.171-1.464a.667.667 0 0 0-.15-.972l-.84-.56a2.2 2.2 0 0 0-2.443 0l-.84.56a.667.667 0 0 0-.152.972Z"
      fill="#22313F"
    />
    <path
      opacity={0.35}
      d="M8 14.667a5.34 5.34 0 0 1-5.333-5.334A5.34 5.34 0 0 1 8 4a5.34 5.34 0 0 1 5.333 5.333A5.34 5.34 0 0 1 8 14.667ZM8 6a3.337 3.337 0 0 0-3.333 3.333A3.337 3.337 0 0 0 8 12.667a3.337 3.337 0 0 0 3.333-3.334A3.337 3.337 0 0 0 8 6Z"
      fill="#22313F"
    />
  </svg>
);
