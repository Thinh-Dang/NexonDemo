import React from 'react';
import styleCss from './ItemFriendChat.module.scss';

import Image from 'next/image';
import Link from 'next/link';

export const ItemFriendChat = () => {
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
          <div className={styleCss.itemFriendChat}>
            <ul>
              <li className={styleCss.itemFriendChat__item}>
                <Link href="#">
                  <a>
                    <div className={styleCss.itemFriendChat__avatar}>
                      <Image
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        width={54}
                        height={54}
                        className={styleCss.itemFriendChat__img}
                        alt="Logo"
                      />
                    </div>
                    <div className={styleCss.itemFriendChat__message}>
                      <div className={styleCss.itemFriendChat__heading}>
                        <span className={styleCss.itemFriendChat__title}>
                          Anh Kiem
                        </span>
                        <span className={styleCss.itemFriendChat__time}>
                          12 hour
                        </span>
                      </div>
                      <p className={styleCss.itemFriendChat__text}>Alo alo</p>
                    </div>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
