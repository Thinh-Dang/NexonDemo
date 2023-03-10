import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export interface IFooterItem {
  lable: string;
  content: string;
  href: string;
  color?: string;
  iconUrl?: string;
}

interface IProps {
  item: IFooterItem;
}
const FooterItem = ({ item }: IProps) => {
  const router = useRouter();

  if (router.asPath === item?.href) {
    item.color = '#7A56FE';
    item.iconUrl = `./assets/images/${item.lable}-active.svg`;
  } else {
    item.color = '#A7ADB2';
    item.iconUrl = `./assets/images/${item.lable}.svg`;
  }

  return (
    <Link href={item?.href}>
      <a style={{ color: item.color }} className="footer-item">
        <img className="footer-item-icon" src={item.iconUrl} alt="icon" />
        <span className="footer-item-content">{item.content}</span>
      </a>
    </Link>
  );
};

export default FooterItem;
