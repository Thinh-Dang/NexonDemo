import React from 'react';
import FooterItem from './FooterItem';

export const Footer = () => {
  const footerItems = [
    { lable: 'note', content: 'Lướt', href: '/finding' },
    { lable: 'map', content: 'Map', href: '/map' },
    { lable: 'chat', content: 'Trò chuyện', href: '/chat' },
    { lable: 'profile', content: 'Cá nhân', href: '/profile' },
  ];
  return (
    <div className="footer">
      {footerItems.map((item, index) => {
        return <FooterItem key={`footer-${index}`} item={item} />;
      })}
    </div>
  );
};
