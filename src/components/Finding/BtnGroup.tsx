import React from 'react';
import Image from 'next/image';

interface IProps {
  userId: string;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onCloseModal: () => void;
}

const BtnGroup = ({ userId, onLike, onDislike, onCloseModal }: IProps) => {
  return (
    <div className="btnGroup">
      <div
        className="btnGroup-btn"
        onClick={() => {
          onDislike(userId);
          onCloseModal();
        }}
      >
        <Image
          src="/assets/images/Close.svg"
          alt="close"
          width={'23px'}
          height={'23px'}
        />
      </div>
      <div
        className="btnGroup-btn"
        onClick={() => {
          onLike(userId);
          onCloseModal();
        }}
      >
        <Image
          src="/assets/images/Union.svg"
          alt="heart"
          width={'23px'}
          height={'23px'}
        />
      </div>
    </div>
  );
};

export default BtnGroup;
