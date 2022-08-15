import * as React from 'react';
import { SVGProps } from 'react';

export const ArrowRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={8}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.16 7 .345 2.06a1.23 1.23 0 0 1 0-1.707 1.156 1.156 0 0 1 1.663 0l5.647 5.794a1.23 1.23 0 0 1 0 1.706l-5.647 5.793a1.156 1.156 0 0 1-1.663 0 1.23 1.23 0 0 1 0-1.706L5.16 7Z"
      fill="#D3D6D9"
    />
  </svg>
);
