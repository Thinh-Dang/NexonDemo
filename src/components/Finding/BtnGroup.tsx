import React from 'react';
import Image from 'next/image';

interface IProps {
  userId: string;
  onLike: (id: string) => (e: { preventDefault: () => void }) => void;
  onDislike: (id: string) => (e: { preventDefault: () => void }) => void;
  onCloseModal: () => void;
}

const BtnGroup = ({ userId, onLike, onDislike, onCloseModal }: IProps) => {
  const handleLike = () => {
    console.log(userId);
    onLike(userId);
    onCloseModal();
  };
  const handleDislike = () => {
    console.log(userId);
    onDislike(userId);
    onCloseModal();
  };
  return (
    <div className="btnGroup">
      <div className="btnGroup-btn" onClick={handleDislike}>
        <Image
          src="/assets/images/Close.svg"
          alt="close"
          width={'23px'}
          height={'23px'}
        />
      </div>
      <div className="btnGroup-btn" onClick={handleLike}>
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
