import * as React from 'react';
import { SVGProps } from 'react';

export const SettingIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.94 3.42 11.77.43c-.99-.57-2.54-.57-3.53 0L3.02 3.44C.95 4.84.83 5.05.83 7.28v5.43c0 2.23.12 2.45 2.23 3.87l5.17 2.99c.5.29 1.14.43 1.77.43.63 0 1.27-.14 1.76-.43l5.22-3.01c2.07-1.4 2.19-1.61 2.19-3.84V7.28c0-2.23-.12-2.44-2.23-3.86ZM10 13.25c-1.79 0-3.25-1.46-3.25-3.25S8.21 6.75 10 6.75s3.25 1.46 3.25 3.25-1.46 3.25-3.25 3.25Z"
      fill="#22313F"
    />
  </svg>
);
