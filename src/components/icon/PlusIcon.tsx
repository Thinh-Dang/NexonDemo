import * as React from 'react';
import { SVGProps } from 'react';

export const PlusIcons = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 455 455"
    width={20}
    height={20}
    xmlSpace="preserve"
    {...props}
  >
    <path d="M455 212.5H242.5V0h-30v212.5H0v30h212.5V455h30V242.5H455z" />
  </svg>
);
